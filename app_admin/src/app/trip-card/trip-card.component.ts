import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
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
      headers: {
          // 'Content-Type': 'application/json'
        },
      })
      
      
      this.router.navigate([''])

  }
}
