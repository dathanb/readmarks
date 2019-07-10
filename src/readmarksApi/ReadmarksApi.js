import Context from './Context';

class ReadmarksApi {
    constructor(chromeApi, storageApi) {
        this.tabApi = chromeApi;
        this.storageApi = storageApi;
    }

    getReadmarkForCurrentContext() {
        return this.getCurrentContext().then(context => this.storageApi.getReadmarkForContext(context));
    }

    getCurrentContext() {
        return this.tabApi.getCurrentTabUrl().then(url => Context.forUrl(url));
    }

    getCurrentUrl() {
        return this.tabApi.getCurrentTabUrl();
    }
}

export default ReadmarksApi;