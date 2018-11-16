import {Injectable} from "@angular/core";

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
	private static client_id = 6753525;
	private static apiVersion = "5.87";
	private vk;
	private authenticated = false;

	isAuthenticated = () => this.authenticated;

	constructor() {
		this.vk = window["VK"];
		this.vk.init({apiId: VkService.client_id});
	}

	private VKGetLoginStatus = async () =>
		new Promise(resolve => {
			this.vk.Auth.getLoginStatus(response => resolve(response));
		});

	private VKLogin = async (access: Access) =>
		new Promise(resolve => {
			this.vk.Auth.login(response => resolve(response), access);
		});

	private VKLogout = async () =>
		new Promise(resolve => {
			this.vk.Auth.logout(response => resolve(response));
		});

	async start(): Promise<void> {
		const status: any = await this.VKGetLoginStatus();
		this.authenticated = Boolean(status.session);
	}

	async login(access: Access): Promise<void> {
		const status: any = await this.vk.login(access);
		this.authenticated = Boolean(status.session);
	}

	async logout(): Promise<void> {
		await this.vk.logout();
		this.authenticated = false;
	}

	call = async (method: string, params?: {}): Promise<any> =>
		new Promise((resolve, reject) => {
			console.log(`[VkService]: Call ${method}`, params);
			this.vk.Api.call(method, {...params, v: VkService.apiVersion}, response => {
				if (response.response)
					resolve(response.response);
				else
					reject(response);
			});
		});

	async getProfile(): Promise<Profile> {
		const result = await this.call("users.get", {fields: "photo_100"});
		const user = result[0];
		return {
			id: user.id,
			name: `${user.first_name} ${user.last_name}`,
			avatarUrl: user.photo_100
		};
	}
}
