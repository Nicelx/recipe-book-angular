import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[]= [
    new Recipe('A test recipe', 'description', 'https://live.staticflickr.com/65535/51129079431_9ec756feb6_b.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
