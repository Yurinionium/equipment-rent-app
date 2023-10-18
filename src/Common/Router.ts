import { Component } from "../Abstract/Component";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export class Router {
    constructor(public links: Record<string, Component>) {
        this.openPage();

        window.onhashchange = () => {
            this.openPage();
        }
    }

    openPage() {
        Object.values(this.links).forEach((el) => el.myRemove())

        const url = window.location.hash.slice(1);
        const auth = getAuth();
        const user = auth.currentUser;
        if ((url === 'basket' && !user)||(url === 'personalroom' && !user)) {
            this.links['#authorization'].render();
        } else {
            this.links['#' + url].render();
        }
        if (url === "authorization" && user) {
            this.links['#authorization'].myRemove();
            this.links['#personalroom'].render();
        }
    }
}


