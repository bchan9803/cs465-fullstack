import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) {}

  getTrips() : Observable<Trip[]> {
    let url = 'http://localhost:3000/api/trips'

    return this.http.get<Trip[]>(url)
  }
}
