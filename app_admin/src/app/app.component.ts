import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  // imports: [CommonModule, RouterOutlet, TripListingComponent, NavbarComponent, HttpClientModule],       // uncomment if fix is needed

  imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin!';
}
