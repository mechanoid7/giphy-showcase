import {Injectable} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {
    combineLatest,
    debounceTime,
    map,
    switchMap,
    tap,
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
    loading?: boolean,
}

const initValues: Partial<State> = {
    searchValue: "",
    giphyContentType: GiphyContentType.GIFS,
    page: 0,
    loading: false,
};

@Injectable()
export class MainPageState extends RxState<State> {
    constructor(giphyService: GiphyService) {
        super();
        this.set(initValues);

        this.connect("images", combineLatest([
            this.select("searchValue"),
            this.select("giphyContentType"),
            this.select("page"),
        ]).pipe(
            tap(() => {
                console.log(">>> LOAD DATA");
            }),
            map(() => ([])), //tmp
            // switchMap(([searchValue, giphyContentType, page]) => {
            //     // todo: add search, type handling
            //     return giphyService.getTrendingGifs(page);
            // }),
            // map(transformGiphyApiToImages),
        ));

    }
}
