import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {ListPageComponent} from "./components/list-page/list-page.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.less",
})
export class AppComponent {
    title = "giphy-showcase";
}
