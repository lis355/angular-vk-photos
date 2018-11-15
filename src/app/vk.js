export default class VK {
	constructor(client_id) {
		this.apiVersion = "5.87";
		this.vk = window.VK;
		this.vk.init({apiId: client_id});
	}

	getAccessValues() {
		return this.vk.acess;
	}

	async getLoginStatus() {
		return new Promise(resolve => {
			this.vk.Auth.getLoginStatus(response => resolve(response));
		});
	}

	async login(access) {
		return new Promise(resolve => {
			this.vk.Auth.login(response => resolve(response), access);
		});
	}

	async logout() {
		return new Promise(resolve => {
			this.vk.Auth.logout(response => resolve(response));
		});
	}

	async call(method, params) {
		return new Promise((resolve, reject) => {
			this.vk.Api.call(method, {...params, v: this.apiVersion}, response => {
				if (response.response)
					resolve(response.response);
				else
					reject(response);
			});
		});
	}
}
