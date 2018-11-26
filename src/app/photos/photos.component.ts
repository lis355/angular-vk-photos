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

	ngOnInit() {
		this.getPhotos();
	}

	getPhotos() {
		this.vkService.call("photos.getAll", {owner_id: this.profile.id})
			.subscribe(result => this.photos = result.items);
	}

	handleClick(photo) {
		this.selectedPhoto = photo;
	}
}
