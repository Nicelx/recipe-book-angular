import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();


	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 		"Окрошка",
	// 		"Отличный вкус лета",
	// 		"https://eda.ru/img/eda/c1200x1280/s1.eda.ru/StaticContent/Photos/140424040926/140429194401/p_O.jpg",
	// 		[
	// 			new Ingredient("квас", 1),
	// 			new Ingredient("огурец", 1),
	// 			new Ingredient("картофель", 2-3),
	// 			new Ingredient("зелень", 1),
	// 			new Ingredient("сметана", 1),
	// 		]
	// 	),
	// 	new Recipe(
	// 		"Жареная картшка",
	// 		"Батька одобряет",
	// 		"https://s1.eda.ru/StaticContent/Photos/170306185211/210216083616/p_O.jpg",
	// 		[
	// 			new Ingredient('картофель' ,3),
	// 			new Ingredient('масло' ,1),
	// 		]
	// 	),
	// ];

	private recipes: Recipe[] = [];

	constructor(private slService: ShoppingListService) {

	}

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes;
		this.recipesChanged.next(this.recipes.slice());
	}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}
	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice())
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe
		this.recipesChanged.next(this.recipes.slice())
	}
	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.recipesChanged.next(this.recipes.slice())
	}
}
