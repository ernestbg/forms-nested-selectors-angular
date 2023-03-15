import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { SelectorsPageComponent } from './pages/selectors-page/selectors-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectorsPageComponent],
  imports: [CommonModule, CountriesRoutingModule, ReactiveFormsModule],
})
export class CountriesModule {}
