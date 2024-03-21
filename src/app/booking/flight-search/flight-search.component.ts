import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { Flight, FlightService } from '@demo/data';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { CityValidator } from '../../shared/city.validator';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { FlightSearchStore } from './flight-search.store';

@Component({
    selector: 'flight-search',
    templateUrl: './flight-search.component.html',
    standalone: true,
    imports: [
        FormsModule,
        CityValidator,
        NgIf,
        NgFor,
        FlightCardComponent,
        JsonPipe,
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
}
