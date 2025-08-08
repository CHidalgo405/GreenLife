import { Component, Input } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
  standalone: true,
  imports: [IonicModule] 
})
export class ProductModalComponent {
  @Input() product: any;

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async agregarAlCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const index = carrito.findIndex((p: any) => p.idproducto === this.product.idproducto);

    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      this.product.cantidad = 1;
      carrito.push({
        idproducto: this.product.idproducto,
        nombreproducto: this.product.nombreproducto,
        descripcion: this.product.descripcion,
        precio: this.product.precio,
        fotourl: this.product.fotourl,
        cantidad: this.product.cantidad
      });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));

    const toast = await this.toastController.create({
      message: `¡${this.product.nombreproducto} agregado al carrito!`,
      duration: 2500,
      color: 'success',
      position: 'middle'
    });
    await toast.present();
    this.close();
  }
}