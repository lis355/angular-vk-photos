import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MainComponent} from "./main/main.component";
import {VkService} from "./vk.service";

@NgModule({
	declarations: [
		AppComponent,
		MainComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [VkService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
