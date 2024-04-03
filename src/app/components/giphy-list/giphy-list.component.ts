import {
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
} from "@angular/cdk/scrolling";
import {
    NgForOf,
    NgIf,
    NgOptimizedImage,
    NgTemplateOutlet,
} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import {MatLabel} from "@angular/material/form-field";
import {throttle} from "lodash";
import {GiphyImage} from "../../models/giphy.model";
import {NotificationService} from "../../services/notification.service";
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
        MatLabel,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        NgTemplateOutlet,
        SplitImageListPipe,
    ],
    templateUrl: "./giphy-list.component.html",
    styleUrl: "./giphy-list.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiphyListComponent {
    @Input({required: true}) public width!: number;
    @Input({required: true}) public images!: GiphyImage[];
    @Output() public loadNext = new EventEmitter<void>();
    public rowHeight = ROW_HEIGHT; // in px
    public viewportScrolled = throttle((event: Event) => {
        const target = event.target as HTMLElement;
        const diff = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight);

        diff < LOAD_OFFSET && this.loadNext.emit();
    }, 1500);
    @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

    constructor(private notificationService: NotificationService) {
    }

    public loadingImageError(title: string) {
        this.notificationService.error(`Can't load "${title}" image`);
    }
}
