import { User, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Observer } from "../Abstract/Observer";

export class AuthService extends Observer {
    user: User | null = null;

    authWithGoogle(): void {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                window.location.reload();
                this.dispatch("click", false)
            }).catch((error) => {
                console.log(error);
            });
    }
    outFromGoogle(): void{
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }
}