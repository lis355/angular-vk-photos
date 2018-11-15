import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MainComponent} from "./main/main.component";
import {VkService} from "./vk/vk.service";
import { PhotosComponent } from './photos/photos.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		PhotosComponent,
		PhotoComponent
	],
	imports: [
		HttpClientModule,
		HttpClientJsonpModule,
		BrowserModule,
		AppRoutingModule,
	],
	providers: [VkService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
