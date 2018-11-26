import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {flatMap, tap} from "rxjs/operators";
import {fromFunction} from "../../utils/rx";
import {VkService, Profile} from "../vk/vk.service";
import {Access} from "../vk/vk-native.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
	loading;
	needLogin;
	profile: Profile;

	constructor(private vkService: VkService) {
	}

	setLoading(loading) {
		this.loading = loading;
	}

	ngOnInit() {
		this.setLoading(true);

		this.vkService.start().pipe(
			flatMap(authenticated => authenticated ? this.getProfile() : fromFunction(() => this.needLogin = true))
		).subscribe(() => this.setLoading(false));
	}

	getProfile(): Observable<any> {
		return this.vkService.getMyProfile().pipe(
			tap(profile => {
				this.profile = profile;
				this.needLogin = false;
			})
		);
	}

	handleLogin() {
		this.setLoading(true);

		this.vkService.login(Access.PHOTOS).pipe(
			flatMap(authenticated => authenticated ? this.getProfile() : fromFunction(() => this.needLogin = true))
		).subscribe(() => this.setLoading(false));
	}

	handleLogout() {
		this.setLoading(true);

		this.vkService.logout()
			.subscribe(() => {
				this.setLoading(false);
				this.profile = null;
				this.needLogin = true;
			});
	}
}
