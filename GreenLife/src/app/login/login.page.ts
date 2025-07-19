import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;
      this.authService.login(correo, contrasena).subscribe({
        next: async (res) => {
          const toast = await this.toastController.create({
            message: 'Inicio de sesión exitoso.',
            duration: 2500,
            color: 'success',
            position: 'middle'
          });
          await toast.present();
          this.router.navigate(['/tabs/tab1']);
        },
        error: async (err) => {
          const toast = await this.toastController.create({
            message: 'Correo o contraseña incorrectos.',
            duration: 2500,
            color: 'danger',
            position: 'middle'
          });
          await toast.present();
        }
      });
    }
  }
}