import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import VK from "./vk";

export interface Profile {
	id: number,
	name: string,
	avatarUrl: string
}

export enum Access {
	AUDIO = 8,
	FRIENDS = 2,
	MATCHES = 32,
	PHOTOS = 4,
	QUESTIONS = 64,
	VIDEO = 16,
	WIKI = 128,
}

@Injectable({
	providedIn: "root"
})
export class VkService {
	private client_id = 6752555;
	private vk = new VK(this.client_id);
	private authenticated = false;
	private profile: Profile;

	loading = false;
	error = false;

	isAuthenticated = () => this.authenticated;

	constructor(private http: HttpClient) {
	}

	// DEBUG
	async sleep(ms: number): Promise<void> {
		return new Promise<void>(resolve => {
			setTimeout(() => resolve(), ms);
		})
	}

	async start(): Promise<void> {
		const status = await this.vk.getLoginStatus();
		this.authenticated = Boolean(status.session);
	}

	async login(access: Access): Promise<void> {
		const status = await this.vk.login(access);
		this.authenticated = Boolean(status.session);
	}

	async logout(): Promise<void> {
		await this.vk.logout();
		this.authenticated = false;
	}

	async getProfile(): Promise<Profile> {
		if (this.authenticated
			&& this.profile) {
			return this.profile;
		}

		const result = await this.vk.call("users.get", {fields: "photo_100"});
		const user = result[0];
		this.profile = {
			id: user.id,
			name: `${user.first_name} ${user.last_name}`,
			avatarUrl: user.photo_100
		};

		return this.profile;
	}

	async call(method: string, params?: {}): Promise<any> {
		return await this.vk.call(method, params);
	}
}
