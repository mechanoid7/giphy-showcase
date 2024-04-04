import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RxState} from "@rx-angular/state";
import {
    catchError,
    combineLatest,
    debounceTime,
    map,
    of,
    switchMap,
    tap,
} from "rxjs";
import {
    GiphyContentType,
    GiphyImage,
} from "../../models/giphy.model";
import {GiphyService} from "../../services/giphy.service";
import {NotificationService} from "../../services/notification.service";
import {
    getTotalItems,
    transformGiphyApiToImages,
} from "../../utils/giphy-transformers.utils";

interface State {
    searchValue: string,
    giphyContentType: GiphyContentType,
    page: number,
    images: GiphyImage[],
    loading?: boolean,
    total?: number,
}

const initValues: Partial<State> = {
    searchValue: "",
    giphyContentType: GiphyContentType.GIFS,
    page: 0,
    loading: false,
};

@Injectable()
export class MainPageState extends RxState<State> {
    constructor(giphyService: GiphyService, notificationService: NotificationService) {
        super();
        this.set(initValues);

        this.connect("page", combineLatest([
            this.select("searchValue"),
            this.select("giphyContentType"),
        ]).pipe(map(() => 0)));

        this.connect("images", combineLatest([
            this.select("searchValue"),
            this.select("giphyContentType"),
            this.select("page"),
        ]).pipe(
            debounceTime(300),
            tap(() => this.set({loading: true})),
            switchMap(([searchValue, giphyContentType, page]) => (
                searchValue
                    ? giphyService.searchImages(page, giphyContentType, searchValue)
                    : giphyService.getTrendingImages(page, giphyContentType))
                .pipe(map(apiModel => ({
                    apiModel,
                    appendList: page !== 0,
                }))),
            ),
            tap(({apiModel}) => this.set({total: getTotalItems(apiModel)})),
            map(({apiModel, appendList}) =>
                appendList
                    ? [
                        ...this.get("images"),
                        ...transformGiphyApiToImages(apiModel),
                    ]
                    : transformGiphyApiToImages(apiModel)),
            tap(() => this.set({loading: false})),
            catchError((err: HttpErrorResponse) => {
                notificationService.error(`Can't fetch images: "${err.error?.meta?.msg || JSON.stringify(err.error)}". Please try again later`, 10000)
                this.set({loading: false});
                return of();
            })
        ));
    }

    public loadNext() {
        this.set({page: this.get("page") + 1});
    }
}
