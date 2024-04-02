import {HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {
    GiphyContentType,
    GiphyEndpoints,
} from "../models/giphy.model";
import {RestApiBaseServiceService} from "./rest-api-base-service.service";

@Injectable({
    providedIn: "root",
})
export class GiphyService {
    constructor(private restService: RestApiBaseServiceService) {
    }

    public getTrendingGifs(page: number, count: number): Observable<any> {
        return this.restService.get(
            GiphyEndpoints.trending(GiphyContentType.GIFS),
            {
                params: new HttpParams({
                    fromObject: {
                        limit: count,
                        api_key: "",
                        offset: "",
                        // rating: undefined,
                    },
                }),
            },
        );
    }
}
