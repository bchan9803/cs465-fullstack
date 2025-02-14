import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = trips

  constructor() {}

  ngOnInit(): void {
    
  }
}
