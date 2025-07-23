import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-p-delete',
  templateUrl: './p-delete.page.html',
  styleUrls: ['./p-delete.page.scss'],
  standalone: false
})
export class PDeletePage implements OnInit {
  profileForm: FormGroup;
  userId: string | null = null;
  isEditing = false;
  profileImage: string = 'https://cdn-icons-png.flaticon.com/512/12225/12225935.png'; // Generic image URL

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      appaterno: ['', Validators.required],
      apmaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: [''],
      fechanacimiento: ['']
    });
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.loadUserData(this.userId);
    } else {
      this.showToast('No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.', 'danger');
    }
  }

  loadUserData(id: string) {
    this.authService.getUser(id).subscribe({
      next: (res) => {
        if (res.data) {
          this.profileForm.patchValue({
            nombre: res.data.nombre,
            appaterno: res.data.appaterno,
            apmaterno: res.data.apmaterno,
            correo: res.data.correo,
            direccion: res.data.direccion,
            fechanacimiento: res.data.fechanacimiento ? new Date(res.data.fechanacimiento).toISOString().split('T')[0] : ''
          });
          this.profileImage = res.data.fotourl || this.profileImage; // Set profile image or fallback
          this.profileForm.disable(); // Disable form by default
        } else {
          this.showToast('No se encontraron datos del usuario.', 'danger');
        }
      },
      error: async (err) => {
        console.error('Error fetching user data:', err); // Debug log
        await this.showToast('Error al cargar los datos del usuario.', 'danger');
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
      this.profileForm.get('correo')?.disable(); // Prevent editing email
    } else {
      this.profileForm.disable();
    }
  }

  async saveProfile() {
    if (this.profileForm.valid && this.userId) {
      const userData = {
        nombre: this.profileForm.get('nombre')?.value,
        appaterno: this.profileForm.get('appaterno')?.value,
        apmaterno: this.profileForm.get('apmaterno')?.value,
        direccion: this.profileForm.get('direccion')?.value || null,
        fechanacimiento: this.profileForm.get('fechanacimiento')?.value || null
      };

      this.authService.updateUser(this.userId, userData).subscribe({
        next: async () => {
          await this.showToast('Perfil actualizado con éxito.', 'success');
          this.isEditing = false;
          this.profileForm.disable();
          // Reload user data to confirm server update
          this.loadUserData(this.userId!);
        },
        error: async (err) => {
          console.error('Error updating profile:', err); // Debug log
          await this.showToast('Error al actualizar el perfil. Verifica la conexión o los datos enviados.', 'danger');
        }
      });
    } else {
      this.showToast('Por favor, completa todos los campos requeridos.', 'warning');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'middle'
    });
    await toast.present();
  }

  logout() {
    if (this.userId) {
      if (!confirm('¿Deseas cerrar sesión?')) {
        return; // User cancelled the logout
      }
    }
    this.authService.logout();
    this.showToast('Has cerrado sesión.', 'success');
    this.router.navigate(['/welcome']);
  }

  deleteAccount() {
    if (this.userId) {
      if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
        return; // User cancelled the deletion
      }
      this.authService.deleteUser(this.userId).subscribe({
        next: async () => {
          await this.showToast('Cuenta eliminada con éxito.', 'success');
          this.logout(); // Clear session after deletion
          // Optionally, redirect to login or home page
          this.router.navigate(['/welcome']);
        },
        error: async (err) => {
          console.error('Error deleting account:', err); // Debug log
          await this.showToast('Error al eliminar la cuenta. Inténtalo de nuevo.', 'danger');
        }
      });
    } else {
      this.showToast('No se pudo encontrar el ID del usuario para eliminar la cuenta.', 'danger');
    }
  }
}
