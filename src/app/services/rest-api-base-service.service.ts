import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RestApiRequestOptions} from "../models/rest-api-model";

@Injectable({
    providedIn: "root",
})
export class RestApiBaseServiceService {

    constructor(private http: HttpClient) {
    }

    public get(url: string, options: RestApiRequestOptions): Observable<any> {
        return this.http.request("get", url, options);
    }
}
