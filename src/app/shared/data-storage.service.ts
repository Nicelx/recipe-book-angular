import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
	providedIn: "root",
})
export class DataStorageService {
	constructor(private http: HttpClient, private recipeService: RecipeService) {}
	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		1;
		this.http
			.put(
				"https://angular-test-afd6e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
				recipes
			)
			.subscribe(response => {
				console.log(response);
			});
	}
}
