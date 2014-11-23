/**
 * (c) 2014 Nerve project. All rights reserved.
 * Released under GPL v2 license. Read LICENSE for more details.
 */

'use strict';

interface IServer {
    address: string;

}

interface IServerProvider {
    setAddress(string);
    get(string, successHandler, errorHandler): string;
}

class ServerProvider implements IServerProvider {
    private http: any;
    private address: string;

    constructor($http: ng.IHttpService) {
        this.http = $http;
    }

    getAddress(): string {
        return this.address;
    }

    setAddress(address: string) {
        this.address = address;
    }

    get(uri: string, successHandler, errorHandler): string {
        var url = this.address + uri;
        return this.http.get(url).success(successHandler).error(errorHandler);
    }
}
