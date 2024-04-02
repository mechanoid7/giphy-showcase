import {HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {GiphyApiModel} from "../models/giphy-api.model";
import {
    GiphyContentType,
    GiphyEndpoints,
} from "../models/giphy.model";
import {RestApiBaseServiceService} from "./rest-api-base-service.service";

// FIXME: should be stored in env var
const api_key = "V4efOepL9AOSQiLijBUwgg95IsGPlRG4";

@Injectable()
export class GiphyService {
    constructor(private restService: RestApiBaseServiceService) {
    }

    public getTrendingGifs(page: number, count: number = 20): Observable<GiphyApiModel> {
        return this.restService.get(
            GiphyEndpoints.trending(GiphyContentType.GIFS),
            {
                params: new HttpParams({
                    fromObject: {
                        limit: count,
                        api_key,
                        offset: page * count,
                        // rating: undefined,
                    },
                }),
            },
        );
    }
}
