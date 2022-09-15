import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registred?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
	constructor(private http: HttpClient) {}

	signup(email: string, password: string) {
		return this.http
			.post<AuthResponseData>(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEQ8RaTR1-DPvR971FAZxd8jSYzM5KExs",
				{
					email,
					password,
					returnSecureToken: true,
				}
			)
			.pipe(catchError(this.handleError));
	}

	login(email: string, password: string) {
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEQ8RaTR1-DPvR971FAZxd8jSYzM5KExs";
		return this.http
			.post<AuthResponseData>(url, {
				email,
				password,
				returnSecureToken: true,
			})
			.pipe(catchError(this.handleError));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMessage = "an unknown error";
		if (!errorRes.error || !errorRes.error.error) {
			return throwError(errorMessage);
		}

		switch (errorRes.error.error.message) {
			case "EMAIL_EXISTS":
				errorMessage = "This email exists already";
				break;
			case "EMAIL_NOT_FOUND":
				errorMessage = "This email was not found";
				break;
			case "INVALID_PASSWORD" :
				errorMessage = "this password is not correct";
				break;
		}
		return throwError(errorMessage);
	}
}
