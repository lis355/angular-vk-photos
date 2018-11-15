import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import VK from "./vk";

export interface Profile {
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

	loading = false;
	error = false;

	isAuthenticated = () => this.authenticated;

	constructor(private http: HttpClient) {
	}

	async start(): Promise<void> {
		const status = await this.vk.getLoginStatus();
		this.authenticated = Boolean(status.session);
	}

	async login(access: Access): Promise<void> {
		const status = await this.vk.login();
		this.authenticated = Boolean(status.session);
	}

	async logout(): Promise<void> {
		await this.vk.logout();
		this.authenticated = false;
	}

	async getProfile(): Promise<Profile> {
		const result = (await this.vk.call("users.get", {fields: "photo_100"}))[0];
		return {
			name: `${result.first_name} ${result.last_name}`,
			avatarUrl: result.photo_100
		};
	}
}
