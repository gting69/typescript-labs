// Інтерфейс для будь-якого елемента, що може бути в бібліотеці.
interface LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean; // Властивість для відстеження статусу
    borrow(): void; // Метод, щоб позичити елемент
}

// Клас для Книги, що реалізує інтерфейс LibraryItem.
class Book implements LibraryItem {
    // Властивості, які вимагає інтерфейс.
    title: string;
    author: string;
    isBorrowed: boolean = false; // За замовчуванням книга доступна.
    // Унікальна властивість для книги.
    pageCount: number;

    constructor(title: string, author: string, pageCount: number) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
    }

    // Реалізація методу для позичання.
    borrow(): void {
        // Змінюємо статус на 'позичено'.
        this.isBorrowed = true;
    }
}

// Клас для Журналу.
class Magazine implements LibraryItem {
    title: string;
    author: string;
    isBorrowed: boolean = false;
    // Унікальна властивість для журналу.
    issueNumber: number;

    constructor(title: string, author: string, issueNumber: number) {
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }

    borrow(): void {
        this.isBorrowed = true;
    }
}

// Клас для управління бібліотекою.
class Library {
    // Приватний масив для зберігання всіх елементів.
    private items: LibraryItem[] = [];

    // Метод для додавання нового елемента.
    addItem(item: LibraryItem): void {
        this.items.push(item);
    }

    // Метод для пошуку елемента за назвою.
    findItemByName(name: string): LibraryItem | undefined {
        // @ts-ignore
        return this.items.find(item => item.title === name);
    }

    // Метод для виведення списку тільки доступних елементів.
    listAvailableItems(): void {
        console.log("Доступні елементи:");
        // Перебираємо всі елементи в бібліотеці.
        this.items.forEach(item => {
            // 'if (!item.isBorrowed)' - це скорочення для 'if (item.isBorrowed === false)'.
            // Тобто, якщо елемент НЕ позичений...
            if (!item.isBorrowed) {
                // ...виводимо його в консоль.
                console.log(`- ${item.title}`);
            }
        });
    }
}


// -- Перевірка роботи коду --
// Створюємо екземпляр бібліотеки.
const library = new Library();
// Створюємо книгу та журнал.
const book = new Book("Кобзар", "Т. Шевченко", 500);
const magazine = new Magazine("National Geographic", "Various", 200);

// Додаємо елементи до бібліотеки.
library.addItem(book);
library.addItem(magazine);

// Виводимо список доступних елементів.
library.listAvailableItems();

// "Позичаємо" книгу, викликавши її метод borrow.
book.borrow();
// Виводимо повідомлення для наочності.
console.log("\nПісля того як книгу 'Кобзар' позичили:");
// Виводимо список знову. Тепер книги 'Кобзар' у ньому не повинно бути.
library.listAvailableItems();