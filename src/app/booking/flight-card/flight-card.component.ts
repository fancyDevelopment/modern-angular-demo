import { NgClass, DatePipe } from "@angular/common";
import { Component, ElementRef, Input, NgZone, Output, effect, inject, input, model, output } from "@angular/core";
import { Flight, initFlight } from "@demo/data";
import { CityPipe } from "../../shared/city.pipe";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'flight-card',
    templateUrl: './flight-card.component.html',
    styleUrl: './flight-card.component.css',
    standalone: true,
    imports: [NgClass, RouterLink, DatePipe, CityPipe]
})
export class FlightCardComponent {
  
  item = input<Flight>(initFlight);
  selected = model<boolean | undefined>(undefined);
  selectedChange = output<boolean>();
  showEditButton = input(true);

  private element = inject(ElementRef);
  private zone = inject(NgZone);
  
  select() {
    this.selected.set(true);
    this.selectedChange.emit(true);
  }

  deselect() {
    this.selected.set(false);
    this.selectedChange.emit(false);
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
