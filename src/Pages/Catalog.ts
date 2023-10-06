import { Component } from "../Abstract/Component";

export class Catalog extends Component {
    constructor(
        public parent: HTMLElement
    ) {
        super(parent, 'main', ['main__wrapper'], null, null);
        const mainTitle = new Component(this.root, 'h2', ['catalog__title', 'object__title'], null, "Вибротрамбовки");
    }
}
