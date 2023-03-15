import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorsPageComponent } from './pages/selectors-page/selectors-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'selector', component: SelectorsPageComponent },
      { path: '**', redirectTo: 'selector' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
