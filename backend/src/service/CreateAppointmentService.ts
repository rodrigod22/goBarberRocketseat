import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService{

  private appointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({provider, date}: Request): Appointment {

    const AppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(AppointmentDate);

    if(findAppointmentInSameDate){
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
        provider,
        date: AppointmentDate
    });

    return appointment;
  }
}
export default CreateAppointmentService;
