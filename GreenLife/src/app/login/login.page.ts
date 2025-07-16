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
        next: (res) => {
          // Aquí puedes guardar el token si lo necesitas 
          this.router.navigate(['/tabs/tab1'])
          // Muestra un mensaje de éxito
          const toast = this.toastController.create({
            message: 'Inicio de sesión exitoso.',
            duration: 2500,
            color: 'success',
            position: 'middle',
          });
        },
        error: async (err) => {
          // Muestra un mensaje de error
          const toast = await this.toastController.create({
            message: 'Correo o contraseña incorrectos.',
            duration: 2500,
            color: 'success',
            position: 'middle',
          });
          await toast.present();
        }
      });
    }
  }
}