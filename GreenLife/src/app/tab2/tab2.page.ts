import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Agrega esta importación

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  carrito: any[] = [];

  constructor(private alertController: AlertController) {} // Agrega el constructor

  ngOnInit() {
    this.cargarCarrito();
  }

  ionViewWillEnter() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  aumentarCantidad(index: number) {
    this.carrito[index].cantidad += 1;
    this.guardarCarrito();
  }

  disminuirCantidad(index: number) {
    this.carrito[index].cantidad -= 1;
    if (this.carrito[index].cantidad <= 0) {
      this.carrito.splice(index, 1);
    }
    this.guardarCarrito();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  async limpiarCarrito() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas limpiar el carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, limpiar',
          handler: () => {
            this.carrito = [];
            this.guardarCarrito();
          },
        },
      ],
    });

    await alert.present();
  }
}