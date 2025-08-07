import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-p-settings',
  templateUrl: './p-settings.page.html',
  styleUrls: ['./p-settings.page.scss'],
  standalone: false,
})

export class PSettingsPage implements OnInit {
  historialVentas: any[] = [];

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) { }

ngOnInit() {
  const userId = this.authService.getUserId();
  if (userId) {
    this.authService.getVentaById(userId).subscribe({
      next: (res) => {
        this.historialVentas = res.data || [];
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'No se pudo cargar el historial de compras.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
}