// import { User, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { EmailAuthProvider} from "firebase/auth";
import { Observer } from "../Abstract/Observer";

// export class LogicService extends Observer {
//     user: User | null = null;

//     authWithGoogle(): void {
//         const auth = getAuth();
//         const provider = new GoogleAuthProvider();
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const { displayName, email } = result.user
//                 const user = JSON.stringify({ displayName, email })

//                 localStorage.setItem('user', user)
//                 window.location.reload();
//             }).catch((error) => {
//                 console.log(error);
//             });
//     }
//     outFromGoogle(): void{
//         const auth = getAuth();
//         signOut(auth)
//         .then(() => {
//             window.location.reload();
//         })
//         .catch((error) => {
//             console.log(error);
//         })
//     }
// }

export class LogicService extends Observer {
        emailAdmin: string | null = null;
}    