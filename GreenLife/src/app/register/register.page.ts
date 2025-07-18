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
      fechanacimiento: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]]
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
      // Asegurar que todos los campos estén presentes con valores válidos
      formData.append('nombre', this.registerForm.get('nombre')?.value || '');
      formData.append('appaterno', this.registerForm.get('appaterno')?.value || '');
      formData.append('apmaterno', this.registerForm.get('apmaterno')?.value || '');
      formData.append('correo', this.registerForm.get('correo')?.value || '');
      formData.append('contrasena', this.registerForm.get('contrasena')?.value || '');
      formData.append('direccion', this.registerForm.get('direccion')?.value || '');
      formData.append('fechanacimiento', this.registerForm.get('fechanacimiento')?.value || '');
      // Añadir imagen, o una cadena vacía si no hay archivo
      formData.append('imagen', this.selectedImage ? this.selectedImage : '');

      // Depuración: Convertir FormData a objeto para inspección
      const formDataObject: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value instanceof File ? 'FILE' : value;
      });
      console.log('Datos enviados en FormData:', formDataObject);

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
            message: `Error en el registro: ${error.message}. Intenta de nuevo.`,
            duration: 2500,
            color: 'danger',
            position: 'middle',
          });
          await toast.present();
          console.error('Error detallado:', error);
        }
      });
    }
  }
}