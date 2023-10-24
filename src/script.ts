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
import { AuthService } from "./Services/AuthService";
import { LogicService } from "./Services/LogicService"
import { DBService } from "./Services/DBService"

const body = document.body;
const DBFirestore = initializeApp(firebaseConfig);

const services = {
    authService: new AuthService(),
    logicService: new LogicService(),
    dbService: new DBService(DBFirestore)
}

class App {
    constructor(parrent: HTMLElement) {
        const wrap = new Component(parrent, 'div', []);
        
        new Header(wrap.root, services);
        const main = new Component(wrap.root, "main");

        const links = {
        '#': new Main(main.root, services),
        '#catalog': new Catalog(main.root, services),
        '#authorization': new Authorization(main.root, services),
        '#basket': new Basket(main.root, services),
        '#personalroom': new PersonalAccount(main.root, services)
        }

        new Router(links, services);
        new Footer(wrap.root, services);
    }
}

declare global {
    interface Window {
        app: App
    }
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    services.authService.user = user;
    services.dbService
    .getDataUser(user)
    .then(() => {
        if (!window.app) window.app = new App(document.body)
    })
    .catch((error) => {
        console.log(error);
    });
}); 



