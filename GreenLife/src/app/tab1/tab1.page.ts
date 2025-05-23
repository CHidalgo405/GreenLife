import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page{
  productos = [
    { nombre: 'Lechuga tipo 1', descripcion: 'No se que poner pero aca va la descripción.', precio: 25 },
    { nombre: 'Lechuga tipo 2', descripcion: 'No se que poner pero aca va la descripción.', precio: 40 },
    { nombre: 'Lechuga tipo 3', descripcion: 'No se que poner pero aca va la descripción.', precio: 35 },
    { nombre: 'Lechuga tipo 4', descripcion: 'No se que poner pero aca va la descripción.', precio: 30 },
    { nombre: 'Lechuga tipo 5', descripcion: 'No se que poner pero aca va la descripción.', precio: 50 },
    // Agrega más productos si quieres
  ];

  agregarAlCarrito(producto: any) {
    console.log('Producto agregado al carrito:', producto);
    // Aquí puedes integrar lógica para guardar en el carrito real
  }
}