import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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
	user = new Subject<User>();
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
			.pipe(
				catchError(this.handleError),
				tap((resData) => {
					this.handleAuthentication(
						resData.email,
						resData.localId,
						resData.idToken,
						+resData.expiresIn
					);
				})
			);
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
			.pipe(
				catchError(this.handleError),
				tap((resData) => {
					this.handleAuthentication(
						resData.email,
						resData.localId,
						resData.idToken,
						+resData.expiresIn
					);
				})
			);
	}

	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
		const user = new User(email, userId, token, expirationDate);

		this.user.next(user);
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
			case "INVALID_PASSWORD":
				errorMessage = "this password is not correct";
				break;
		}
		return throwError(errorMessage);
	}
}
