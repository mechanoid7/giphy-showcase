import {
    AsyncPipe,
    NgIf,
} from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    OnInit,
    ViewChild,
} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatChip} from "@angular/material/chips";
import {
    MatFormField,
    MatLabel,
    MatSuffix,
} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
    MatOption,
    MatSelect,
} from "@angular/material/select";
import {debounce} from "lodash";
import {
    BehaviorSubject,
    debounceTime,
} from "rxjs";
import {GiphyContentType} from "../../models/giphy.model";
import {GiphyListComponent} from "../giphy-list/giphy-list.component";
import {ImageType} from "./main-page.model";
import {MainPageState} from "./main-page.state";

@Component({
    selector: "app-main-page",
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        GiphyListComponent,
        MatChip,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatOption,
        MatProgressSpinner,
        MatSelect,
        MatSuffix,
        NgIf,
        ReactiveFormsModule,
    ],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MainPageState],
})
export class MainPageComponent implements OnInit, AfterViewInit {
    public searchControl = new FormControl<string>("");
    public imageTypes: ImageType[] = [
        {value: GiphyContentType.GIFS, viewValue: "Gif"},
        {value: GiphyContentType.STICKERS, viewValue: "Sticker"},
    ];
    public state$ = this.pageState.select();
    public width$ = new BehaviorSubject<number | undefined>(undefined);
    private imagesContainerElement!: ElementRef<HTMLElement>;

    constructor(
        public pageState: MainPageState,
        private destroy$: DestroyRef,
    ) {
    }

    @ViewChild("imagesContainer", {read: ElementRef})
    private set imagesContainer(element: ElementRef<HTMLElement>) {
        this.imagesContainerElement = element;
        this.width$.next(element.nativeElement.offsetWidth);
    };

    public ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                takeUntilDestroyed(this.destroy$),
                debounceTime(850),
            )
            .subscribe(searchValue => this.pageState.set({searchValue: searchValue || ""}));
    }

    public ngAfterViewInit(): void {
        window.addEventListener(
            "resize",
            debounce(() => this.width$.next(this.imagesContainerElement.nativeElement.offsetWidth), 300),
        );
    }

    public selectGiphyContentType(value: GiphyContentType) {
        this.pageState.set({giphyContentType: value});
    }

    public loadNext(): void {
        this.pageState.loadNext();
    }
}
