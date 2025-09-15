import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Registro</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <form (ngSubmit)="onRegister()">
    <ion-item>
      <ion-label position="floating">Usuario</ion-label>
      <ion-input [(ngModel)]="username" name="username" required></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Contraseña</ion-label>
      <ion-input [(ngModel)]="password" type="password" name="password" required></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Email</ion-label>
      <ion-input [(ngModel)]="email" type="email" name="email"></ion-input>
    </ion-item>

    <ion-button expand="block" type="submit" class="ion-margin-top">Registrarse</ion-button>
  </form>

  <ion-button expand="block" fill="clear" (click)="goLogin()">Ya tengo cuenta</ion-button>
</ion-content>
  `
})
export class RegisterPage {
  username = '';
  password = '';
  email = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async onRegister() {
    const user: User = {
      id: crypto.randomUUID(),
      username: this.username,
      password: this.password,
      email: this.email,
      createdAt: new Date().toISOString()
    };

    const ok = this.auth.register(user);
    if (ok) {
      const toast = await this.toastCtrl.create({
        message: 'Usuario creado correctamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'El usuario ya existe',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }
}
