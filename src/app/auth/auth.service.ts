import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";


interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
	constructor(private http: HttpClient) {}

	signup(email: string, password: string) {
		return this.http.post<AuthResponseData>(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEQ8RaTR1-DPvR971FAZxd8jSYzM5KExs",
			{
				email,
				password,
				returnSecureToken: true
			}
		).pipe(catchError(errorRes => {
			let errorMessage = 'an unknown error';
			if (!errorRes.error || !errorRes.error.error) {
				return throwError(errorMessage);
			}

			switch(errorRes.error.error.message) {
				case 'EMAIL_EXISTS' : errorMessage = 'This email exists already';
			}
			return throwError(errorMessage);
		}));
	}
}
