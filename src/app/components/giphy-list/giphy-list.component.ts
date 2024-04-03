import {NgForOf} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    Input,
} from "@angular/core";
import {GiphyImage} from "../../models/giphy.model";
import {SplitImageListPipe} from "./split-image-list.pipe";

@Component({
    selector: "app-giphy-list",
    standalone: true,
    imports: [
        NgForOf,
        SplitImageListPipe,
    ],
    templateUrl: "./giphy-list.component.html",
    styleUrl: "./giphy-list.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiphyListComponent {
    @Input({required: true}) public width!: number;
    @Input({required: true}) public images!: GiphyImage[];
}
