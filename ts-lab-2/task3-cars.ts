// 'abstract class' - це клас-шаблон, від якого не можна створити екземпляр (об'єкт).
// Він потрібен лише для того, щоб від нього успадковувались інші класи.
abstract class Car {
    // 'public' - доступно звідусіль.
    public brand: string;
    // 'protected' - доступно всередині цього класу та в класах-нащадках.
    protected model: string;
    // 'private' - доступно тільки всередині цього класу 'Car'.
    private year: number;

    // Конструктор базового класу.
    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Оскільки властивість 'year' приватна, потрібен публічний метод,
    // щоб отримати її значення ззовні. Це називається 'getter'.
    getYear(): number {
        return this.year;
    }

    // 'abstract method' - це метод без реалізації.
    // Він змушує всі класи-нащадки створити власну версію цього методу.
    abstract displayInfo(): void;
}

// 'class BMW extends Car' означає, що BMW - це нащадок Car,
// він успадковує всі його публічні та захищені властивості і методи.
class BMW extends Car {
    // Конструктор класу-нащадка.
    constructor(model: string, year: number) {
        // 'super()' викликає конструктор батьківського класу (Car).
        // Це потрібно зробити в першу чергу.
        super("BMW", model, year);
    }

    // Реалізація абстрактного методу displayInfo, обов'язкова для нащадка.
    displayInfo(): void {
        // 'this.brand' і 'this.model' успадковані від Car.
        console.log(`Марка: ${this.brand}, Модель: ${this.model}, Рік: ${this.getYear()}`);
    }
}

// Аналогічно створюємо ще один клас-нащадок.
class Toyota extends Car {
    constructor(model: string, year: number) {
        super("Toyota", model, year);
    }

    // Кожен клас має свою реалізацію методу, хоча назва однакова.
    displayInfo(): void {
        console.log(`Марка: ${this.brand}, Модель: ${this.model}, Рік: ${this.getYear()}`);
    }
}


// -- Перевірка роботи коду --
// Створюємо екземпляр класу BMW.
const bmw1 = new BMW("X5", 2020);
// Створюємо екземпляр класу Toyota.
const toyota1 = new Toyota("Camry", 2019);

// Викликаємо метод для об'єкта BMW.
bmw1.displayInfo();
// Викликаємо той самий за назвою метод для об'єкта Toyota.
toyota1.displayInfo();