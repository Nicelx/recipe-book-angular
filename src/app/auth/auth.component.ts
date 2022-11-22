import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private store: Store<fromApp.AppState>
	) {}
	isLoginMode = true;
	isLoading = false;
	error: string = null;
	@ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

	private closeSub: Subscription;
	private storeSub: Subscription;

	ngOnInit() {
		this.storeSub = this.store.select("auth").subscribe((authState) => {
			this.isLoading = authState.loading;
			this.error = authState.authError;
			if (this.error) {
				this.showErrorAlert(this.error);
			}
		});
	}

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
			// authObs = this.authService.login(email, password);
			this.store.dispatch(
				new AuthActions.LoginStart({
					email,
					password,
				})
			);
		} else {
			this.store.dispatch(
				new AuthActions.SignupStart({
					email,
					password,
				})
			);
		}

		form.reset();
	}

	onHandleError() {
		this.store.dispatch(new AuthActions.ClearError());
	}

	ngOnDestroy(): void {
		if (this.closeSub) {
			this.closeSub.unsubscribe();
		}
		if (this.storeSub) {
			this.storeSub.unsubscribe;
		}
	}

	private showErrorAlert(message: string) {
		const alertCmp = new AlertComponent();
		const alertCmpFactory =
			this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
		componentRef.instance.message = message;
		this.closeSub = componentRef.instance.close.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}
}
