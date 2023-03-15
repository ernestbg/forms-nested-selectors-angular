import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { CountryShort } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-selectors-page',
  templateUrl: './selectors-page.component.html',
})
export class SelectorsPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: [ '', Validators.required],
  });

  regions: string[] = [];
  countries: CountryShort[] = [];
  //borders: string[] = [];
  borders: CountryShort[] = [];

  loading:boolean=false;

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
    // this.myForm.get('region')?.valueChanges.subscribe((region) => {
    //   console.log(region);

    //   this.countriesService
    //     .getCountriesByRegion(region)
    //     .subscribe((countries) => {
    //       console.log(countries);
    //       this.countries = countries;
    //     });
    // });

    this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.myForm.get('country')?.reset('');   
       
        }),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )       
      )
      .subscribe((countries) => {
             
        this.countries = countries;

      });


    this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.reset('');
          this.loading=true;
         
          
        }),
        switchMap((code) => this.countriesService.getCountryByCode(code)),
        switchMap((country) => this.countriesService.getCountriesByCodes(country?.borders!))
        
      )
      .subscribe((countries) => {
        //this.borders = country?.borders || [];
        this.borders=countries;
        this.loading=false;
        
        
      });
  }

  save() {}
}
