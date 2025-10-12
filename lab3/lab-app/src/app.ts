// Імпортуємо класи та простори імен з інших файлів, щоб використовувати їх тут.
import { Models } from './models'; // Імпортуємо типи IBook, IUser та класи Book, User.
import { Library } from './library'; // Імпортуємо наш універсальний клас для колекцій.
import { StorageService } from './services'; // Імпортуємо сервіс для роботи з LocalStorage.
import { Validation } from './validation'; // Імпортуємо функції для валідації.

// Головний клас нашого застосунку, який керує всією логікою.
class App {
    // 'private' означає, що ці властивості доступні тільки всередині класу App.
    // Створюємо екземпляр бібліотеки для книг. <Models.IBook> вказує, що ця бібліотека буде працювати з об'єктами типу IBook.
    private bookLibrary = new Library<Models.IBook>();
    // Створюємо екземпляр бібліотеки для користувачів.
    private userLibrary = new Library<Models.IUser>();
    // Створюємо екземпляр сервісу для збереження даних.
    private storage = new StorageService();

    // Зберігаємо посилання на HTML-елементи зі сторінки, щоб з ними працювати.
    // 'as HTMLFormElement' каже TypeScript, що ми впевнені, що це саме форма.
    private addBookForm = document.getElementById('addBookForm') as HTMLFormElement;
    private addUserForm = document.getElementById('addUserForm') as HTMLFormElement;
    private bookList = document.getElementById('bookList') as HTMLUListElement;
    private userList = document.getElementById('userList') as HTMLUListElement;

    // Зберігаємо посилання на поля вводу (інпути) для валідації.
    private bookTitleInput = document.getElementById('bookTitle') as HTMLInputElement;
    private bookAuthorInput = document.getElementById('bookAuthor') as HTMLInputElement;
    private bookYearInput = document.getElementById('bookYear') as HTMLInputElement;
    private userNameInput = document.getElementById('userName') as HTMLInputElement;
    private userEmailInput = document.getElementById('userEmail') as HTMLInputElement;

    // 'constructor' - це метод, який автоматично викликається при створенні нового об'єкта 'App'.
    constructor() {
        // Налаштовуємо всі "слухачі подій" (наприклад, кліки по кнопках).
        this.configureListeners();
        // Завантажуємо дані з пам'яті браузера, якщо вони є.
        this.loadData();
    }

    // Цей метод відповідає за налаштування всіх подій.
    private configureListeners(): void {
        // Додаємо "слухача" на подію 'submit' (відправка) для форми додавання книги.
        // Коли форма відправляється, викликається метод handleAddBook.
        // .bind(this) потрібно, щоб усередині handleAddBook 'this' вказував на клас App.
        this.addBookForm.addEventListener('submit', this.handleAddBook.bind(this));
        // Робимо те саме для форми додавання користувача.
        this.addUserForm.addEventListener('submit', this.handleAddUser.bind(this));
    }

    // Метод для завантаження даних з LocalStorage при старті.
    private loadData(): void {
        // Намагаємося завантажити список книг. Якщо нічого немає, створюємо порожній масив [].
        const books = this.storage.load<Models.IBook[]>('books') || [];
        // Робимо те саме для користувачів.
        const users = this.storage.load<Models.IUser[]>('users') || [];
        // Заповнюємо наші бібліотеки завантаженими даними.
        this.bookLibrary.setItems(books);
        this.userLibrary.setItems(users);
        // "Малюємо" завантажені дані на сторінці.
        this.render();
    }

    // Метод для збереження поточного стану бібліотек у LocalStorage.
    private saveData(): void {
        this.storage.save('books', this.bookLibrary.getAllItems());
        this.storage.save('users', this.userLibrary.getAllItems());
    }

    // Метод, який спрацьовує при відправці форми додавання книги.
    private handleAddBook(event: Event): void {
        // Запобігаємо стандартній поведінці форми (перезавантаженню сторінки).
        event.preventDefault();

        // Отримуємо значення з полів вводу.
        const title = this.bookTitleInput.value;
        const author = this.bookAuthorInput.value;
        const year = this.bookYearInput.value;

        // Перевіряємо кожне поле за допомогою наших функцій валідації.
        const isTitleValid = this.validateField(this.bookTitleInput, Validation.isRequired);
        const isAuthorValid = this.validateField(this.bookAuthorInput, Validation.isRequired);
        const isYearValid = this.validateField(this.bookYearInput, Validation.isYear);

        // Якщо всі поля заповнені правильно...
        if (isTitleValid && isAuthorValid && isYearValid) {
            // ...створюємо новий об'єкт книги.
            const newBook = new Models.Book(title, author, parseInt(year));
            // Додаємо книгу до нашої бібліотеки.
            this.bookLibrary.addItem(newBook);
            // Зберігаємо оновлений список у пам'ять.
            this.saveData();
            // Перемальовуємо списки на сторінці.
            this.render();
            // Очищуємо поля форми.
            this.addBookForm.reset();
        }
    }

    // Метод, який спрацьовує при відправці форми додавання користувача.
    private handleAddUser(event: Event): void {
        event.preventDefault();

        const name = this.userNameInput.value;
        const email = this.userEmailInput.value;

        const isNameValid = this.validateField(this.userNameInput, Validation.isRequired);
        const isEmailValid = this.validateField(this.userEmailInput, Validation.isEmail);

        if (isNameValid && isEmailValid) {
            const newUser = new Models.User(name, email);
            this.userLibrary.addItem(newUser);
            this.saveData();
            this.render();
            this.addUserForm.reset();
        }
    }

