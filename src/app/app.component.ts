import {HttpClient} from "@angular/common/http";
import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {MainPageComponent} from "./components/main-page/main-page.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        MainPageComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.less",
})
export class AppComponent {
    title = "giphy-showcase";
}
