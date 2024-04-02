import {Injectable} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {
    combineLatest,
    debounceTime,
    map,
    switchMap,
} from "rxjs";
import {
    GiphyContentType,
    GiphyImage,
} from "../../models/giphy.model";
import {GiphyService} from "../../services/giphy.service";
import {transformGiphyApiToImages} from "../../utils/giphy-transformers.utils";

interface State {
    searchValue: string,
    giphyContentType: GiphyContentType,
    page: number,
    images: GiphyImage[],
}

const initValues: Partial<State> = {
    searchValue: "",
    giphyContentType: GiphyContentType.GIFS,
    page: 0,
};

@Injectable()
export class MainPageState extends RxState<State> {
    constructor(giphyService: GiphyService) {
        super();

        this.connect("images", combineLatest([
                this.select("searchValue").pipe(debounceTime(1000)),
                this.select("giphyContentType"),
                this.select("page"),
            ]).pipe(
                switchMap(([searchValue, giphyContentType, page]) => {
                    // todo: add search, type handling
                    return giphyService.getTrendingGifs(page);
                }),
                map(transformGiphyApiToImages),
            ));

        this.set(initValues);
    }

}
