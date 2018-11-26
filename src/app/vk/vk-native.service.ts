import {Injectable} from "@angular/core";
import {Observable, from} from "rxjs";
import {map, tap} from "rxjs/operators";

export enum Access {
	AUDIO = 8,
	FRIENDS = 2,
	MATCHES = 32,
	PHOTOS = 4,
	QUESTIONS = 64,
	VIDEO = 16,
	WIKI = 128,
}

@Injectable()
export class VkNativeService {
	private static client_id = 6753525;
	private static apiVersion = "5.87";
	private vk;
	private authenticated = false;

	isAuthenticated = () => this.authenticated;

	constructor() {
		this.vk = window["VK"];
		this.vk.init({apiId: VkNativeService.client_id});
	}

	private VKGetLoginStatus = (): Observable<any> => from(new Promise(resolve => {
		this.vk.Auth.getLoginStatus(response => resolve(response));
	}));

	private VKLogin = (access: Access): Observable<any> => from(new Promise(resolve => {
		this.vk.Auth.login(response => resolve(response), access);
	}));

	private VKLogout = (): Observable<any> => from(new Promise(resolve => {
		this.vk.Auth.logout(response => resolve(response));
	}));

	start(): Observable<any> {
		return this.VKGetLoginStatus().pipe(
			tap(status => this.authenticated = Boolean(status.session)),
			map(() => this.authenticated)
		);
	}

	login(access: Access): Observable<any> {
		return this.VKLogin(access).pipe(
			tap(status => this.authenticated = Boolean(status.session)),
			map(() => this.authenticated)
		);
	}

	logout(): Observable<any> {
		return this.VKLogout().pipe(
			tap(status => this.authenticated = false));
	}

	call(method: string, params?: {}): Observable<any> {
		return from(new Promise((resolve, reject) => {
			console.log(`[VkService]: Call ${method}`, params);
			this.vk.Api.call(method, {...params, v: VkNativeService.apiVersion}, response => {
				if (response.response) {
					resolve(response.response);
				} else {
					reject(response);
				}
			});
		}));
	};
}
