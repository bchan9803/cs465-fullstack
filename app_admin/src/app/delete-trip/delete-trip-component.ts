import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-delete-trip',
  imports: [CommonModule, ReactiveFormsModule],
})


export class DeleteTripComponent implements OnInit {
  trip!: Trip

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // retrieve stashed trip ID
    let tripCode = localStorage.getItem('tripCode')
        if (!tripCode) {
            alert("Something wrong, couldn't find where I stashed tripCode!")

            this.router.navigate([''])
            return
        }   

    this.tripDataService.deleteTrip(tripCode)
    }
}