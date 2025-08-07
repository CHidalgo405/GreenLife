import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/api.service'; // <-- Importa tu servicio

declare var paypal: any;

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.page.html',
  styleUrls: ['./resumen-compra.page.scss'],
  standalone: false,
})
export class ResumenCompraPage implements OnInit, AfterViewInit {
  carrito: any[] = [];
  total = 0;
  clientId = 'AUIwjNjg2bbKkRGdEEoShrtUu_zp2EAnDvn5hnncvvwZqU9cMlht0Tv3Yzxka0V8nrlFJ-_ttLy6CbQ3';
  direccionUsuario: string = ''; // <-- Nueva variable para la dirección

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService // <-- Inyecta el servicio
  ) {}

  ngOnInit() {
    // Carga la dirección del usuario
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getUser(userId).subscribe({
        next: (res) => {
          this.direccionUsuario = res.data?.direccion || 'No disponible';
        },
        error: () => {
          this.direccionUsuario = 'No disponible';
        }
      });
    } else {
      this.direccionUsuario = 'No disponible';
    }
  }

  ionViewWillEnter() {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
    this.total = this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }
  
  async ngAfterViewInit() {
    if (!document.getElementById('paypal-sdk')) {
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD`;
      script.onload = () => this.renderPayPalButton();
      document.body.appendChild(script);
    } else {
      this.renderPayPalButton();
    }
  }

  renderPayPalButton() {
  paypal.Buttons({
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: this.total.toString()
          }
        }]
      });
    },
    onApprove: (data: any, actions: any) => {
      return actions.order.capture().then((details: any) => {
        // Construir datos de la venta
        const userId = this.authService.getUserId();
        const venta = {
          NombreVenta: this.carrito.length === 1 ? this.carrito[0].nombreproducto : 'Compra múltiple',
          MetodoPago: details.payment_source?.card ? 'Tarjeta' : 'PayPal',
          Monto: this.total,
          IdAdministrador: 1,
          IdUsuario: userId ? parseInt(userId, 10) : null,
          Detalles: this.carrito.map(item => ({
            IdProducto: item.idproducto,
            Cantidad: item.cantidad,
            PrecioProducto: item.precio
          }))
        };

        this.authService.registrarVenta(venta).subscribe({
          next: () => {
            this.router.navigate(['/recibo']);
          },
          error: (err) => {
            console.error('Error registrando venta:', err);
            this.router.navigate(['/recibo']);
          }
        });
      });
    },
    onError: (err: any) => {
      console.error('Error con PayPal:', err);
    }
  }).render('#paypal-button-container');
  }

  goBack() {
    this.location.back();
  }
}