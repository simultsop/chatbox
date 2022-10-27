"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/', (req, res) => {
    console.log(req.body.message, 'color: green');
    fs_1.default.appendFile('chat.json', req.body.message, err => {
        if (err) {
            console.error(err);
        }
    });
    res.sendStatus(200);
});
app.listen(process.env.PORT);