    // Універсальний метод для перевірки поля вводу.
    private validateField(input: HTMLInputElement, validator: (value: string) => boolean): boolean {
        // Якщо функція-валідатор повертає 'true'...
        if (validator(input.value)) {
            // ...прибираємо червону рамку (клас 'is-invalid').
            input.classList.remove('is-invalid');
            return true;
        } else {
            // ...інакше додаємо червону рамку.
            input.classList.add('is-invalid');
            return false;
        }
    }

    // Головний метод для "малювання" - він просто викликає інші методи "малювання".
    private render(): void {
        this.renderBooks();
        this.renderUsers();
    }

    // Метод, що відповідає за відображення списку книг на сторінці.
    private renderBooks(): void {
        // Повністю очищуємо поточний список, щоб не було дублікатів.
        this.bookList.innerHTML = '';
        // Проходимо по кожній книзі в нашій бібліотеці.
        this.bookLibrary.getAllItems().forEach(book => {
            // Створюємо новий HTML-елемент <li> (пункт списку).
            const li = document.createElement('li');
            // Додаємо йому класи Bootstrap для гарного вигляду.
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            // Записуємо в нього текст.
            li.textContent = `${book.title} - ${book.author} (${book.year})`;

            // Створюємо кнопку.
            const button = document.createElement('button');
            // Перевіряємо, чи позичена книга.
            if (book.borrowedByUserId) {
                // Якщо так, робимо кнопку "Повернути".
                button.textContent = 'Повернути';
                button.className = 'btn btn-pastel-orange btn-sm';
                // При кліку на кнопку викликається метод handleReturnBook.
                button.onclick = () => this.handleReturnBook(book.id);
            } else {
                // Якщо ні, робимо кнопку "Позичити".
                button.textContent = 'Позичити';
                button.className = 'btn btn-pastel-green btn-sm';
                button.onclick = () => this.handleBorrowBook(book.id);
            }
            // Додаємо кнопку всередину елемента <li>.
            li.appendChild(button);
            // Додаємо готовий елемент <li> у список <ul> на сторінці.
            this.bookList.appendChild(li);
        });
    }

    // Метод, що відповідає за відображення списку користувачів.
    private renderUsers(): void {
        this.userList.innerHTML = '';
        this.userLibrary.getAllItems().forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            // Записуємо інформацію про користувача та його ID.
            li.textContent = `${user.name} (${user.email}) - ID: ${user.id}`;
            this.userList.appendChild(li);
        });
    }

    // Метод, що спрацьовує при натисканні кнопки "Позичити".
    private handleBorrowBook(bookId: number): void {
        // Викликаємо стандартне вікно браузера для вводу даних.
        const userIdStr = prompt('Введіть ID користувача для позичення книги:');
        // Якщо користувач натиснув "Скасувати", виходимо з функції.
        if (!userIdStr) return;

        // Перетворюємо введений рядок на число.
        const userId = parseInt(userIdStr);
        // Шукаємо книгу та користувача за їхніми ID.
        const book = this.bookLibrary.getItemById(bookId);
        const user = this.userLibrary.getItemById(userId);

        // Якщо і книга, і користувач знайдені...
        if (book && user) {
            // ...перевіряємо, чи не перевищено ліміт книг.
            if (user.borrowedBooksCount >= 3) {
                alert('Помилка: Користувач не може позичити більше 3-х книг!');
                return; // Виходимо з функції.
            }
            // Записуємо ID користувача у властивість книги.
            book.borrowedByUserId = userId;
            // Збільшуємо лічильник книг у користувача.
            user.borrowedBooksCount++;
            // Зберігаємо зміни та перемальовуємо інтерфейс.
            this.saveData();
            this.render();
            alert(`Книгу "${book.title}" позичено користувачем ${user.name}.`);
        } else {
            // Якщо когось не знайдено, виводимо помилку.
            alert('Помилка: Книгу або користувача з таким ID не знайдено!');
        }
    }

    // Метод, що спрацьовує при натисканні кнопки "Повернути".
    private handleReturnBook(bookId: number): void {
        const book = this.bookLibrary.getItemById(bookId);
        // Перевіряємо, що книга існує і що вона дійсно позичена.
        if (book && book.borrowedByUserId) {
            // Знаходимо користувача, який її позичив.
            const user = this.userLibrary.getItemById(book.borrowedByUserId);
            // Якщо користувач знайдений, зменшуємо його лічильник книг.
            if (user) { user.borrowedBooksCount--; }
            // Очищуємо поле borrowedByUserId у книзі.
            book.borrowedByUserId = null;
            // Зберігаємо зміни та оновлюємо інтерфейс.
            this.saveData();
            this.render();
            alert(`Книгу "${book.title}" повернуто до бібліотеки.`);
        }
    }
}

// Це точка входу в наш застосунок.
// "Слухаємо" подію DOMContentLoaded, яка спрацьовує, коли весь HTML-документ завантажено.
document.addEventListener('DOMContentLoaded', () => {
    // Створюємо новий екземпляр класу App, що запускає всю програму.
    new App();
});