import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { LoggingService } from "../logging.service";

import { Ingredient } from "../shared/ingredient.model";

import * as ShoppingListActions from './store/shopping-list.actions'
import * as fromApp from '../store/app.reducer'

@Component({
	selector: "app-shopping-list",
	templateUrl: "./shopping-list.component.html",
	styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Observable<{ ingredients: Ingredient[] }>;
	private igChangeSub: Subscription;

	constructor(
		private loggingService: LoggingService,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit(): void {
		this.ingredients = this.store.select("shoppingList");
		this.loggingService.printLog("from shopping list component ngonInit");
		
	}
	ngOnDestroy(): void {
		// this.igChangeSub.unsubscribe();
	}
	onEditItem(index: number) {
		// this.slService.startedEditing.next(index);
		this.store.dispatch(new ShoppingListActions.StartEdit(index))
	}
}
