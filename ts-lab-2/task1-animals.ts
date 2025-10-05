// -- Оголошення "контракту" для тварин --
// 'interface' - це опис того, які властивості та методи повинен мати об'єкт.
interface Animal {
    // Кожна тварина повинна мати ім'я (тип string - рядок).
    name: string;
    // Кожна тварина повинна мати вік (тип number - число).
    age: number;
    // Властивість 'wingSpan' є опціональною (необов'язковою) через знак '?'.
    // Це потрібно, бо не у всіх тварин є крила.
    wingSpan?: number;
    // Кожна тварина повинна мати метод 'move', який приймає дистанцію і нічого не повертає (void).
    move(distance: number): void;
}

// -- Створення конкретних класів на основі контракту --
// 'class' - це креслення для створення об'єктів.
// 'implements Animal' означає, що клас Cat "обіцяє" дотримуватися контракту Animal.
class Cat implements Animal {
    // Оголошуємо властивості, які будуть у кожного об'єкта-кота.
    name: string;
    age: number;

    // 'constructor' - це спеціальний метод, який автоматично викликається при створенні нового об'єкта.
    // Він приймає дані (name, age) і записує їх у властивості об'єкта.
    constructor(name: string, age: number) {
        // 'this.name' - це властивість конкретного об'єкта, а 'name' - це параметр, що прийшов у конструктор.
        this.name = name;
        this.age = age;
    }

    // Реалізація методу 'move', як того вимагає інтерфейс Animal.
    move(distance: number): void {
        // console.log виводить повідомлення в консоль.
        console.log(`${this.name} пробіг ${distance} метрів.`);
    }
}

// Створюємо ще один клас, який також дотримується контракту Animal.
class Bird implements Animal {
    // Властивості для птаха.
    name: string;
    age: number;
    wingSpan: number; // Ця властивість тут обов'язкова, бо ми її оголосили.

    // Конструктор для птаха, приймає на один параметр більше.
    constructor(name: string, age: number, wingSpan: number) {
        this.name = name;
        this.age = age;
        this.wingSpan = wingSpan;
    }

    // Унікальна реалізація методу 'move' для птаха.
    move(distance: number): void {
        console.log(`${this.name} пролетів ${distance} метрів.`);
    }
}

// Створюємо клас для риби.
class Fish implements Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Своя реалізація методу 'move' для риби.
    move(distance: number): void {
        console.log(`${this.name} проплив ${distance} метрів.`);
    }
}

// -- Перевірка роботи коду --
// 'const' створює змінну, яку не можна перепризначити.
// 'new Cat(...)' створює новий об'єкт (екземпляр) класу Cat.
const myCat = new Cat("Мурчик", 3);
// Викликаємо метод 'move' у створеного об'єкта.
myCat.move(15);

const myBird = new Bird("Голуб", 2, 40);
myBird.move(100);

const myFish = new Fish("Немо", 1);
myFish.move(5);