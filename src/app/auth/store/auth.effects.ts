import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";
import { Router } from "@angular/router";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registred?: boolean;
}

@Injectable()
export class AuthEffects {
	@Effect()
	authSignup = this.actions$.pipe(
		ofType(AuthActions.SIGNUP_START)
	);

	@Effect()
	authLogin = this.actions$.pipe(
		ofType(AuthActions.LOGIN_START),
		switchMap((authData: AuthActions.LoginStart) => {
			let url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
				environment.firebaseAPIKey;
			return this.http
				.post<AuthResponseData>(url, {
					email: authData.payload.email,
					password: authData.payload.password,
					returnSecureToken: true,
				})
				.pipe(
					map((resData) => {
						const expirationDate = new Date(
							new Date().getTime() + +resData.expiresIn * 1000
						);
						return new AuthActions.AuthenticateSuccess({
							email: resData.email,
							userId: resData.localId,
							token: resData.idToken,
							expirationDate,
						});
					}),
					catchError((errorRes) => {
						//...

						let errorMessage = "an unknown error";
						if (!errorRes.error || !errorRes.error.error) {
							return of(new AuthActions.AuthenticateFail(errorMessage));
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
						return of(new AuthActions.AuthenticateFail(errorMessage));
					})
				);
		})
	);

	@Effect({
		dispatch: false,
	})
	authSuccess = this.actions$.pipe(
		ofType(AuthActions.AUTHENTICATE_SUCCESS),
		tap(() => {
			this.router.navigate(["/"]);
		})
	);

	constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}