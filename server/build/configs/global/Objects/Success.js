"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFailed = exports.createSuccessful = void 0;
function createSuccessful() {
    return { status: "successful" };
}
exports.createSuccessful = createSuccessful;
function createFailed() {
    return { status: "failed" };
}
exports.createFailed = createFailed;
