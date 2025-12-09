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
exports.bulkStopCampaign = bulkStopCampaign;
exports.bulkResumeCampaign = bulkResumeCampaign;
exports.bulkAvailability = bulkAvailability;
// AUTO-GENERATED from data.ts. Do not edit.
var client_js_1 = require("../client.js");
var makePath = function (tpl, params) { return tpl.replace(/\{(\w+)\}/g, function (_, k) { return encodeURIComponent(String(params === null || params === void 0 ? void 0 : params[k])); }); };
/**
 * Detiene una campaña de envío masivo en curso.
 * Method: POST
 * Path: /api/bulk/campaigns/{id}/stop
 */
function bulkStopCampaign() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/bulk/campaigns/{id}/stop', args.pathParams) || '/api/bulk/campaigns/{id}/stop';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Reanuda una campaña de envío masivo previamente detenida.
 * Method: POST
 * Path: /api/bulk/campaigns/{id}/resume
 */
function bulkResumeCampaign() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/bulk/campaigns/{id}/resume', args.pathParams) || '/api/bulk/campaigns/{id}/resume';
            return [2 /*return*/, (0, client_js_1.getClient)().post(p, args.body)];
        });
    });
}
/**
 * Verifica la disponibilidad de capacidad para envíos masivos.
 * Retorna información sobre la capacidad actual y máxima de envíos en paralelo.
 * Method: GET
 * Path: /api/bulk/availability
 */
function bulkAvailability() {
    return __awaiter(this, arguments, void 0, function (args) {
        var p;
        if (args === void 0) { args = {}; }
        return __generator(this, function (_a) {
            p = makePath('/api/bulk/availability', args.pathParams) || '/api/bulk/availability';
            return [2 /*return*/, (0, client_js_1.getClient)().get(p, args.query)];
        });
    });
}
