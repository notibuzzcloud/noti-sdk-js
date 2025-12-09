"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotiSenderClient = void 0;
exports.configureClient = configureClient;
exports.getClient = getClient;
var request_js_1 = require("../utils/request.js");
var NotiSenderClient = /** @class */ (function () {
    function NotiSenderClient(baseUrl, apiKey) {
        if (!baseUrl)
            throw new Error('Base URL is required');
        if (!apiKey)
            throw new Error('API Key is required');
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }
    NotiSenderClient.prototype.get = function (path, params, options) {
        var query = __assign(__assign({}, params), ((options === null || options === void 0 ? void 0 : options.query) || {}));
        if (options === null || options === void 0 ? void 0 : options.async)
            query.async = 'true';
        var headers = (options === null || options === void 0 ? void 0 : options.async) ? __assign({ 'X-Async': 'true' }, (options.headers || {})) : options === null || options === void 0 ? void 0 : options.headers;
        return (0, request_js_1.request)({ method: 'GET', baseUrl: this.baseUrl, path: path, apiKey: this.apiKey, query: query, headers: headers });
    };
    NotiSenderClient.prototype.post = function (path, body, options) {
        var query = (options === null || options === void 0 ? void 0 : options.query) || {};
        if (options === null || options === void 0 ? void 0 : options.async)
            query.async = 'true';
        var headers = (options === null || options === void 0 ? void 0 : options.async) ? __assign({ 'X-Async': 'true' }, (options.headers || {})) : options === null || options === void 0 ? void 0 : options.headers;
        return (0, request_js_1.request)({ method: 'POST', baseUrl: this.baseUrl, path: path, apiKey: this.apiKey, body: body, query: query, headers: headers });
    };
    NotiSenderClient.prototype.put = function (path, body, options) {
        var query = (options === null || options === void 0 ? void 0 : options.query) || {};
        if (options === null || options === void 0 ? void 0 : options.async)
            query.async = 'true';
        var headers = (options === null || options === void 0 ? void 0 : options.async) ? __assign({ 'X-Async': 'true' }, (options.headers || {})) : options === null || options === void 0 ? void 0 : options.headers;
        return (0, request_js_1.request)({ method: 'PUT', baseUrl: this.baseUrl, path: path, apiKey: this.apiKey, body: body, query: query, headers: headers });
    };
    NotiSenderClient.prototype.delete = function (path, options) {
        var query = (options === null || options === void 0 ? void 0 : options.query) || {};
        if (options === null || options === void 0 ? void 0 : options.async)
            query.async = 'true';
        var headers = (options === null || options === void 0 ? void 0 : options.async) ? __assign({ 'X-Async': 'true' }, (options.headers || {})) : options === null || options === void 0 ? void 0 : options.headers;
        return (0, request_js_1.request)({ method: 'DELETE', baseUrl: this.baseUrl, path: path, apiKey: this.apiKey, query: query, headers: headers });
    };
    return NotiSenderClient;
}());
exports.NotiSenderClient = NotiSenderClient;
var _client;
function configureClient(configOrUrl, notiApiKey) {
    if (typeof configOrUrl === 'string') {
        // Sintaxis tradicional: configureClient(url, key)
        if (!notiApiKey)
            throw new Error('API Key is required when using string syntax');
        _client = new NotiSenderClient(configOrUrl, notiApiKey);
    }
    else {
        // Sintaxis de objeto: configureClient({ notiUrl, notiApiKey })
        _client = new NotiSenderClient(configOrUrl.notiUrl, configOrUrl.notiApiKey);
    }
}
function getClient() {
    var _a, _b;
    if (_client)
        return _client;
    var envUrl = (typeof process !== 'undefined') ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.NOTI_URL : undefined;
    var envKey = (typeof process !== 'undefined') ? (_b = process.env) === null || _b === void 0 ? void 0 : _b.NOTI_KEY : undefined;
    if (envUrl && envKey) {
        _client = new NotiSenderClient(envUrl, envKey);
        return _client;
    }
    throw new Error('NotiSenderClient no configurado. Llame a configureClient({ notiUrl, notiApiKey }) o configureClient(url, key) o defina NOTI_URL/NOTI_KEY.');
}
