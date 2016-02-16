(function () {

    function getXhr() {
        ///<summary>
        /// Get an instance of XMLHttpRequest for all browers
        ///</summary>
        if (XMLHttpRequest) {
            // Chrome, Firefox, IE7+, Opera, Safari
            // ReSharper disable InconsistentNaming
            return new XMLHttpRequest();
            // ReSharper restore InconsistentNaming
        }
        // IE6
        try {
            // The latest stable version. It has the best security, performance,
            // reliability, and W3C conformance. Ships with Vista, and available
            // with other OS's via downloads and updates.
            return new ActiveXObject('MSXML2.XMLHTTP.6.0');
        } catch (e) {
            try {
                // The fallback.
                return new ActiveXObject('MSXML2.XMLHTTP.3.0');
            } catch (e) {
                window.alert('This browser is not AJAX enabled.');
                return null;
            }
        }
    }

    function xhrBaseReq(verb, config, forceSync) {

        return (function () {
            var deferred = jQuery.Deferred();

            function handler() {
                if (this.readyState === 4) {
                    // Success codes are in the 2xx range - OData Gives A Status Of 201 For Create
                    // STUPID IE 9.0 - Uses 1223 for status 204 .... URGH
                    if ((this.status >= 200 && this.status <= 299) || this.status == 1223) {
                        // Well then - IE 9.0 Does Not Have "Response" as an object, thus we must use
                        // The raw text or xml objects ...
                        if (this.response != undefined) {
                            deferred.resolve(config.parse(this.response), config.contextId);
                        } else if (this.responseText != undefined) {
                            deferred.resolve(config.parse(this.responseText), config.contextId);
                        }
                    } else {
                        if (this.response != undefined) {
                            deferred.fail(this.response);
                        } else if (this.responseText != undefined) {
                            deferred.fail(this.responseText, config.contextId);
                        } else {
                            deferred.fail(this, config.contextId);
                        }
                    }
                }
            }

            function manualHandler(req) {
                if (req.readyState === 4) {
                    // Success codes are in the 2xx range - OData Gives A Status Of 201 For Create
                    // STUPID IE 9.0 - Uses 1223 for status 204 .... URGH
                    if ((req.status >= 200 && req.status <= 299) || req.status == 1223) {
                        // Well then - IE 9.0 Does Not Have "Response" as an object, thus we must use
                        // The raw text or xml objects ...
                        if (req.response != undefined) {
                            deferred.resolve(config.parse(req.response), config.contextId);
                        } else if (req.responseText != undefined) {
                            deferred.resolve(config.parse(req.responseText), config.contextId);
                        }
                    } else {
                        if (req.response != undefined) {
                            deferred.fail(req.response);
                        } else if (req.responseText != undefined) {
                            deferred.fail(req.responseText, config.contextId);
                        } else {
                            deferred.fail(req, config.contextId);
                        }
                    }
                }
            }

            function syncHandler(req) {
                if (req.readyState === 4) {
                    // Success codes are in the 2xx range - OData Gives A Status Of 201 For Create
                    // STUPID IE 9.0 - Uses 1223 for status 204 .... URGH
                    if ((req.status >= 200 && req.status <= 299) || req.status == 1223) {
                        // Well then - IE 9.0 Does Not Have "Response" as an object, thus we must use
                        // The raw text or xml objects ...
                        if (req.response != undefined) {
                            return config.parse(req.response);
                        } else if (req.responseText != undefined) {
                            return config.parse(req.responseText);
                        }
                    } else {
                        if (req.response != undefined) {
                            return req.response;
                        } else if (req.responseText != undefined) {
                            return req.responseText;
                        } else {
                            return req;
                        }
                    }
                }
            }

            var client = getXhr();
            client.open(verb, config.url, forceSync == null ? true : !forceSync);
            client.onreadystatechange = handler;

            if (config.headers != null) {
                for (var key in config.headers) {
                    client.setRequestHeader(key, config.headers[key]);
                }
            }

            if (config.postData) {
                client.send(config.postData);
            } else {
                client.send();
            }

            // Return the HTTP Object Instead
            if (forceSync === true) {
                return syncHandler(client);
            }

            manualHandler(client);
            return deferred.promise();
        })();
    }

    define(['jquery'], function () {
        return {
            'post': function (config, forceSync) {
                return xhrBaseReq('POST', config, forceSync);
            },
            'get': function (config, forceSync) {
                return xhrBaseReq('GET', config, forceSync);
            }
        };
    });
})();
