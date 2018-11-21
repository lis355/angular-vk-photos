import {Component, OnInit} from "@angular/core";
import {VkService, Profile, Access} from "../vk/vk.service";
import {tap} from "rxjs/operators";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
	loading = 0;
	profile: Profile;
	needLogin = false;

	constructor(private vkService: VkService) {
	}

	async ngOnInit() {
		this.vkService.start()
			.subscribe(x => this.processProfile();
	}

	processProfile() {
		this.loading++;

		if (this.vkService.isAuthenticated()) {
			this.needLogin = false;
			this.vkService.getProfile()
				.subscribe(profile => this.profile = profile);
		} else {
			this.needLogin = true;
		}

		this.loading--;
	}

	async handleLogin() {
		this.loading = true;

		this.vkService.login(Access.PHOTOS)
			.subscribe(status => this.processProfile());

		this.loading = false;
	}

	async handleLogout() {
		//this.loading = true;

		await this.vkService.logout().pipe(
			tap(x => this.profile = null),
			tap(x => this.processProfile())
		);

		//this.loading = false;
	}
}
