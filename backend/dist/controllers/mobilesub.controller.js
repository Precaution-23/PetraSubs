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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobilesub_1 = __importDefault(require("../models/mobilesub"));
class MobileSubController {
    // Get all
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield mobilesub_1.default.find({});
                return res.status(200).json(docs);
            }
            catch (err) {
                const errorObj = { error: "error" };
                return res.status(400).json(errorObj);
            }
        });
    }
    // Insert
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recentId = yield mobilesub_1.default.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
                const mobsub = new mobilesub_1.default({
                    _id: recentId ? recentId._id + 1 : 1,
                    msisdn: req.body.msisdn,
                    customer_id_owner: req.body.customer_id_owner,
                    customer_id_user: req.body.customer_id_user,
                    service_type: req.body.service_type
                });
                const obj = yield mobsub.save();
                return res.json({ success: true, msg: ' Subscriber is Created successfully.' });
            }
            catch (err) {
                return res.status(400).json({ success: false, msg: err.message });
            }
        });
    }
    // Get by id
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const obj = yield mobilesub_1.default.findById({ _id: req.params.id });
                if (obj)
                    return res.status(200).json(obj);
                else {
                    return res.status(404).json({ error: 'Subscriber not found' });
                }
                ;
            }
            catch (err) {
                return res.status(404).json({ error: "err.message" });
            }
        });
    }
    // Update by id
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const costumer = yield mobilesub_1.default.findById({ _id: req.params.id }).exec();
                costumer.set(req.body);
                const result = yield costumer.save();
                return res.json({ success: true, msg: ' Subscriber is updated successfully.' });
            }
            catch (err) {
                return res.status(404).json({ success: false, msg: 'Subscriber does not exist!' });
            }
        });
    }
    // Delete by id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mobilesub_1.default.deleteOne({ _id: req.params.id }).exec();
                return res.json({ success: true, msg: ' Subscriber is deleted successfully.' });
            }
            catch (err) {
                return res.status(400).json({ success: false, msg: 'Subscriber does not exist!' });
            }
        });
    }
}
exports.default = new MobileSubController;
//# sourceMappingURL=mobilesub.controller.js.map