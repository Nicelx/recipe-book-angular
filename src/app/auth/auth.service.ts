import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
	constructor(private http: HttpClient) {}

	signup() {
		this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEQ8RaTR1-DPvR971FAZxd8jSYzM5KExs', {
			
		})
	}
}