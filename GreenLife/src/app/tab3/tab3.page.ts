import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  isLoggedIn: boolean = false;
  userProfile = {
    name: 'Carlos Hidalgo',
    email: 'carlos@gmail.com',
    phone: '+52 123 456 7890',
    bio: 'Apasionado por la tecnología y el desarrollo de aplicaciones móviles.'
  };

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}