"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mobilesub_controller_1 = __importDefault(require("./controllers/mobilesub.controller"));
function setRoutes(app) {
    const router = express_1.default.Router();
    router.route('/mobile-sub').post(mobilesub_controller_1.default.create);
    router.route('/mobile-sub').get(mobilesub_controller_1.default.getAll);
    router.route('/mobile-sub/:id').get(mobilesub_controller_1.default.get);
    router.route('/mobile-sub/:id').put(mobilesub_controller_1.default.put);
    router.route('/mobile-sub/:id').delete(mobilesub_controller_1.default.delete);
    app.use('/', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map