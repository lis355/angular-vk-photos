import {Component, EventEmitter, OnInit, Input, Output} from "@angular/core";
import {VkService} from "../vk/vk.service";

@Component({
	selector: "app-photo",
	templateUrl: "./photo.component.html",
	styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent implements OnInit {
	@Input() photo;
	@Input() preview: boolean;
	@Output() photoClick = new EventEmitter<void>();

	constructor(private vkService: VkService) {
	}

	ngOnInit() {
	}

	getPhotoSizeInfo() {
		let size = this.photo.sizes.find(item => item.type === (this.preview ? "s" : "y"));
		if (!size)
			size = this.photo.sizes[0];

		return size;
	}

	handleImageClick() {
		this.photoClick.emit();
	}

	async handleSetCaption() {
		this.vkService.call("photos.edit", {
			owner_id: (await this.vkService.getProfile()).id,
			photo_id: this.photo.id,
			caption: this.photo.text
		});
	}
}
