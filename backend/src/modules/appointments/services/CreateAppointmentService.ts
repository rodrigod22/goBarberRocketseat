import { startOfHour } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from './../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) {
  }

  public async execute({ provider_id, date }: Request): Promise<Appointment> {

    const AppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(AppointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: AppointmentDate
    });

    return appointment;
  }
}
export default CreateAppointmentService;
