import { Component } from "./Abstract/Component"
import { Footer, FooterMenu, FooterAutor} from "./Common/Footer"
import { Header } from "./Common/Header"
import { Main } from "./Pages/Main"
import "./style.scss"
import "./style.scss"

class App {
    constructor(parrent: HTMLElement) {
        const wrap = new Component(parrent, 'div', []);
        
        new Header(wrap.root);
        new Main(wrap.root,);
        new Footer(wrap.root);
    }
}

declare global {
    interface Window {
        app: App
    }
}

window.app = new App(document.body)