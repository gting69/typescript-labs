// 'interface' - це контракт, який описує, що повинні вміти робити всі фігури.
interface Shape {
    // Метод для отримання площі. Повертає число (number).
    getArea(): number;
    // Метод для отримання периметра. Повертає число.
    getPerimeter(): number;
    // Метод для зміни розміру фігури.
    scale(factor: number): void;
}

// Клас для кола, який реалізує контракт Shape.
class Circle implements Shape {
    // 'private' - це модифікатор доступу. Він означає, що властивість 'radius'
    // доступна тільки всередині цього класу. Ззовні її змінити не можна.
    private radius: number;

    // Конструктор для створення кола з певним радіусом.
    constructor(radius: number) {
        this.radius = radius;
    }

    // Реалізація методу для обчислення площі кола (π * r²).
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    // Реалізація методу для обчислення периметра кола (2 * π * r).
    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    // Реалізація методу для масштабування.
    scale(factor: number): void {
        // Змінюємо радіус, помноживши його на коефіцієнт.
        this.radius *= factor;
    }
}

// Клас для прямокутника.
class Rectangle implements Shape {
    // Приватні властивості для ширини та висоти.
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Площа прямокутника (ширина * висота).
    getArea(): number {
        return this.width * this.height;
    }

    // Периметр прямокутника (2 * (ширина + висота)).
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    // Масштабування змінює і ширину, і висоту.
    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}

// Клас для трикутника.
class Triangle implements Shape {
    // Приватні властивості для трьох сторін.
    private sideA: number;
    private sideB: number;
    private sideC: number;

    constructor(sideA: number, sideB: number, sideC: number) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    // Площа трикутника за формулою Герона.
    getArea(): number {
        // 's' - це півпериметр.
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        // Обчислюємо і повертаємо площу.
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }

    // Периметр трикутника - сума всіх сторін.
    getPerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }

    // Масштабування змінює всі три сторони.
    scale(factor: number): void {
        this.sideA *= factor;
        this.sideB *= factor;
        this.sideC *= factor;
    }
}


// -- Перевірка роботи коду --
// Створюємо масив, який може містити будь-які об'єкти, що є фігурами (реалізують Shape).
const shapes: Shape[] = [
    new Circle(10), // Створюємо нове коло.
    new Rectangle(5, 10), // Створюємо новий прямокутник.
    new Triangle(5, 5, 5) // Створюємо новий трикутник.
];

// 'let' створює змінну, значення якої можна змінювати.
// Задаємо початкове значення 0.
let totalArea = 0;
// 'for...of' - це цикл для перебору всіх елементів у масиві.
for (const shape of shapes) {
    // Додаємо площу поточної фігури до загальної суми.
    totalArea += shape.getArea();
}

// Виводимо результат. toFixed(2) заокруглює число до двох знаків після коми.
console.log(`Загальна площа всіх фігур: ${totalArea.toFixed(2)}`);