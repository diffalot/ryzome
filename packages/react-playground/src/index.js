"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
console.log('Hello from react playground!');
var datql_1 = require("@datql/datql");
datql_1.datql();
react_dom_1.default.render(react_1.default.createElement("p", null, "Hello"), document.getElementById('root'));
