import "./style.scss";
import { Component } from "./Abstract/Component";

const body = document.body;

const addButton = new Component(body, "button", null, "Добавить");
const removeButton = new Component(body, "button", null, "Удалить");
const paragraph = new Component(body, "p", null, "Это параграф.");

addButton.root.addEventListener("click", () => {
    paragraph.render();
});

removeButton.root.addEventListener("click", () => {
    paragraph.remove();
});
