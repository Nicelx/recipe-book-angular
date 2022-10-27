import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";

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
						return of(new AuthActions.Login({
							email: resData.email,
							userId : resData.localId,
							token: resData.idToken,
							expirationDate
						}));
					}),
					catchError((error) => {
						//...
						return of();
					})
				);
		})
	);

	constructor(private actions$: Actions, private http: HttpClient) {}
}
