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
exports.chatsOverviewGet = chatsOverviewGet;
exports.chatsOverviewPost = chatsOverviewPost;
exports.chatsGet = chatsGet;
exports.chatsDelete = chatsDelete;
exports.chatsDeleteMessages = chatsDeleteMessages;
exports.chatsGetPicture = chatsGetPicture;
exports.chatsGetMessages = chatsGetMessages;
exports.chatsReadMessages = chatsReadMessages;
exports.chatsGetMessage = chatsGetMessage;
exports.chatsDeleteMessage = chatsDeleteMessage;
exports.chatsEditMessage = chatsEditMessage;
exports.chatsPinMessage = chatsPinMessage;
exports.chatsUnpinMessage = chatsUnpinMessage;
exports.chatsArchive = chatsArchive;
exports.chatsUnarchive = chatsUnarchive;
exports.chatsUnread = chatsUnread;
// AUTO-GENERATED from data.ts. Do not edit.
var client_js_1 = require("../client.js");
var makePath = function (tpl, params) { return tpl.replace(/\{(\w+)\}/g, function (_, k) { return encodeURIComponent(String(params === null || params === void 0 ? void 0 : params[k])); }); };
/**
 * Obtén el resumen de chats (id, nombre, foto, último mensaje). Ordenado por timestamp del último mensaje.
 * Method: GET
 * Path: /api/{session}/chats/overview
 */
function chatsOverviewGet() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/overview', args.pathParams) || '/api/{session}/chats/overview';
            return [2 /*return*/, (0, client_js_1.getClient)().get(p, args.query)];
        });
    });
}
/**
 * Obtén el resumen de chats usando POST (permite filtros más complejos).
 * Method: POST
 * Path: /api/{session}/chats/overview
 */
function chatsOverviewPost() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/overview', args.pathParams) || '/api/{session}/chats/overview';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Lista los chats de la sesión.
 * Method: GET
 * Path: /api/{session}/chats
 */
function chatsGet() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats', args.pathParams) || '/api/{session}/chats';
            return [2 /*return*/, (0, client_js_1.getClient)().get(p, args.query)];
        });
    });
}
/**
 * Elimina un chat.
 * Method: DELETE
 * Path: /api/{session}/chats/{chatId}
 */
function chatsDelete() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}', args.pathParams) || '/api/{session}/chats/{chatId}';
            return [2 /*return*/, (0, client_js_1.getClient)().delete(p)];
        });
    });
}
/**
 * Elimina mensajes del chat (sin especificar messageId).
 * Method: DELETE
 * Path: /api/{session}/chats/{chatId}/messages
 */
function chatsDeleteMessages() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages', args.pathParams) || '/api/{session}/chats/{chatId}/messages';
            return [2 /*return*/, (0, client_js_1.getClient)().delete(p)];
        });
    });
}
/**
 * Obtiene la foto de perfil del chat. Usa refresh=true si necesitas forzar actualización (caché ~24h).
 * Method: GET
 * Path: /api/{session}/chats/{chatId}/picture
 */
function chatsGetPicture() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/picture', args.pathParams) || '/api/{session}/chats/{chatId}/picture';
            return [2 /*return*/, (0, client_js_1.getClient)().get(p, args.query)];
        });
    });
}
/**
 * Lista los mensajes del chat con filtros y paginación. Soporta descarga de media.
 * Method: GET
 * Path: /api/{session}/chats/{chatId}/messages
 */
function chatsGetMessages() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages', args.pathParams) || '/api/{session}/chats/{chatId}/messages';
            return [2 /*return*/, (0, client_js_1.getClient)().get(p, args.query)];
        });
    });
}
/**
 * Marca mensajes como leídos (últimos primero). Puedes limitar por cantidad o días).
 * Nota: El bridge usa query params (messages, days) en lugar de body.
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/messages/read
 */
function chatsReadMessages() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages/read', args.pathParams) || '/api/{session}/chats/{chatId}/messages/read';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body, { query: args.query })];
        });
    });
}
/**
 * Obtiene un mensaje específico por su ID. Puede descargar media asociada.
 * Method: GET
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}
 */
function chatsGetMessage() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}';
            return [2 /*return*/, (0, client_js_1.getClient)().get(p, args.query)];
        });
    });
}
/**
 * Elimina un mensaje específico del chat por su ID.
 * Method: DELETE
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}
 */
function chatsDeleteMessage() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}';
            return [2 /*return*/, (0, client_js_1.getClient)().delete(p)];
        });
    });
}
/**
 * Edita el contenido de un mensaje existente. Puedes incluir vista previa de enlaces.
 * Method: PUT
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}
 */
function chatsEditMessage() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}';
            return [2 /*return*/, (0, client_js_1.getClient)().put(p, args.body)];
        });
    });
}
/**
 * Pinea un mensaje dentro del chat por una duración específica.
        - 24 hours - duration=86400
        - 7 days - duration=604800
        - 30 days - duration=2592000
        
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}/pin
 */
function chatsPinMessage() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}/pin', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}/pin';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Quita el pin de un mensaje dentro del chat.
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/messages/{messageId}/unpin
 */
function chatsUnpinMessage() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/messages/{messageId}/unpin', args.pathParams) || '/api/{session}/chats/{chatId}/messages/{messageId}/unpin';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Archiva el chat (lo mueve a archivados).
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/archive
 */
function chatsArchive() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/archive', args.pathParams) || '/api/{session}/chats/{chatId}/archive';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Quita el chat de archivados.
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/unarchive
 */
function chatsUnarchive() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/unarchive', args.pathParams) || '/api/{session}/chats/{chatId}/unarchive';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Marca el chat como no leído.
 * Method: POST
 * Path: /api/{session}/chats/{chatId}/unread
 */
function chatsUnread() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/{session}/chats/{chatId}/unread', args.pathParams) || '/api/{session}/chats/{chatId}/unread';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
