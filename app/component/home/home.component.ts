import { HousingService } from './../../housing.service';
import { Housinglocation } from './../../housinglocation';
import { Component, inject } from '@angular/core';
import { HousingComponent } from '../housing/housing.component';
import { NgClass, NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingComponent, NgFor],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      <app-housing
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  HousinglocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: Housinglocation[]) => {
      this.HousinglocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.HousinglocationList;
    }

    this.filteredLocationList = this.HousinglocationList.filter(
      (housingLocation) =>
        housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
