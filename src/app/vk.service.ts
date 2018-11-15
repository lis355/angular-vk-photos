import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";

interface Responce {
	status: "connected" | "not_authorized" | "unknown";
}

@Injectable({
	providedIn: "root"
})
export class VkService {
	private client_id = 6703663;

	loading = true;
	connected = false;
	error = false;

	constructor(private http: HttpClient) {
	}

	static makeParams(obj: object) {
		const params = {};
		for (const property in obj) {
			if (obj.hasOwnProperty(property)) {
				params[property] = String(obj[property]);
			}
		}

		return params;
	}

	request = async (method: string, url: string, options: {}) =>
		new Promise((resolve, reject) => {
			this.http.request(method, url, options).subscribe((response: Responce) => {
				console.log(response);
				resolve(response);
			});
		});

	async start() {
		// const checkAuthResponse: any = await this.request("GET", "https://login.vk.com/", {
		// 	params: VkService.makeParams({
		// 		act: "openapi",
		// 		oauth: 1,
		// 		aid: this.client_id,
		// 		location: encodeURIComponent(window.location.hostname),
		// 		new: 1
		// 	})
		// });

		const headerDict = {
			// "Content-Type": "application/json",
			// "Accept": "application/json",
			"Access-Control-Allow-Origin": "*"
		};

		if (/*!checkAuthResponse.status*/true) {
			const loginResponse: any = await this.request("GET", "https://oauth.vk.com/authorize", {
				params: VkService.makeParams({
					client_id: this.client_id,
					redirect_uri: window.location.origin,
					display: "page",
					scope: 4,
					response_type: "token",
					v: "5.87"
				}),
				headers: new Headers(headerDict)
			});
		}
	}
}
