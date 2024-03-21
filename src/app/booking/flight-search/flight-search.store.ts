import { computed, inject } from "@angular/core";
import { Flight, FlightService } from "@demo/data";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from "rxjs";

export const FlightSearchStore = signalStore(
    { providedIn: 'root'},
    withState({
        from: 'Hamburg',
        to: 'Graz',
        flights: [] as Flight[],
        basket: {} as Record<number, boolean>
    }),
    withComputed(store => ({
        route: computed(() => store.from() + ' - ' + store.to()),
        criteria: computed(() => ({ from: store.from(), to: store.to() }))
    })),
    withMethods((store, flightService = inject(FlightService)) => ({
        updateCriteria(from: string, to: string) {
            patchState(store, { from, to });
        },
        async loadFlights() {
            const flights = await flightService.findWithPromise(store.from(), store.to());
            patchState(store, { flights });
        },
        setBasketState(id: number, state: boolean) {
            patchState(store, { basket: { ...store.basket(), [id]: state }})
        },
        delay() {
            const flight = store.flights()[0];
            const date = new Date(flight.date);

            date.setTime(date.getTime() + 1000 * 60 * 15);
            flight.date = date.toISOString();

            const newArray = [ { ...flight }, ...store.flights().slice(1) ];

            patchState(store, {flights: newArray});
        },
        connectCriteria: rxMethod<{ from: string, to: string }>(pipe(
            switchMap(c => flightService.find(c.from, c.to)), 
            tap(flights => patchState(store, {flights}))
            ))
    })),
    withHooks({
        onInit(store) {
            store.connectCriteria(store.criteria);
        }
    })
);