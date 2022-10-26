import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";
import { of } from "rxjs";

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registred?: boolean;
}

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
					catchError((error) => {
						//...
						of();
					}),
					map((resData) => {
						of();
					})
				);
		})
	);

	constructor(private actions$: Actions, private http: HttpClient) {}
}
