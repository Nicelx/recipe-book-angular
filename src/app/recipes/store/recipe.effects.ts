import {Actions, Effect, ofType} from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as RecipesActions from './recipe.actions'
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
	@Effect()
	fetchRecipes = this.actions$.pipe(
		ofType(RecipesActions.FETCH_RECIPES),
		switchMap(() => {
			return this.http
			.get<Recipe[]>(
				"https://angular-test-afd6e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
			) 
		}),
		map((recipes) => {
			return recipes.map((recipe) => {
				return {
					...recipe,
					ingredients: recipe.ingredients ? recipe.ingredients : [],
				};
			});
		}),
		map(recipes => {
			return new RecipesActions.SetRecipes(recipes)
		})
	)

	constructor(private actions$: Actions, private http: HttpClient) {

	}
}