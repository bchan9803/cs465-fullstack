import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn()
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode')
    localStorage.setItem('tripCode', trip.code)
    this.router.navigate(['edit-trip'])
  }

  public deleteTrip(trip: Trip) {
    localStorage.removeItem('tripCode')
    localStorage.setItem('tripCode', trip.code)
    
    
    console.log(trip.code)
    const apiUrl = `http://localhost:3000/api/trips/${trip.code}`
    
    fetch(apiUrl, {
      method: 'DELETE',
      })
      
      try {
        this.router.navigate(['/'])
        console.log(`Trip ${trip.code} deleted!`)
      }
      catch {
        console.error('Error: Could not delete trip!')
      }
  }
}
