class ReadmarksApi {
    constructor(chromeApi) {
        this.tabApi = chromeApi;
    }

    /**
     * Get the current readmark context.
     * @returns the current context
     */
    getCurrentContext() {
        return this.tabApi.getCurrentTabUrl()
    }
}