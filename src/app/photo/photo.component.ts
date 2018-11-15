import {Component, EventEmitter, OnInit, Input, Output} from "@angular/core";

@Component({
	selector: "app-photo",
	templateUrl: "./photo.component.html",
	styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent implements OnInit {
	@Input() photo;
	@Output() click = new EventEmitter<void>();

	constructor() {
	}

	ngOnInit() {
	}

	handleClick() {

	}
}
