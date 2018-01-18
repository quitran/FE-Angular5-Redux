import {Injectable} from "@angular/core";
import {HTTP_VERBS} from "../shared/enums/Enum";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as _ from "lodash";
import {NavigationStart, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class BaseService {

    private httpVerbs = HTTP_VERBS;
    private baseUrl: string;
    private subject = new Subject<any>();


    constructor(private http: HttpClient, private router: Router) {
        this.baseUrl = "http://localhost:5000";
        router.events.subscribe(event => {
           if (event instanceof NavigationStart) {
               this.subject.next({type: null, text: null});
           }
        });

    }


    /**
     * set Message response
     * @param response
     */
    setMessage(response: any) {
        this.subject.next({type: response.type, text: response.message});
    }

    get(url: any, options: any = {}) {
        let method = this.httpVerbs.GET,
            reqOptions = this.getRequesOption();
        url = this.getUrl(url, options);
        url = this.buildQueryString(url, options);
        return this.async(method, url, null, reqOptions);

    }

    post(url: any, options: any) {
        let method = this.httpVerbs.POST,
            reqOptions,
            body = {};

        body["data"] = options.data;

        try {
            body = JSON.stringify(body, (key, value) => {
                if (value === undefined) {
                    return null;
                }
                return value;
            });
        } catch (err) {
            body = null;
        }
        reqOptions = this.getRequesOption();
        url = this.getUrl(url, options);
        return this.async(method, url, body, reqOptions);
    }

    getUrl(url: any, options: any) {
        if (options && options.baseUrl) {
            return options.baseUrl + url;
        }
        return this.baseUrl + url;
    }

    async(method: any, url: any, body: any, reqOptions: any) {
        return new Promise((resolve, reject) => {
            this.http[_.lowerCase(method)](
                url,
                (method === HTTP_VERBS.POST) || (method === HTTP_VERBS.PUT) ? body : reqOptions,
                (method === HTTP_VERBS.POST) || (method === HTTP_VERBS.PUT) ? reqOptions : null
            ).map((res: any) => res)
                .subscribe((res: any) => {
                    let data;
                    try {
                        data = JSON.parse(res._body);
                    } catch (err) {
                        resolve(res);
                    }
                }, (err: any) => {
                    let body;

                    try {
                        body = JSON.parse(err._body);
                    } catch (error) {

                    }
                    if (body && body["type"] === "error") {
                        this.setMessage(body);
                    }
                }
                );

        });

    }

    buildQueryString(url: any, options: any) {
        if (options && options.query) {
            for (let key in options.query) {
                if (options.query[key]) {
                    url = this.updateQueryStringParameter(url, key, options.query[key]);
                }
            }
        }
    }

    updateQueryStringParameter(url: any, key: any, value: any) {
        let regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = url.indexOf("?") !== -1 ? "&" : "?";
        if (url.match(regex)) {
            return url.replace(regex, "$1" + key + "=" + value + "$2");
        } else {
            return url + separator + key + "=" + value;
        }
    }

    getRequesOption() {
        let headers = new HttpHeaders({"Conten-Type": "application/json"});
        return headers;

    }





}
