import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from '@angular/router';
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy{
	constructor(private authService: AuthService, private router : Router, private componentFactoryResolver: ComponentFactoryResolver) {}
	isLoginMode = true;
	isLoading = false;
	error: string = null;
	@ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

	private closeSub: Subscription

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
				this.router.navigate(['/recipes']);
				console.log("res data", resData);
			},
			(errorMessage) => {
				this.isLoading = false;

				this.error = errorMessage;
				this.showErrorAlert(errorMessage);
				console.log(errorMessage);
			}
		);
		form.reset();
	}

	onHandleError() {
		this.error = null;
	}

	ngOnDestroy(): void {
		if (this.closeSub) {
			this.closeSub.unsubscribe();
		}
	}

	private showErrorAlert(message: string) {
		const alertCmp = new AlertComponent();
		const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
		componentRef.instance.message = message;
		this.closeSub =	componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear()
		});
	}
}
