import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}
  
  
  baseUrl = 'http://localhost:3000/api';
  url = this.baseUrl + '/trips';


  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd)
  }
  
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd)
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    }

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData)
  }




  getTrips() : Observable<Trip[]> {
    // return this.http.get<Trip[]>(this.url)
    return this.http.get<Trip[]>('http://localhost:3000/api/trips')

  }
  



  addTrip(formData: Trip) : Observable<Trip[]> {
    return this.http.post<Trip[]>(this.url, formData)
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode)
  }

  updateTrip(formData: Trip) : Observable<Trip[]> {
    return this.http.put<Trip[]>(this.url + '/' + formData.code, formData)
  }

  // 
  deleteTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.delete<Trip[]>(this.url + '/' + tripCode)
  }  
}