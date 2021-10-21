import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSrv:AuthService, public toastController: ToastController, public navCtrl: Router ) { }

  ngOnInit() {
  }

   async onRegister(email,password,displayName){
     try {
       const user = await this.authSrv.register(email.value, password.value);
       if(user){
        const isVerified = this.authSrv.isEmailVerified(user);
        this.redirectUser(isVerified);
        this.correcteToast();

        
       }
     } catch (error) {
       console.log('Error',error)
       this.inCorrecteToast();
       
     }
    


  }
  async correcteToast() {
    const toast = await this.toastController.create({
      message: 'Registre correcte, Benvingut !',
      duration: 2000
    });
    toast.present();
  }

  async inCorrecteToast() {
    const toast = await this.toastController.create({
      message: 'La contrasenya ha de ser de minim 6 caracters, o bé l"email ja esta en us',
      duration: 2000
    });
    toast.present();
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.navCtrl.navigate(['login']);
    } else {
      this.navCtrl.navigate(['verify-email']);
    }
  }


}
