import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false
})
export class WelcomePage {

  constructor(private navCtrl: NavController) {}

  goToHome() {
    this.navCtrl.navigateRoot('/tabs'); // o cualquier otra ruta principal de tu app
  }

  // actualizar una vez la app cada vez que se ingresa a la página de bienvenida
  ionViewWillEnter() {
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }

}
