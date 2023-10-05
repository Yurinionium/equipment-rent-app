import { Component } from "../Abstract/Component";


export const headerMenu = `
    <div class="header__wrapp">
        <img src="../assets/fav.png">
        <ul>
        <li>Главная</li>
        <li>Каталог</li>
        <li>Авторизация</li>
        <li>Корзина</li>
        </ul>
    </div>
`

export class Header extends Component {
    constructor(
        public parent: HTMLElement,
        tagName: keyof HTMLElementTagNameMap,
        arrStyle?: string[] | null,
        attributes?: { [key: string]: string } | null,
        content?: string | null
    ) {
    super(parent, tagName, arrStyle, attributes, content)
    }

}
