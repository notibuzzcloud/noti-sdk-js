"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
exports.reaction = reaction;
exports.startTyping = startTyping;
exports.stopTyping = stopTyping;
var client_js_1 = require("../client.js");
var makePath = function (tpl, params) { return tpl.replace(/\{(\w+)\}/g, function (_, k) { return encodeURIComponent(String(params === null || params === void 0 ? void 0 : params[k])); }); };
/**
 * Envía mensajes en lote o individuales usando el endpoint genérico /api/sendMessage.
 * Este es el único endpoint para enviar mensajes en el bridge.
 *
 * Soporta dos modos:
 * 1. Modo masivo: { messages: [{ type, payload }], intervalMs }
 * 2. Modo individual: { type, payload }
 *
 * Tipos soportados según TYPE_PATH_MAP:
 * - 'text' → /api/sendText
 * - 'image' → /api/sendImage
 * - 'file' → /api/sendFile
 * - 'voice' → /api/sendVoice
 * - 'video' → /api/sendVideo
 * - 'link-custom-preview' → /api/send/link-custom-preview
 * - 'seen' → /api/sendSeen
 * - 'poll' → /api/sendPoll
 * - 'location' → /api/sendLocation
 * - 'contact-vcard' → /api/sendContactVcard
 * - 'forward' → /api/forwardMessage
 *
 * Nota: 'typing-start' y 'typing-stop' tienen endpoints directos (/api/startTyping y /api/stopTyping)
 *
 * Method: POST
 * Path: /api/sendMessage
 */
function sendMessage() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p, options;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/sendMessage', args.pathParams) || '/api/sendMessage';
            options = {
                query: args.query,
                async: args.async
            };
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body, options)];
        });
    });
}
/**
 * Agrega o elimina una reacción en un mensaje.
 * Este endpoint NO pasa por sendMessage, es directo.
 * Method: PUT
 * Path: /api/reaction
 */
function reaction() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/reaction', args.pathParams) || '/api/reaction';
            return [2 /*return*/, (0, client_js_1.getClient)().put(p, args.body)];
        });
    });
}
/**
 * Inicia el estado de escritura en un chat.
 * Este endpoint NO pasa por sendMessage, es directo.
 * Method: POST
 * Path: /api/startTyping
 */
function startTyping() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p, options;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/startTyping', args.pathParams) || '/api/startTyping';
            options = {
                query: args.query,
                async: args.async
            };
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body, options)];
        });
    });
}
/**
 * Detiene el estado de escritura en un chat.
 * Este endpoint NO pasa por sendMessage, es directo.
 * Method: POST
 * Path: /api/stopTyping
 */
function stopTyping() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p, options;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/stopTyping', args.pathParams) || '/api/stopTyping';
            options = {
                query: args.query,
                async: args.async
            };
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body, options)];
        });
    });
}
