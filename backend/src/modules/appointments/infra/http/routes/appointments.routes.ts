import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentController from './../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter;
