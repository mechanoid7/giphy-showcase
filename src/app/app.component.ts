import {Component} from "@angular/core";
import {MainPageComponent} from "./components/main-page/main-page.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        MainPageComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.less",
})
export class AppComponent {
}
