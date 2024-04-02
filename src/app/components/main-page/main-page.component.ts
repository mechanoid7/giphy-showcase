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
    ],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.less",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
    public searchControl= new FormControl<string>("");

}
