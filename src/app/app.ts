import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { GarageComponent } from './components/garage/garage.component';
import { CarModalComponent } from './components/car-modal/car-modal.component';
import { CommunityInboxComponent } from './components/community-inbox/community-inbox.component';
import { AdminModalComponent } from './components/admin-modal/admin-modal.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    GarageComponent,
    CarModalComponent,
    CommunityInboxComponent,
    AdminModalComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
