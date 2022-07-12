import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from './../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();
	private recipes: Recipe[] = [
		new Recipe(
			"Окрошка",
			"Отличный вкус лета",
			"https://eda.ru/img/eda/c1200x1280/s1.eda.ru/StaticContent/Photos/140424040926/140429194401/p_O.jpg",
			[
				new Ingredient("квас", 1),
				new Ingredient("огурец", 1),
				new Ingredient("картофель", 2-3),
				new Ingredient("зелень", 1),
				new Ingredient("сметана", 1),
			]
		),
		new Recipe(
			"Жареная картшка",
			"Батька одобряет",
			"https://s1.eda.ru/StaticContent/Photos/170306185211/210216083616/p_O.jpg",
			[
				new Ingredient('картофель' ,3),
				new Ingredient('масло' ,1),
			]
		),
	];

	constructor(private slService: ShoppingListService) {

	}

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}
}
