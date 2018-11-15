import {Component, OnInit} from "@angular/core";
import {VkService, Profile} from "../vk.service";

@Component({
	selector: "app-photos",
	templateUrl: "./photos.component.html",
	styleUrls: ["./photos.component.scss"]
})
export class PhotosComponent implements OnInit {
	loading = true;

	photo;

	constructor(private vkService: VkService) {
	}

	async ngOnInit() {
		await this.getPhotos();

		this.loading = false;
	}

	async getPhotos() {
		const result = await this.vkService.call("photos.getAll", {owner_id: (await this.vkService.getProfile()).id});
		for (const photoData in result.items) {

		}

		this.photo = result.items[0];
	}
}

