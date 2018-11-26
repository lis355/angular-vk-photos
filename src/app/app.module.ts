import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {MainComponent} from "./main/main.component";
import {VkNativeService} from "./vk/vk-native.service";
import {PhotosComponent} from "./photos/photos.component";
import {PhotoComponent} from "./photo/photo.component";
import {VkService} from "./vk/vk.service";

@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		PhotosComponent,
		PhotoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [VkNativeService, VkService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
