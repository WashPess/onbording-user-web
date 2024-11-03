import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import UserModule from "../user/user.module";
import { LayoutRoutingModule } from "./layout-routing.module";

import { LayoutComponent } from './layout.component';

import { ReactiveFormsModule } from '@angular/forms';

import { ArticleComponent, AsideComponent, FooterComponent, HeaderComponent, MainComponent } from "./components";
import { HomeComponent } from "./pages";

@NgModule({
	declarations: [
		LayoutComponent,
		HeaderComponent,
		MainComponent,
		AsideComponent,
    FooterComponent,
		ArticleComponent,
		HomeComponent
	],
	imports: [
    ReactiveFormsModule,
		LayoutRoutingModule,
    SharedModule,
		UserModule,
	],
	exports: [
    ReactiveFormsModule,
		UserModule,
		SharedModule,
		HeaderComponent,
		MainComponent,
		AsideComponent,
    FooterComponent,
		ArticleComponent,
		HomeComponent
	],
})
export class LayoutModule { }
