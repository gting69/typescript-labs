// const path = require('path'); - підключаємо вбудований в Node.js модуль 'path',
// який допомагає правильно працювати зі шляхами до файлів та папок.
const path = require('path');

// module.exports = { ... }; - ми експортуємо об'єкт з налаштуваннями,
// який Webpack буде читати, щоб зрозуміти, що йому робити.
module.exports = {
    // entry: './src/app.ts' - "Точка входу". Webpack починає свою роботу з цього файлу.
    // Він аналізує app.ts, знаходить всі 'import' і будує "дерево" всіх потрібних файлів.
    entry: './src/app.ts',

    // mode: 'development' - вказуємо режим роботи. 'development' означає, що ми в процесі розробки.
    // У цьому режимі Webpack працює швидше і надає більше інформації для налагодження.
    mode: 'development',

    // module: { ... } - тут ми налаштовуємо "правила" для різних типів файлів.
    module: {
        rules: [
            {
                // test: /\.ts$/ - це правило для всіх файлів, що закінчуються на '.ts'.
                test: /\.ts$/,
                // use: 'ts-loader' - вказуємо, що для обробки таких файлів потрібно використовувати 'ts-loader'.
                // 'ts-loader' - це інструмент, який "вчить" Webpack компілювати TypeScript в JavaScript.
                use: 'ts-loader',
                // exclude: /node_modules/ - кажемо Webpack ігнорувати папку node_modules,
                // щоб не компілювати код сторонніх бібліотек. Це прискорює збірку.
                exclude: /node_modules/,
            },
        ],
    },

    // resolve: { ... } - налаштування того, як Webpack шукає файли.
    resolve: {
        // extensions: ['.ts', '.js'] - дозволяє нам писати 'import' без розширення файлу.
        // Наприклад, замість 'import "./models.ts"' можна написати просто 'import "./models"'.
        extensions: ['.ts', '.js'],
    },

    // output: { ... } - налаштування того, куди і як складати фінальний, зібраний файл.
    output: {
        // filename: 'bundle.js' - назва фінального JavaScript файлу, в який буде зібрано весь наш код.
        filename: 'bundle.js',
        // path: ... - шлях до папки, куди буде збережено 'bundle.js'.
        // У нашому випадку, це буде папка 'dist' в корені проєкту.
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/dist/' - вказує, за якою URL-адресою браузер зможе знайти наш 'bundle.js' на сервері розробки.
        publicPath: '/dist/',
    },

    // devServer: { ... } - налаштування для локального сервера розробки (webpack-dev-server).
    devServer: {
        // static: { ... } - вказує, яку папку сервер має "показувати" браузеру.
        // Ми вказуємо корінь проєкту, щоб сервер міг знайти 'index.html', 'libs/bootstrap.css' і т.д.
        static: {
            directory: path.join(__dirname),
        },
        // compress: true - вмикає стиснення файлів для швидшого завантаження.
        compress: true,
        // port: 9000 - вказує порт, на якому буде працювати сервер.
        port: 9000,
        // open: true - автоматично відкриватиме сторінку в браузері при запуску сервера.
        open: true,
    },
};