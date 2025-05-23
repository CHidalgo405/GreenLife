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

}
