function greetWithNumber(name, count) {
    if (count === void 0) { count = 1; }
    for (var i = 0; i < count; i++) {
        console.log("Hello, ".concat(name, "! This is greeting number ").concat(i + 1, "."));
    }
}
// Виклик функції з обома параметрами
console.log("Calling with both arguments:");
greetWithNumber("Student", 3);
// Виклик функції без другого параметра (використовується значення за замовчуванням)
console.log("\nCalling with default argument:");
greetWithNumber("Student");
