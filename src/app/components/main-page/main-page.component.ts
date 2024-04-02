import {
    AsyncPipe,
    NgIf,
} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    OnInit,
} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {
    MatFormField,
    MatLabel,
    MatSuffix,
} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
    MatOption,
    MatSelect,
} from "@angular/material/select";
import {
    debounceTime,
    tap,
} from "rxjs";
import {GiphyContentType} from "../../models/giphy.model";
import {GiphyService} from "../../services/giphy.service";
import {ImageType} from "./main-page.model";
import {MainPageState} from "./main-page.state";

@Component({
    selector: "app-main-page",
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule,
        MatSelect,
        MatOption,
        AsyncPipe,
        NgIf,
    ],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        GiphyService, //todo: rm
        MainPageState,
    ],
})
export class MainPageComponent implements OnInit {
    public searchControl = new FormControl<string>("");
    public imageTypes: ImageType[] = [
        {value: GiphyContentType.GIFS, viewValue: "Gif"},
        {value: GiphyContentType.STICKERS, viewValue: "Sticker"},
    ];
    public state$ = this.pageState.select().pipe(tap(value => {
        console.log(">>> state: ", value);
    }));

    constructor(private giphyService: GiphyService, public pageState: MainPageState, private destroy$: DestroyRef) {

    }

    public ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                takeUntilDestroyed(this.destroy$),
                debounceTime(850),
            )
            .subscribe(searchValue => this.pageState.set({searchValue: searchValue || ""}));
    }

    loadImgs() {
        this.giphyService.getTrendingGifs(1).subscribe(val => {
            console.log(">>> result: ", val);
        });
    }

    public selectGiphyContentType(value: GiphyContentType) {
        this.pageState.set({giphyContentType: value});
    }
}
