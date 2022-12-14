"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
(0, config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
//Routes to endpoints
app.use('/todo', todoRoute_1.default);
const port = 8000;
app.listen(port, () => {
    console.log(`Server running at http://localhost${port}`);
});
