import {
    Readmark,
} from '../readmark';

class BookmarksStorageApi {
    constructor(chromeApi, contextApi) {
        this.chromeApi = chromeApi;
        this.contextApi = contextApi;
    }

    getContextReadmark(context) {
        return this.getExistingBookmark(context).then(bookmark => new Readmark(bookmark.url));
    }

    getExistingBookmark(context) {
        return this.getReadmarkFolder().then(folder => {
                for (let i = 0; i < folder.children.length; i++) {
                    let bookmark = folder.children[i];
                    if (this.contextApi.forUrl(bookmark.url).matches(context)) {
                        return bookmark;
                    }
                }
                return Promise.reject("Couldn't find an existing bookmark");
            }, () => {
                this.makeReadmarksFolder();
                return Promise.reject("Couldn't find existing ReadMark folder")
            }
        )
    }

    getReadmarkFolder() {
        return this.getOtherBookmarks().then(tree => {
                for (var i = 0; i < tree.children.length; i++) {
                    if (tree.children[i].title === "ReadMarks") {
                        return tree.children[i]
                    }
                }
                return Promise.reject("Couldn't find ReadMarks folder")
            }
        )
    }

    getOtherBookmarks() {
        return this.chromeApi.getBookmarkTree()
            .then(tree => {
                let root = tree[0];
                for (let i = 0; i < root.children.length; i++) {
                    if (root.children[i].title === "Other Bookmarks") {
                        return root.children[i];
                    }
                }
                return Promise.reject("Couldn't find 'Other Bookmarks'");
            }
        )
    }

    saveReadmark(context, url) {
        return this.getExistingBookmark(context)
            .then(bookmark => this.updateBookmark(bookmark, url))
            .catch(error => {
                console.log(`Caught error: ${error}`);
                this.createBookmark(url);
            });
    }

    updateBookmark(bookmark, url) {
        return this.chromeApi.getCurrentTab().then(tab => {
            return this.chromeApi.updateBookmark(bookmark.id, tab.title, url)
        })
    }

    createBookmark(url) {
        return this.getReadmarkFolder()
            .then(folder => {
                return this.chromeApi.getCurrentTab().then(tab => {
                    return this.chromeApi.createBookmark(folder.id, null, tab.title, url);
            });
        });
    }

    makeReadmarksFolder() {
        // TODO: resolve this inefficiency
        // Calling getOtherBookmarks here and in getReadmarkFolder is potentially inefficient
        // we might need to keep track of the result the first time around
        return this.getOtherBookmarks().then(
            tree => {
                return this.chromeApi.createBookmark(tree.id,
                    null,
                    "ReadMarks",
                    null
                )
            }
        );
    }
}

export default BookmarksStorageApi;
