"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
let ENV = process.env.ENVIRONNEMENT || "";
if (ENV == "production") {
    dotenv_1.default.config({
        path: path_1.default.join(__dirname, '..', '.env.production'),
        override: true,
        debug: true
    });
}
else {
    dotenv_1.default.config({
        path: path_1.default.join(__dirname, '..', '.env'),
        override: true,
        debug: true
    });
}
const PORT = 3535;
const whitelist = ['https://liolle.github.io', 'http://localhost:5173', 'http://localhost:4173', 'http://localhost:4200'];
var corsOptions = {
    credentials: true,
    origin: whitelist
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use('/login', require('./routes/login.routes'));
app.use('/register', require('./routes/register.routes'));
app.use('/logout', require('./routes/logout.routes'));
app.use('/posts', require('./routes/posts.routes'));
app.use('/comments', require('./routes/comments.routes'));
app.use('/profiles', require('./routes/profiles.routes'));
app.use('/media', require('./routes/medias.routes'));
app.use('/users', require('./routes/follows.routes'));
app.use('/groups', require('./routes/groups.routes'));
app.listen(PORT, () => {
    let ENV = process.env.ENVIRONNEMENT == 'production' ? 'PRODUCTION' : 'DEVELOPMENT';
    console.log(`\nServer running on ---> http://localhost:${PORT} <${ENV}>\n`);
});
