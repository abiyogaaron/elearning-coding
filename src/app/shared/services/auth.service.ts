import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map, flatMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    userData: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
    ){
        this.afAuth.authState.subscribe(user =>{
            if(user){
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                let userDoc = this.getUserData(user.uid);
                userDoc.subscribe((res) => {
                    if(res){
                        localStorage.setItem('userData', JSON.stringify(res));
                    }
                })
                JSON.parse(localStorage.getItem('user'));
            }else{
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    SignUp(email, password){
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    }

    SignIn(email, password){
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    SendVerificationMail(){
        return this.afAuth.auth.currentUser.sendEmailVerification()
    }

    setUserData(user, signupData: any){
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: signupData.fullName,
            grade: signupData.grade,
            specialization: signupData.specialization,
            class: signupData.class,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        });
    }

    getUserData(uid: string){
        return this.afs
            .collection<User>('users', ref => ref.where('uid', '==', uid))
            .valueChanges();
    }

    get isLoggedIn(): boolean{
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    SignOut(){
        return this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['auth']);
        })
    }
}