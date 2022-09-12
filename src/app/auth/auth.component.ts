import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
})
export class AuthComponent {
	constructor(private authService: AuthService) {}
	isLoginMode = true;

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}

		console.log(form.value);

		const { email, password } = form.value;

		if (this.isLoginMode) {
		} else {
			this.authService.signup(email, password).subscribe(
				(resData) => {
					console.log("res data", resData);
				},
				(error) => {
					console.log(error);
				}
			);
		}

		form.reset();
	}
}
