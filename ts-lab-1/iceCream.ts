// --- Завдання 4: Фінальна версія з англійським кодом та українським інтерфейсом ---

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

// --- Type Definitions (in English) ---
type Size = 'маленький' | 'великий';
type Topping = 'шоколад' | 'карамель' | 'ягоди';

// --- Core Calculation Logic (function name in English) ---
function calculateCost(size: Size, toppings: Topping[], hasMarshmallow: boolean): string {
    let totalCost: number = 0;

    if (size === 'маленький') {
        totalCost += 10;
    } else {
        totalCost += 25;
    }

    // This check is important for the lab requirements
    if (toppings.length === 0) {
        return "Помилка: Ви повинні обрати хоча б одну начинку.";
    }

    // This loop correctly calculates the cost for multiple toppings
    for (const topping of toppings) {
        switch (topping) {
            case 'шоколад': totalCost += 5; break;
            case 'карамель': totalCost += 6; break;
            case 'ягоди': totalCost += 10; break;
        }
    }

    if (hasMarshmallow) {
        totalCost += 5;
    }

    return `Загальна вартість вашого морозива: ${totalCost} грн.`;
}

// --- Interactive User Interface (function name in English) ---
function startOrder(): void {
    console.log("Ласкаво просимо до калькулятора морозива!");

    // 1. Size selection via numbers
    let selectedSize: Size;
    while (true) {
        const sizeChoice = prompt("Оберіть розмір: 1 - маленький, 2 - великий: ");
        if (sizeChoice === '1') {
            selectedSize = 'маленький';
            break;
        }
        if (sizeChoice === '2') {
            selectedSize = 'великий';
            break;
        }
        console.log("Неправильний ввід! Будь ласка, введіть 1 або 2.");
    }

    // 2. Toppings selection via numbers
    console.log("Оберіть начинки: 1 - шоколад, 2 - карамель, 3 - ягоди.");
    const toppingsInput = prompt("Введіть номери через кому (наприклад: 1,3): ");

    const toppingsMap: { [key: string]: Topping } = {
        '1': 'шоколад',
        '2': 'карамель',
        '3': 'ягоди'
    };

    const selectedToppings = !toppingsInput ? [] : toppingsInput
        .split(',')
        .map(num => toppingsMap[num.trim()])
        .filter(topping => topping !== undefined);

    // 3. Marshmallow selection via numbers
    let hasMarshmallow: boolean;
    while (true) {
        const marshmallowChoice = prompt("Додавати маршмелоу? 1 - так, 2 - ні: ");
        if (marshmallowChoice === '1') {
            hasMarshmallow = true;
            break;
        }
        if (marshmallowChoice === '2') {
            hasMarshmallow = false;
            break;
        }
        console.log("Неправильний ввід! Будь ласка, введіть 1 або 2.");
    }

    // Calling the calculation function with user data
    const result = calculateCost(selectedSize, selectedToppings, hasMarshmallow);

    console.log(result);
}

// Start the program
startOrder();