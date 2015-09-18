angular.module("readmarksModule")
    .service("urlService",
    [
        function() {
            this.getHost = getHost;

            function getHost(initialUrl) {
                var url = initialUrl
                if (url.startsWith("http://")) {
                    url = url.substr(7)
                } else if (url.startsWith("https://")) {
                    url = url.substr(8)
                }

                var host = url.substr(0, url.indexOf("/"))

                console.debug("picking host=" + host + " for url " + initialUrl)
                return host
            }
        }
    ]
)
