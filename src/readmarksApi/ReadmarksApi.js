import Context from './types/Context';

class ReadmarksApi {
    constructor(chromeApi, storageApi, store) {
        this.chromeApi = chromeApi;
        this.storageApi = storageApi;
        this.store = store;
    }

    getCurrentContextReadmark() {
        return this.getCurrentContext()
            .then(context => this.storageApi.getContextReadmark(context));
    }

    getCurrentContext() {
        return this.chromeApi.getCurrentTabUrl().then(url => Context.forUrl(url));
    }

    getCurrentUrl() {
        return this.chromeApi.getCurrentTabUrl()
            .catch(() => null );
    }

    navigateToCurrentContextReadmark() {
        return this.getCurrentContext()
            .then(context => this.storageApi.getContextReadmark(context))
            .then(readmark => this.chromeApi.setCurrentTabUrl(readmark.url));
    }

    saveCurrentContextReadmark() {
        this.getCurrentUrl()
            .then(url => this.storageApi.saveReadmark(url));
    }
}

export default ReadmarksApi;