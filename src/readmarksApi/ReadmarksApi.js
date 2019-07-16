import Context from './types/Context';

class ReadmarksApi {
    constructor(chromeApi, storageApi) {
        this.chromeApi = chromeApi;
        this.storageApi = storageApi;
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
        return this.getCurrentContextReadmark()
            // .then(context => this.storageApi.getContextReadmark(context))
            .then(readmark => this.chromeApi.setCurrentTabUrl(readmark.url));
    }

    saveCurrentContextReadmark() {
        this.getCurrentUrl()
            .then(url => {
                const context = Context.forUrl(url);
                return this.storageApi.saveReadmark(context, url);
            });
    }
}

export default ReadmarksApi;