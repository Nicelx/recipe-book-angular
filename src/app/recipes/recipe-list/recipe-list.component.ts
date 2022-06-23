import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  recipes : Recipe[]= [
    new Recipe('First recipe', 'first description', 'https://live.staticflickr.com/65535/51129079431_9ec756feb6_b.jpg'),
    new Recipe('second recipe', 'second description', 'https://live.staticflickr.com/65535/51129079431_9ec756feb6_b.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
