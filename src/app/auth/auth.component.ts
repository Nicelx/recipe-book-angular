import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
})
export class AuthComponent {
	constructor(private authService: AuthService) {}
	isLoginMode = true;
	isLoading = false;
	error: string = null;

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}

		console.log(form.value);

		const { email, password } = form.value;

		this.isLoading = true;
		let authObs: Observable<AuthResponseData>;

		if (this.isLoginMode) {
			authObs = this.authService.login(email, password);
		} else {
			authObs = this.authService.signup(email, password);
		}

		authObs.subscribe(
			(resData) => {
				this.isLoading = false;
				console.log("res data", resData);
			},
			(errorMessage) => {
				this.isLoading = false;

				this.error = errorMessage;
				console.log(errorMessage);
			}
		);
		form.reset();
	}
}
