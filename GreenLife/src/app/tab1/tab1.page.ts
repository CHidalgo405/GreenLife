import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page{
  productos = [
    { nombre: 'Lechuga', descripcion: 'No se que poner pero aca va la descripción.', precio: 25 },
    { nombre: 'Lechuga', descripcion: 'No se que poner pero aca va la descripción.', precio: 40 },
    { nombre: 'Lechuga', descripcion: 'No se que poner pero aca va la descripción.', precio: 35 },
    { nombre: 'Lechuga', descripcion: 'No se que poner pero aca va la descripción.', precio: 30 },
    // Agrega más productos si quieres
  ];

  agregarAlCarrito(producto: any) {
    console.log('Producto agregado al carrito:', producto);
    // Aquí puedes integrar lógica para guardar en el carrito real
  }
}