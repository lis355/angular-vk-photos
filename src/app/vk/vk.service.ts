import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {flatMap, map, tap} from "rxjs/operators";
import {VkNativeService, Access} from "./vk-native.service";

export interface Profile {
	id: number,
	name: string,
	avatarUrl: string
}

@Injectable()
export class VkService {
	private profile: Profile;

	constructor(private vkNativeService: VkNativeService) {
	}

	start(): Observable<any> {
		return this.vkNativeService.start();
	}

	login(access: Access): Observable<any> {
		return this.vkNativeService.login(access);
	}

	logout(): Observable<any> {
		return this.vkNativeService.logout().pipe(
			tap(() => this.profile = null)
		);
	}

	getMyProfile(): Observable<Profile> {
		if (this.profile) {
			return of(this.profile);
		} else {
			return this.vkNativeService.call("users.get", {fields: "photo_100"}).pipe(
				map(result => result[0]),
				map(user => {
					return {
						id: user.id,
						name: `${user.first_name} ${user.last_name}`,
						avatarUrl: user.photo_100
					};
				}),
				tap(profile => this.profile = profile)
			);
		}
	}

	getPhotos() {
		return this.getMyProfile().pipe(
			flatMap(profile => this.vkNativeService.call("photos.getAll", {owner_id: profile.id}).pipe(
				map(result => result.items)
			))
		);
	}

	setPhotoCaption(photoId: number, caption: string) {
		return this.getMyProfile().pipe(
			flatMap(profile => this.vkNativeService.call("photos.edit", {
				owner_id: profile.id,
				photo_id: photoId,
				caption: caption
			}))
		);
	}
}
