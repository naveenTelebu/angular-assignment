import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CountryData, Region } from '../models/region';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CutomerService {
  apiUrl: string = 'http://localhost:3000/customers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }

  // Read
  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`);
  }

  listById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Update
  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Delete
  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.handleError));
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getRegionData(): Observable<Region[]> {
    return this.http
      .get<CountryData>('https://api.first.org/data/v1/countries')
      .pipe(
        map((response) => {
          const regions = Object.values(response.data).map(
            (country) => country.region
          );
          const uniqueRegions = Array.from(new Set(regions)).map((region) => ({
            id: region,
            title: region,
          }));
          return uniqueRegions;
        }),
        catchError(this.handleError)
      );
  }

  // Fetch country data based on region selection from API
  getCountriesByRegion(region: string): Observable<Region[]> {
    return this.http
      .get<CountryData>(
        `https://api.first.org/data/v1/countries?region=${region}`
      )
      .pipe(
        map((response) => {
          const countries = Object.values(response.data).map(
            (country) => country.country
          );
          const countriesList = Array.from(countries).map((country) => ({
            id: country,
            title: country,
          }));
          return countriesList;
        }),
        catchError(this.handleError)
      );
  }

  toastr(
    e?: string,
    j?: { text?: string; time?: number; icon?: 'error' | 'warning' | 'success' }
  ): void {
    Swal.fire({
      position: 'center',
      icon: j?.icon ?? 'error',
      title: e ?? 'Something went wrong, try again.',
      showConfirmButton: false,
      timer: j?.time ?? 4000,
      ...(j?.text && { text: j?.text ?? '' }),
    });
  }
}
