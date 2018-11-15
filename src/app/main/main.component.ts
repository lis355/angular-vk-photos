import {Component, OnInit} from "@angular/core";
import {VkService, Profile, Access} from "../vk/vk.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
	loading = true;
	profile: Profile;
	needLogin = false;

	constructor(private vkService: VkService) {
	}

	async ngOnInit() {
		await this.vkService.start();
		await this.processProfile();
	}

	async processProfile() {
		this.loading = true;

		if (this.vkService.isAuthenticated()) {
			this.needLogin = false;
			this.profile = await this.vkService.getProfile();
		} else {
			this.needLogin = true;
		}

		this.loading = false;
	}

	async handleLogin() {
		await this.vkService.login(Access.PHOTOS);
		await this.processProfile();
	}

	async handleLogout() {
		await this.vkService.logout();
		this.profile = null;
		await this.processProfile();
	}
}
