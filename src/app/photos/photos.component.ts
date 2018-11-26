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
		this.vkService.getPhotos()
			.subscribe(list => this.photos = list);
	}

	handleClick(photo) {
		this.selectedPhoto = photo;
	}
}
