import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { LazyComponent } from "./lazy/lazy.component";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    standalone: true,
    imports: [LazyComponent]
})
export class AboutComponent {
}

export default AboutComponent;
