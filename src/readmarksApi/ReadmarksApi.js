import Context from './Context';
import {
    getContextReadmark,
    getContextReadmarkComplete
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
            });
    }

    getCurrentContext() {
        return this.tabApi.getCurrentTabUrl().then(url => Context.forUrl(url));
    }

    getCurrentUrl() {
        return this.tabApi.getCurrentTabUrl();
    }
}

export default ReadmarksApi;