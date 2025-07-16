import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page{
  productos = [
    { nombre: 'Lechuga 1', descripcion: 'No se que poner pero aca va la descripción.', precio: 25 },
    { nombre: 'Lechuga 2', descripcion: 'No se que poner pero aca va la descripción.', precio: 40 },
    { nombre: 'Lechuga 3', descripcion: 'No se que poner pero aca va la descripción.', precio: 35 },
    { nombre: 'Lechuga 4', descripcion: 'No se que poner pero aca va la descripción.', precio: 30 },
    // Agrega más productos si quieres
  ];

  constructor(private toastController: ToastController) {}
  
  async agregarAlCarrito(producto: any) {

  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  const index = carrito.findIndex((p: any) => p.nombre === producto.nombre);

  if (index > -1) {
    carrito[index].cantidad += 1;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }

  const toast = await this.toastController.create({
    message: '¡Producto agregado al carrito!',
    duration: 2500,
    color: 'success',
    position: 'middle',
  });
  await toast.present();

  localStorage.setItem('carrito', JSON.stringify(carrito));
  console.log('Producto agregado al carrito:', producto);
}
}