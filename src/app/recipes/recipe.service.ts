import { Recipe } from "./recipe.model";

export class RecipeService {
	private recipes : Recipe[]= [
		new Recipe('First recipe', 'first description', 'https://live.staticflickr.com/65535/51129079431_9ec756feb6_b.jpg'),
		new Recipe('second recipe', 'second description', 'https://live.staticflickr.com/65535/51129079431_9ec756feb6_b.jpg')
	  ];

	getRecipes() {
		return this.recipes.slice();
	}
}