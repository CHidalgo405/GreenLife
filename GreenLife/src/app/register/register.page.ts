import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})

export class RegisterPage {
  registerForm: FormGroup;
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      appaterno: ['', Validators.required],
      apmaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      direccion: ['', Validators.required],
      fechanacimiento: ['', Validators.required]
      // No agregamos imagen aquí porque no es un campo de texto
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage = null;
      this.previewUrl = null;
    }
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.entries(this.registerForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (this.selectedImage) {
        formData.append('imagen', this.selectedImage);
      }
      this.authService.register(formData).subscribe({
        next: async (response) => {
          const toast = await this.toastController.create({
            message: 'Registro exitoso. Ahora puedes iniciar sesión.',
            duration: 2500,
            color: 'success',
            position: 'middle',
          });
          await toast.present();
          this.router.navigate(['/login']);
        },
        error: async (error) => {
          const toast = await this.toastController.create({
            message: 'Error en el registro. Intenta de nuevo.',
            duration: 2500,
            color: 'danger',
            position: 'middle',
          });
          await toast.present();
        }
      });
    }
  }
}