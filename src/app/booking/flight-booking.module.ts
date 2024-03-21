import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlightCardComponent } from './flight-card/flight-card.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { RouterModule } from '@angular/router';
import FLIGHT_BOOKING_ROUTES from './flight-booking.routes';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FLIGHT_BOOKING_ROUTES),
    FlightCardComponent,
    FlightSearchComponent,
    FlightEditComponent,
    PassengerSearchComponent,
],
    exports: [],
    providers: [],
})
export class FlightBookingModule {}
