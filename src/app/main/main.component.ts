import {Component, OnInit} from "@angular/core";
import {VkService} from "../vk.service";

@Component({
	selector: "app-main",
	templateUrl: "main.component.html",
	styleUrls: ["main.component.scss"]
})
export class MainComponent implements OnInit {

	constructor(private vkService: VkService) {
	}

	ngOnInit() {
		this.vkService.start();
	}
}
