function calculateIceCreamCost(size, toppings, hasMarshmallow) {
    var totalCost = 0;
    // 1. Розрахунок вартості за розмір
    if (size === 'small') {
        totalCost += 10; // Маленький стаканчик - 10 грн [cite: 39]
    }
    else {
        totalCost += 25; // Великий стаканчик - 25 грн [cite: 40]
    }
    // Перевірка, чи є хоча б одна начинка
    if (toppings.length === 0) {
        return "Error: You must choose at least one topping.";
    }
    // 2. Додаємо вартість начинок
    for (var _i = 0, toppings_1 = toppings; _i < toppings_1.length; _i++) {
        var topping = toppings_1[_i];
        switch (topping) {
            case 'chocolate':
                totalCost += 5; // Шоколад +5 грн [cite: 42]
                break;
            case 'caramel':
                totalCost += 6; // Карамель +6 грн [cite: 43]
                break;
            case 'berries':
                totalCost += 10; // Ягоди +10 грн [cite: 44]
                break;
        }
    }
    // 3. Додаємо вартість маршмелоу, якщо потрібно
    if (hasMarshmallow) {
        totalCost += 5; // Маршмелоу +5 грн
    }
    return "Total cost of your ice cream is: ".concat(totalCost, " UAH.");
}
// --- Приклади використання ---
// Приклад 1: Маленьке морозиво з шоколадом та ягодами, без маршмелоу
// (10 + 5 + 10 = 25)
var order1 = calculateIceCreamCost('small', ['chocolate', 'berries'], false);
console.log(order1);
// Приклад 2: Велике морозиво з усіма начинками та маршмелоу
// (25 + 5 + 6 + 10 + 5 = 51)
var order2 = calculateIceCreamCost('large', ['chocolate', 'caramel', 'berries'], true);
console.log(order2);
// Приклад 3: Маленьке морозиво з карамеллю та маршмелоу
// (10 + 6 + 5 = 21)
var order3 = calculateIceCreamCost('small', ['caramel'], true);
console.log(order3);
// Приклад 4: Помилка (немає начинки)
var order4 = calculateIceCreamCost('large', [], false);
console.log(order4);
