import {
    HttpHeaders,
    HttpParams,
} from "@angular/common/http";

export interface RestApiRequestOptions {
    body?: unknown;
    headers?: HttpHeaders;
    params?: HttpParams;
    responseType?: "arraybuffer" | "blob" | "json" | "text";
}

export interface RestApiOptions {
    urlParameters?: object;
    request?: RestApiRequestOptions;
}
