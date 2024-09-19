import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { LayoutRoutingModule } from "./layout-routing.module";

import { LayoutComponent } from './layout.component';

import { ArticleComponent, FooterComponent, AsideComponent, MainComponent, HeaderComponent } from "./components";
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
		LayoutRoutingModule,
    	SharedModule,
		UserModule,
	],
	exports: [
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