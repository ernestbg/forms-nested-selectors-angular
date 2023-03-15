import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country, CountryShort } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}

  private _regions: string[] = [
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania',
  ];
  private apiUrl: string = 'https://restcountries.com/v2';

  get regions() {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<CountryShort[]> {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.httpClient.get<CountryShort[]>(url);
  }

  getCountryByCode (code:string): Observable<Country | null>{

    if(!code){
      return of (null);
    }

    const url:string=`${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country>(url);

  }

  getCountryByCodeShort (code:string): Observable<CountryShort>{
    const url:string=`${this.apiUrl}/alpha/${code}?fields=alpha3Code,name`;
    return this.httpClient.get<CountryShort>(url);

  }

  getCountriesByCodes(borders:string[]): Observable<CountryShort[]>{
    if(!borders){
      return of([]);
    }

    const requests:Observable<CountryShort>[]=[]

    borders.forEach(code=>{
      const request=this.getCountryByCodeShort(code);
      requests.push(request)
    })

    return combineLatest(requests);
  }
}
