import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  products: any[] = [];

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController // agrega esto

  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  async openProductModal(product: any) {
  const modal = await this.modalController.create({
    component: ProductModalComponent,
    componentProps: { product }
  });
  return await modal.present();
  }

  loadProducts() {
    this.authService.getProducts().subscribe({
      next: (res) => {
        if (res.data) {
          this.products = res.data.map((product: any) => ({
            ...product,
            fotourl: product.fotourl || 'https://via.placeholder.com/150', // Fallback image
            stockStatus: this.getStockStatus(product.stock)
          }));
        } else {
          this.showToast('No se encontraron productos.', 'warning');
        }
      },
      error: async (err) => {
        console.error('Error fetching products:', err);
        await this.showToast('Error al cargar los productos.', 'danger');
      }
    });
  }

  getStockStatus(stock: string): string {
    const stockNum = parseInt(stock, 10);
    if (stockNum === 0) {
      return 'Agotado';
    } else if (stockNum <= 10) {
      return 'Últimas unidades';
    } else {
      return 'Disponible';
    }
  }

  async agregarAlCarrito(producto: any) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    const index = carrito.findIndex((p: any) => p.idproducto === producto.idproducto);

    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      producto.cantidad = 1;
      carrito.push({
        idproducto: producto.idproducto,
        nombreproducto: producto.nombreproducto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        fotourl: producto.fotourl,
        cantidad: producto.cantidad
      });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));

    const toast = await this.toastController.create({
      message: `¡${producto.nombreproducto} agregado al carrito!`,
      duration: 2500,
      color: 'success',
      position: 'middle'
    });
    await toast.present();

    console.log('Carrito actualizado:', carrito);
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
}