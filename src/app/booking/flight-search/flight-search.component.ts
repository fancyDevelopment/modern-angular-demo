import { Component, inject, OnInit } from '@angular/core';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { JsonPipe } from '@angular/common';
import { CityValidator } from '../../shared/city.validator';
import { FormsModule } from '@angular/forms';
import { FlightSearchStore } from './flight-search.store';

@Component({
    selector: 'flight-search',
    templateUrl: './flight-search.component.html',
    standalone: true,
    imports: [
    FormsModule,
    CityValidator,
    FlightCardComponent,
    JsonPipe
],
})
export class FlightSearchComponent implements OnInit {
  private store = inject(FlightSearchStore);

  from = this.store.from;
  to = this.store.to;
  flights = this.store.flights;
  basket = this.store.basket;
  route = this.store.route;

  ngOnInit(): void {}

  async search() {
    if (!this.from() || !this.to()) return;
    this.store.loadFlights();
  }

  delay(): void {
    this.store.delay();
  }

  updateCriteria(from: string, to: string) {
    this.store.updateCriteria(from, to);
  }

  setBasektState(id: number, state: boolean | undefined) {
    this.store.setBasketState(id, state ?? false);
  }


}
