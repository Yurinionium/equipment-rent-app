import "./style.scss"
import { Component } from "./Abstract/Component"
import { Footer, FooterMenu, FooterAutor} from "./Common/Footer"
import { Header } from "./Common/Header"
import { Main } from "./Pages/Main"
import { Catalog } from "./Pages/Catalog"
import { Authorization } from "./Pages/Authorization"
import { Basket } from "./Pages/Basket"
import { Router } from "./Common/Router"
import { PersonalAccount } from "./Pages/PersonalAccount"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configFB"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const body = document.body;
initializeApp(firebaseConfig);


class App {
    constructor(parrent: HTMLElement) {
        const wrap = new Component(parrent, 'div', []);
        
        new Header(wrap.root);
        const main = new Component(wrap.root, "main");

        const links = {
        '#': new Main(main.root),
        '#catalog': new Catalog(main.root),
        '#authorization': new Authorization(main.root),
        '#basket': new Basket(main.root),
        '#personalroom': new PersonalAccount(main.root),
        }

        new Router(links);
        new Footer(wrap.root);
    }
}

declare global {
    interface Window {
        app: App
    }
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
        if (!window.app) window.app = new App(document.body)
}); 

// window.app = new App(document.body)

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         if (!window.app) window.app = new App(document.body)
//     } else {
        

//         const provider = new GoogleAuthProvider();
//         provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//     }
// });
