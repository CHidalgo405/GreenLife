import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false
})
export class TabsPage {
  selectedTab: string = 'tab1'; // Default tab

  constructor() {}

  onTabChange(event: { tab: string }) {
    this.selectedTab = event.tab; // Accede directamente a event.tab
  }
}
