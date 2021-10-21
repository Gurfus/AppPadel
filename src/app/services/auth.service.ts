import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import {  } from "@angular/fire/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user){
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();

        }
        return of(null);
      })
    )
  
   }

  

  async register(email:string,pass:string): Promise<User>{
    try {
      const { user } = await this.auth.createUserWithEmailAndPassword(email, pass);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }


  
  async resetPassword(email: string): Promise<void> {
    try {
      return this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }
  async sendVerifcationEmail(): Promise<void>{
    try {
      return(await this.auth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error',error)
    }
  }

  async login(email:string,pass:string): Promise<User>{
    try {
      const {user} = await this.auth.signInWithEmailAndPassword(email,pass);
      this.updateUserData(user)
      return user;
    } catch (error) {
      console.log('Error',error)
    }
  }

  async logout(): Promise<void>{
    try {
      await this.auth.signOut
    } catch (error) {
      console.log('Error',error)
      
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  private updateUserData(user:User){
    const userRef : AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      

    }
    return userRef.set (data, {merge: true})
  }
}
