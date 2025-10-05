// Абстрактний клас-шаблон для всіх співробітників.
abstract class Employee {
    // Публічні властивості, доступні скрізь.
    name: string;
    age: number;
    salary: number;

    // Конструктор для ініціалізації властивостей.
    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    // Абстрактний метод, який змушує нащадків реалізувати логіку нарахування бонусу.
    abstract getAnnualBonus(): number;
}

// Інтерфейс, що описує можливість оплати.
interface Payable {
    pay(): void;
}

// Клас Developer є нащадком Employee і реалізує інтерфейс Payable.
class Developer extends Employee implements Payable {
    // Конструктор просто передає дані батьківському класу.
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    // Унікальна реалізація бонусу для розробника (10%).
    getAnnualBonus(): number {
        return this.salary * 0.10;
    }

    // Реалізація методу з інтерфейсу Payable.
    pay(): void {
        console.log(`Виплачуємо зарплату розробнику ${this.name}.`);
    }
}

// Клас Manager також є нащадком Employee і реалізує Payable.
class Manager extends Employee implements Payable {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    // Унікальна реалізація бонусу для менеджера (20%).
    getAnnualBonus(): number {
        return this.salary * 0.20;
    }

    // Реалізація методу з інтерфейсу Payable.
    pay(): void {
        console.log(`Виплачуємо зарплату менеджеру ${this.name}.`);
    }
}


// -- Перевірка роботи коду --
// Створюємо масив типу Employee, куди можна класти і розробників, і менеджерів.
const employees: Employee[] = [
    new Developer("Іван", 30, 50000),
    new Manager("Петро", 40, 70000)
];

// Змінна для зберігання загальної суми бонусів.
let totalBonuses = 0;
// Цикл для перебору всіх співробітників.
for (const employee of employees) {
    // Викликаємо метод getAnnualBonus для кожного співробітника
    // і додаємо результат до загальної суми.
    totalBonuses += employee.getAnnualBonus();
}

// Виводимо фінальний результат.
console.log(`Загальна річна сума бонусів: ${totalBonuses}`);