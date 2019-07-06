class ChromeApi {
    getCurrentTab() {
        return new Promise((resolve, reject) => {
            let queryInfo = {
                active: true,
                currentWindow: true
            };
            chrome.tabs.query(queryInfo, (tabs) => {
                resolve(tabs[0])
            });
        });
    }

    getCurrentTabUrl() {
        return this.getCurrentTab().then((tab) => tab.url);
    }

    setCurrentTabUrl(url) {
        return this.getCurrentTab().then(tab => chrome.tabs.update(tab.id, {url: url}))
    }

    getBookmarkTree() {
        return new Promise((resolve, reject) => chrome.bookmarks.getTree(resolve));
    }

    createBookmark(parent, index, title, url) {
        return Promise.new((resolve, reject) => {
            let bookmark = {}
            if (!(parent === null)) {
                bookmark['parentId'] = parent
            }
            if (!(index === null)) {
                bookmark['index'] = index
            }
            if (!(title === null)) {
                bookmark['title'] = title
            }
            if (!(url === null)) {
                bookmark['url'] = url
            }
            chrome.bookmarks.create(bookmark, resolve)
        })
    }


    updateBookmark(id, title, url) {
        return new Promise((resolve, reject) => {
            var changes = {}
            if (!(title === null)) {
                changes['title'] = title
            }
            if (!(url === null)) {
                changes['url'] = url
            }
            chrome.bookmarks.update(id, changes, resolve)
        })
    }
}


export {
    ChromeApi
};
