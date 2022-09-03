<h1>Веб-приложение с модулем аутентификации и регистрации, в котором пользователь может сокращать длинные ссылки.</h1>

Клиент - JavaScript фреймворк React.
База данных - нереляционная MongoDB, подключенная при помощи пакета 
mongoose.
Сервер - фреймворк Koa для Node.js

Для запуска приложения на локальном пк необходимы следующие пакеты:
<ul>
  <li>bcryptjs – пакет для шифрования (шифрования паролей).</li>
<li>config – пакет для определения наборов параметров таких как: порт, секретная фраза для токена, подключение к базе данных.</li>
<li>koa – непосредственно сам фреймворк.</li>
<li>koa-router – пакет для настройки маршрутизации.</li>
<li>koa-bodyparser – парсер для koa, поддерживающий такие форматы тела как json, form и text.</li>
<li>koa-async-validator – пакет для валидации данных, вводимых пользователем.</li>
<li>@koa/cors – настраивает заголовки CORS.</li>
<li>jsonwebtoken – для реализации json веб-токенов.</li>
<li>shortid – создает короткие непоследовательные уникальные идентификаторы, удобные для URL.</li>
<li>mongoose – инструмент объектного моделирования MongoDB.</li>
</ul>

В корне расположены папки и файлы серверной части. В папке client лежит клиентская часть веб-приложения, созданная, как новое приложение при помощи команды npx create-react-app client.

Серверная часть содержит папки и файлы:
1. config – папка с конфигурационными файлами.
2. models – папка с файлами моделей для базы данных. Модели определяются через Schema интерфейс.
3. routes – папка с файлами маршрутизации.
4. index.js – файл входа в серверную часть приложения.

Файлы в клиентской части хранятся в папке client/src и содержат папки и файлы:
1. components – папка с компонентами, возвращающими часть  интерфейса.
2. context – папка с файлом контекста, который необходим для того, чтобы делиться данными между компонентами без необходимости явно передавать пропсы через каждый уровень дерева.
3. hooks – папка с пользовательскими хуками.
4. pages – страницы веб-приложения.
5. index.js – точка запуска клиентской части приложения.
6. routes.js – файл, разделяющий доступ к страницам для авторизованных и не авторизованных пользователей.

Для аутентификации используется JWT – JSON Web Token – открытый стандарт для создания токенов доступа, основанный на формате JSON.

