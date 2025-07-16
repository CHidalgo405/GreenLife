import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var paypal: any;

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.page.html',
  styleUrls: ['./resumen-compra.page.scss'],
  standalone: false,
})
export class ResumenCompraPage implements AfterViewInit {
  carrito: any[] = [];
  total = 0;
  clientId = 'AUIwjNjg2bbKkRGdEEoShrtUu_zp2EAnDvn5hnncvvwZqU9cMlht0Tv3Yzxka0V8nrlFJ-_ttLy6CbQ3';

  constructor(private router: Router, private location: Location) {}

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
          console.log('Pago completado por:', details.payer.name.given_name);
          this.router.navigate(['/recibo']);
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
