/**
 * There can be at most one readmark in a Context.
 *
 * The most basic context we use is an entire domain, but for domains that host multiple distinct threads we might want
 * to follow (e.g., nuklearpower.com), we want to leave open support for that case. Hence instead of relying on domain
 * directly, we introduce the Context abstraction to support alternative use cases.
 *
 * For now, this is just domain.
 */
class Context {
    static forUrl(url) {
        return new Context(Context.getContextStringForUrl(url));
    }

    // For now, it's just the domain
    static getContextStringForUrl(url) {
        let initialUrl = url;
        if (url.startsWith("http://")) {
            url = url.substr(7)
        } else if (url.startsWith("https://")) {
            url = url.substr(8)
        }

        let host = url.substr(0, url.indexOf("/"));

        console.debug("picking host=" + host + " for url " + initialUrl);
        return host
    }

    constructor(contextString) {
        this.contextString = contextString;
    }
}

export default Context;
