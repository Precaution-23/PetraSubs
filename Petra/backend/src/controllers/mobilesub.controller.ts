import MobileSubsciber from "../models/mobilesub";
import { Request, Response } from "express";
interface ErrorObject {
    error: any;
}
class MobileSubController {

    // Get all
    async getAll(req:Request, res:Response) {
        try {
            const docs = await MobileSubsciber.find({});
            return res.status(200).json(docs);
        }
        catch (err) {
            const errorObj: ErrorObject = { error: "error" };
            return res.status(400).json(errorObj);
        }
    }
    // Insert
    async create(req:Request, res:Response) {

        try {
            const recentId = await MobileSubsciber.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
            const mobsub = new MobileSubsciber({
                _id: recentId ? recentId._id + 1 : 1,
                msisdn: req.body.msisdn,
                customer_id_owner: req.body.customer_id_owner,
                customer_id_user: req.body.customer_id_user,
                service_type: req.body.service_type
            })
            
            const obj = await mobsub.save();
            return res.json({ success: true, msg: ' Subscriber is Created successfully.' });
        } catch (err) {
            return res.status(400).json({success: false, msg: err.message});
        }
    }
    // Get by id
    async get(req:Request, res:Response) {
        try {
            const obj = await MobileSubsciber.findById({ _id: req.params.id });
            if (obj)
                return res.status(200).json(obj);
            else { return res.status(404).json({ error: 'Subscriber not found' }) };
        } catch (err) {
            return res.status(404).json({ error: "err.message" });
        }
    }
    // Update by id
    async put(req:Request, res:Response) {
        try {
            const costumer = await MobileSubsciber.findById({ _id: req.params.id }).exec();
            costumer.set(req.body);
            const result = await costumer.save();
            return res.json({ success: true, msg: ' Subscriber is updated successfully.' });
        }
        catch (err) {
            return res.status(404).json({ success: false, msg: 'Subscriber does not exist!' });
        }
    }
    // Delete by id
    async delete(req:Request, res:Response) {
        try {
            await MobileSubsciber.deleteOne({ _id: req.params.id }).exec();
            return res.json({ success: true, msg: ' Subscriber is deleted successfully.' });
        }
        catch (err) {
            return res.status(400).json({ success: false, msg: 'Subscriber does not exist!' });
        }
    }
}

export default new MobileSubController; 