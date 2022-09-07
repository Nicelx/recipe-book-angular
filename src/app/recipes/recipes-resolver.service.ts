import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { resolve } from "dns";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
	constructor(private dataStorageService: DataStorageService) {
		resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
			
		}
	}
} 