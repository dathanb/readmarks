import Context from './Context';
import {
    getContextReadmark,
    getContextReadmarkComplete,
    getContextReadmarkError,
    getCurrentUrl,
    getCurrentUrlComplete,
    getCurrentUrlError,
} from './actions';

class ReadmarksApi {
    constructor(chromeApi, storageApi, store) {
        this.tabApi = chromeApi;
        this.storageApi = storageApi;
        this.store = store;
    }

    getContextReadmark() {
        this.store.dispatch(getContextReadmark())
        return this.getCurrentContext()
            .then(context => this.storageApi.getContextReadmark(context))
            .then(readmark => {
                this.store.dispatch(getContextReadmarkComplete(readmark));
                return readmark;
            }).catch(error => {
                this.store.dispatch(getContextReadmarkError(new Error(error)));
            });
    }

    getCurrentContext() {
        return this.tabApi.getCurrentTabUrl().then(url => Context.forUrl(url));
    }

    getCurrentUrl() {
        this.store.dispatch(getCurrentUrl());
        return this.tabApi.getCurrentTabUrl()
            .then(url => {
                this.store.dispatch(getCurrentUrlComplete(url));
                return url;
            })
            .catch(error => {
                this.store.dispatch(getCurrentUrlError(error));
                return null;
            });
    }
}

export default ReadmarksApi;