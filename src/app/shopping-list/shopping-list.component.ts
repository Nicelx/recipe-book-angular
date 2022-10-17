import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { LoggingService } from "../logging.service";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

import * as fromShoppingList from './store/shopping-list.reducer'

@Component({
	selector: "app-shopping-list",
	templateUrl: "./shopping-list.component.html",
	styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Observable<{ ingredients: Ingredient[] }>;
	private igChangeSub: Subscription;

	constructor(
		private slService: ShoppingListService,
		private loggingService: LoggingService,
		private store: Store<fromShoppingList.AppState>
	) {}

	ngOnInit(): void {
		this.ingredients = this.store.select("shoppingList");
		// this.ingredients = this.slService.getIngredients();
		// this.igChangeSub = this.slService.ingredientsChanged.subscribe(
		// 	(ingredients: Ingredient[]) => {
		// 		this.ingredients = ingredients;
		// 	}
		// );

		this.loggingService.printLog("from shopping list component ngonInit");
	}
	ngOnDestroy(): void {
		// this.igChangeSub.unsubscribe();
	}
	onEditItem(index: number) {
		this.slService.startedEditing.next(index);
	}
}
