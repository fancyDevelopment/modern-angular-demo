import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CityPipe } from './city.pipe';
import { CityValidator } from './city.validator';

@NgModule({
    imports: [CommonModule, CityPipe, CityValidator],
    exports: [CityPipe, CityValidator],
    providers: [],
})
export class SharedModule { }
