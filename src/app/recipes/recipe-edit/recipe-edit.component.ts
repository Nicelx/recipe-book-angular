import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../store/recipe.actions";
import { UpdateRecipe } from "./../store/recipe.actions";
import { Subscription } from "rxjs";

@Component({
	selector: "app-recipe-edit",
	templateUrl: "./recipe-edit.component.html",
	styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	id: number;
	editMode = false;
	recipeForm: FormGroup;
	private storeSub: Subscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit(): void {
		try {
			console.log("init recipe edit");
			this.route.params.subscribe((params: Params) => {
				this.id = +params["id"];
				this.editMode = params["id"] != null;
				this.initForm();
			});
		} catch (e) {
			console.log('recipe edit component');
		}
	}

	onSubmit() {
		try {
			if (this.editMode) {
				this.store.dispatch(
					new RecipesActions.UpdateRecipe({
						index: this.id,
						newRecipe: this.recipeForm.value,
					})
				);
			} else {
				this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
			}
			this.onCancel();

		}
		catch(e) {
			console.log('on submit recipe edit')
		}
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get("ingredients")).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[1-9]+[0-9]*$/),
				]),
			})
		);
	}

	onDeleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
	}

	onCancel() {
		this.router.navigate(["../"], { relativeTo: this.route });
	}

	ngOnDestroy(): void {
		if (this.storeSub) {
			this.storeSub.unsubscribe();
		}
	}

	private initForm() {
		let recipeName = "";
		let recipeImagePath = "";
		let recipeDescription = "";
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			// const recipe = this.recipeService.getRecipe(this.id);
			this.storeSub = this.store
				.select("recipes")
				.pipe(
					map((recipeState) => {
						return recipeState.recipes.find((recipe, index) => {
							return index === this.id;
						});
					})
				)
				.subscribe((recipe) => {
					recipeName = recipe.name;
					recipeImagePath = recipe.imagePath;
					recipeDescription = recipe.description;

					if (recipe["ingredients"]) {
						for (let ingredient of recipe.ingredients) {
							recipeIngredients.push(
								new FormGroup({
									name: new FormControl(ingredient.name, Validators.required),
									amount: new FormControl(ingredient.amount, [
										Validators.required,
										Validators.pattern(/^[1-9]+[0-9]*$/),
									]),
								})
							);
						}
					}
				});
		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImagePath, Validators.required),
			description: new FormControl(recipeDescription, Validators.required),
			ingredients: recipeIngredients,
		});
	}

	get controls() {
		return (<FormArray>this.recipeForm.get("ingredients")).controls;
	}
}
