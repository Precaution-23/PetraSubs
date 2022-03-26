import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;

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

  mobileSubsciberSchema.statics.doesntExist = async function(options) {
    return (await this.where(options).countDocuments()) === 0;
  };


export default mongoose.model('MobileSubsciber', mobileSubsciberSchema);