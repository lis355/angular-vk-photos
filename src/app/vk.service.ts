import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

interface Responce {
	status: "connected" | "not_authorized" | "unknown";
}

@Injectable({
	providedIn: "root"
})
export class VkService {
	private aid = 6703663;

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

		return {
			params: params
		};
	}

	start() {
		this.http.get("https://login.vk.com/", VkService.makeParams({
			act: "openapi",
			oauth: 1,
			aid: this.aid,
			location: encodeURIComponent(window.location.hostname),
			new: 1
		})).subscribe((response: Responce) => {
			switch (response.status) {
				case "connected":
					this.connected = true;
					break;
			}
		});
	}
}
