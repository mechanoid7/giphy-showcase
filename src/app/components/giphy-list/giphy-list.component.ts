import {
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
} from "@angular/cdk/scrolling";
import {
    NgForOf,
    NgOptimizedImage,
} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    Input,
} from "@angular/core";
import {MatLabel} from "@angular/material/form-field";
import {GiphyImage} from "../../models/giphy.model";
import {SplitImageListPipe} from "./split-image-list.pipe";

const ROW_HEIGHT = 200; //in px
const LOAD_OFFSET = ROW_HEIGHT * 1.5; //in px

@Component({
    selector: "app-giphy-list",
    standalone: true,
    imports: [
        CdkFixedSizeVirtualScroll,
        CdkVirtualForOf,
        CdkVirtualScrollViewport,
        SplitImageListPipe,
        NgForOf,
        MatLabel,
        NgOptimizedImage,
    ],
    templateUrl: "./giphy-list.component.html",
    styleUrl: "./giphy-list.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiphyListComponent {
    @Input({required: true}) public width!: number;
    @Input({required: true}) public images!: GiphyImage[];

    public rowHeight = ROW_HEIGHT; // in px

    public viewportScrolled(event: Event) {
        const target = event.target as HTMLElement;

        const diff = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight);
        console.log(">>> LOAD: ", diff < LOAD_OFFSET);
    }
}
