import {
    ChangeDetectionStrategy,
    Component,
} from "@angular/core";
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
import {GiphyContentType} from "../../models/giphy.model";
import {GiphyService} from "../../services/giphy.service";
import {ImageType} from "./main-page.model";

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
    ],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GiphyService],
})
export class MainPageComponent {
    public searchControl = new FormControl<string>("");
    public imageTypes: ImageType[] = [
        {value: GiphyContentType.GIFS, viewValue: "Gif"},
        {value: GiphyContentType.STICKERS, viewValue: "Sticker"},
    ];

    constructor(private giphyService: GiphyService) {
    }

    loadImgs() {
        this.giphyService.getTrendingGifs(1).subscribe(val => {
            console.log(">>> result: ", val);
        })
    }
}
