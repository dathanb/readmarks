import Context from './Context';
import {
    getCurrentReadmark,
    getCurrentReadmarkComplete
} from './actions';

class ReadmarksApi {
    constructor(chromeApi, storageApi, store) {
        this.tabApi = chromeApi;
        this.storageApi = storageApi;
        this.store = store;
    }

    getReadmarkForCurrentContext() {
        this.store.dispatch(getCurrentReadmark())
        return this.getCurrentContext()
            .then(context => this.storageApi.getReadmarkForContext(context))
            .then(readmark => {
                this.store.dispatch(getCurrentReadmarkComplete(readmark));
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