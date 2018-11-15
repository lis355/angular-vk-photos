import {Component, OnInit} from "@angular/core";
import {VkService} from "../vk/vk.service";

@Component({
	selector: "app-photos",
	templateUrl: "./photos.component.html",
	styleUrls: ["./photos.component.scss"]
})
export class PhotosComponent implements OnInit {
	photos;

	constructor(private vkService: VkService) {
	}

	async ngOnInit() {
		await this.getPhotos();
	}

	async getPhotos() {
		const result = await this.vkService.call("photos.getAll", {owner_id: (await this.vkService.getProfile()).id})
		this.photos = result.items;
	}
}
