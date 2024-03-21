import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { Flight, FlightService } from '@demo/data';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { CityValidator } from '../../shared/city.validator';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

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
  private flightService = inject(FlightService);

  from = model('Hamburg'); // in Germany
  to = model('Graz'); // in Austria

  flights = signal<Flight[]>([]);

  basket = signal<Record<number, boolean>>({});

  route = computed(() => this.from() + ' - ' + this.to());

  constructor() {
    effect(() => this.search());
  }

  ngOnInit(): void {}

  async search() {
    if (!this.from() || !this.to()) return;

    this.flights.set(await this.flightService.findWithPromise(this.from(), this.to()));
  }

  delay(): void {
    const flight = this.flights()[0];
    const date = new Date(flight.date);

    date.setTime(date.getTime() + 1000 * 60 * 15);
    flight.date = date.toISOString();

    this.flights.set([ { ...flight }, ...this.flights().slice(1) ])
  }
}
