import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.page.html',
  styleUrls: ['./recibo.page.scss'],
  standalone: false,
})
export class ReciboPage {
  carrito: any[] = [];
  total = 0;
  fecha = new Date();
  folio = '';

  constructor(private router: Router) {}

  ionViewWillEnter() {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
    this.total = this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    this.folio = this.generarFolio();
  }

  generarFolio(): string {
    const timestamp = new Date().getTime();
    return 'F-' + timestamp.toString().slice(-8);
  }

  descargarPDF() {
    const doc = new jsPDF();
    let y = 10;

    // Encabezado
    doc.setFontSize(16);
    doc.text('Recibo de compra - Green Life', 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Fecha: ${this.fecha.toLocaleString()}`, 10, y);
    y += 6;
    doc.text(`Folio: ${this.folio}`, 10, y);
    y += 10;

    // Tabla de productos
    doc.setFontSize(13);
    doc.text('Productos:', 10, y);
    y += 8;

    doc.setFontSize(11);
    this.carrito.forEach(item => {
      const linea = `${item.nombreproducto} x${item.cantidad} — $${item.precio * item.cantidad}`;
      doc.text(linea, 12, y);
      y += 6;
    });

    y += 6;
    doc.setDrawColor(100);
    doc.line(10, y, 200, y); // línea divisoria
    y += 8;

    // Total
    doc.setFontSize(13);
    doc.setFont('bold');
    doc.text(`Total: $${this.total.toFixed(2)}`, 10, y);
    doc.setFont('normal');

    y += 15;
    doc.setFontSize(12);
    doc.text('Gracias por tu compra <3', 10, y);
    y += 6;
    doc.text('Green Life - Productos ecológicos de limpieza', 10, y);

    doc.save(`recibo-${this.folio}.pdf`);
    localStorage.removeItem('carrito');
  }

  // Regresar al tab3 y limpiar el carrito
  async finalizarCompra() {
    localStorage.removeItem('carrito');
  } 
}
