// 'export' робить цей код доступним для імпорту в інших файлах.
// 'namespace' - це як папка всередині файлу, щоб організувати код
// і уникнути збігу імен, якщо у нас будуть інші класи з назвою Book або User.
export namespace Models {

    // 'interface' - це "контракт", який описує, які властивості та методи
    // повинен мати об'єкт, щоб вважатися Книгою.
    export interface IBook {
        // Унікальний ідентифікатор книги, тип - число.
        id: number;
        // Назва книги, тип - рядок.
        title: string;
        // Автор книги, тип - рядок.
        author: string;
        // Рік видання, тип - число.
        year: number;
        // Властивість для зберігання ID користувача, який позичив книгу.
        // '| null' означає, що тип може бути або числом (id), або null (якщо книга вільна).
        borrowedByUserId: number | null;
    }

    // Інтерфейс (контракт) для Користувача.
    export interface IUser {
        // Унікальний ідентифікатор користувача.
        id: number;
        // Ім'я користувача.
        name: string;
        // Електронна пошта користувача.
        email: string;
        // Лічильник книг, які зараз на руках у цього користувача.
        borrowedBooksCount: number;
    }

    // 'class' - це "креслення" для створення реальних об'єктів-книг.
    // 'implements IBook' означає, що цей клас зобов'язується дотримуватися контракту IBook.
    export class Book implements IBook {
        // 'public' означає, що ця властивість доступна з будь-якого місця в коді.
        public id: number;
        // За замовчуванням книга не позичена, тому ця властивість дорівнює null.
        public borrowedByUserId: number | null = null;

        // 'constructor' - це метод, який викликається автоматично при створенні нового об'єкта (через 'new Book(...)').
        // Скорочений запис 'public title: string' автоматично створює властивість 'title' і присвоює їй значення.
        constructor(public title: string, public author: string, public year: number) {
            // **ВИПРАВЛЕНО:** Генеруємо унікальний ID як ціле число.
            // Date.now() - кількість мілісекунд з 1970 року.
            // Math.random() * 100 - додаємо невелике випадкове число для унікальності.
            // Math.floor() - заокруглює результат до найближчого меншого цілого числа.
            this.id = Math.floor(Date.now() + Math.random() * 100);
        }
    }

    // Клас для створення об'єктів-користувачів.
    export class User implements IUser {
        public id: number;
        // При створенні нового користувача, у нього 0 позичених книг.
        public borrowedBooksCount: number = 0;

        constructor(public name: string, public email: string) {
            // **ВИПРАВЛЕНО:** Генеруємо унікальний ID як ціле число.
            this.id = Math.floor(Date.now() + Math.random() * 100);
        }
    }
}