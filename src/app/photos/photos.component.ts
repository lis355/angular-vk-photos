import {Component, Input, OnInit} from "@angular/core";
import {Profile, VkService} from "../vk/vk.service";

@Component({
	selector: "app-photos",
	templateUrl: "./photos.component.html",
	styleUrls: ["./photos.component.scss"]
})
export class PhotosComponent implements OnInit {
	@Input() profile: Profile;

	photos;
	selectedPhoto;

	constructor(private vkService: VkService) {
	}

	async ngOnInit() {
		await this.getPhotos();
	}

	async getPhotos() {
		const result = await this.vkService.call("photos.getAll", {owner_id: this.profile.id});
		this.photos = result.items;
	}

	handleClick(photo) {
		this.selectedPhoto = photo;
	}
}
