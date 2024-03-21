import { JsonPipe, NgFor, NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { Passenger} from '../../data/passenger';

@Component({
    selector: 'app-passenger-search',
    templateUrl: './passenger-search.component.html',
    standalone: true,
    imports: [NgIf, NgFor]
})
export class PassengerSearchComponent {
  private http = inject(HttpClient);

  passengers: Passenger[] = [];

  constructor() {
    const url = 'https://demo.angulararchitects.io/api/passenger';
    this.http.get<Passenger[]>(url).subscribe(
      passengers => {
        this.passengers = passengers;
      }
    );
  }

}
