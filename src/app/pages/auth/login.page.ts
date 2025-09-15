import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Login</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form (ngSubmit)="onLogin()">
    <ion-item>
      <ion-label position="floating">Usuario</ion-label>
      <ion-input [(ngModel)]="username" name="username" required></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Contraseña</ion-label>
      <ion-input [(ngModel)]="password" type="password" name="password" required></ion-input>
    </ion-item>

    <ion-button expand="block" type="submit" class="ion-margin-top">Ingresar</ion-button>
  </form>

  <ion-button expand="block" fill="clear" (click)="goRegister()">Crear cuenta</ion-button>
</ion-content>
  `
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async onLogin() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Credenciales inválidas',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }
}
