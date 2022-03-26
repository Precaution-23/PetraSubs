
import express from 'express';
import mobileSubController from './controllers/mobilesub.controller';
export default function setRoutes(app:any) {

    const router = express.Router();
    
    router.route('/mobile-sub').post(mobileSubController.create);
    router.route('/mobile-sub').get(mobileSubController.getAll);
    router.route('/mobile-sub/:id').get(mobileSubController.get);
    router.route('/mobile-sub/:id').put(mobileSubController.put);
    router.route('/mobile-sub/:id').delete(mobileSubController.delete);

app.use('/', router);
}