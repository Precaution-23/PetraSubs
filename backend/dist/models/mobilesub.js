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
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let mobileSubsciberSchema = new Schema({
    _id: {
        type: Number,
        alias: 'id',
        default: 0,
    },
    msisdn: {
        type: String,
        unique: true,
        required: [true, 'mobile number is required...!']
    },
    customer_id_owner: {
        type: Number,
        required: [true, 'Customer id owner is required']
    },
    customer_id_user: {
        type: Number,
        required: [true, 'Customer id user is required']
    },
    service_type: {
        type: String,
        required: [true, 'service_type is required...!']
    },
    service_start_date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
mobileSubsciberSchema.statics.doesntExist = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield this.where(options).countDocuments()) === 0;
    });
};
exports.default = mongoose_1.default.model('MobileSubsciber', mobileSubsciberSchema);
//# sourceMappingURL=mobilesub.js.map