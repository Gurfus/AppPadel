import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private authSrv: AuthService, public toastController: ToastController, public navCtrl: Router) { }

  ngOnInit() {
  }

  async onLogin(email,password){
    try {
      const user = await this.authSrv.login(email.value, password.value);
      
      if(user){
        this.presentToast();
        this.navCtrl.navigateByUrl('/reserva');
           
      }
    } catch (error) {
      console.log('Error',error)
      this.inCorrecteToast();
    }

   
 }
 async presentToast() {
  const toast = await this.toastController.create({
    message: 'Benvingut',
    duration: 2000
  });
  toast.present();
  }
  async inCorrecteToast() {
    const toast = await this.toastController.create({
      message: 'Usuari o contrasenya incorrecta !',
      duration: 2000
    });
    toast.present();
  }

}
