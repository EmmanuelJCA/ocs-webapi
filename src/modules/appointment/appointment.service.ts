import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { PatientService } from '../patient/patient.service';
import { PhysicianService } from '../physician/physician.service';
import { OncologyCenterService } from '../oncology-center/oncology-center.service';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { AppointmentReasonEntity } from './entities/appointment-reason.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(AppointmentReasonEntity)
    private appointmentReasonRepository: Repository<AppointmentReasonEntity>,
    private patientService: PatientService,
    private physicianService: PhysicianService,
    private oncologyCenterService: OncologyCenterService,
  ) {}

  async create(
    { physicianId, reasonId, oncologyCenterId, patientId, ...appointment }: CreateAppointmentDto
  ): Promise<AppointmentEntity> {
    const physicianEntity = await this.physicianService.findOne(physicianId);

    if(!physicianEntity.user.oncologyCenters.find(oc => oc.id === oncologyCenterId)) {
      throw new BadRequestException('El médico no pertenece al centro oncológico seleccionado');
    }

    const patientEntity = await this.patientService.findOne(patientId);

    if(physicianEntity.user.person.id === patientEntity.person.id) {
      throw new BadRequestException('El médico no puede tener una cita consigo mismo');
    }

    const oncologyCenterEntity = await this.oncologyCenterService.getOncologyCenter(oncologyCenterId);
    const appointmentReasonEntity = await this.findOneReason(reasonId);


    const appointmentEntity = this.appointmentRepository.create(appointment);

    appointmentEntity.patient = patientEntity;
    appointmentEntity.physician = physicianEntity;
    appointmentEntity.reason = appointmentReasonEntity;
    appointmentEntity.oncologyCenter = oncologyCenterEntity;

    await this.appointmentRepository.save(appointmentEntity);

    return appointmentEntity;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: Uuid): Promise<AppointmentEntity> {
    const appointmentEntity = await this.appointmentRepository.findOneBy({ id });
    if (!appointmentEntity) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return appointmentEntity;
  }

  async findReasons(): Promise<AppointmentReasonEntity[]> {
    return this.appointmentReasonRepository.find();
  }

  async findOneReason(id: Uuid): Promise<AppointmentReasonEntity> {
    const reasonEntity = await this.appointmentReasonRepository.findOneBy({ id });
    if (!reasonEntity) {
      throw new NotFoundException('Motivo de la cita no encontrado');
    }
    return reasonEntity;
  }

  @Transactional()
  async update(
    id: Uuid,
    { physicianId, reasonId, oncologyCenterId, patientId, ...appointmentUpdated }: UpdateAppointmentDto
  ): Promise<AppointmentEntity> {
    const appointmentEntity = await this.findOne(id);

    const appointment = this.appointmentRepository.merge(appointmentEntity, appointmentUpdated);

    if (oncologyCenterId) {
      const oncologyCenterEntity = await this.oncologyCenterService.getOncologyCenter(oncologyCenterId);
      appointment.oncologyCenter = oncologyCenterEntity;
    }

    if (physicianId) {
      const physicianEntity = await this.physicianService.findOne(physicianId);
      appointment.physician = physicianEntity;
    }

    if(!appointment.physician.user.oncologyCenters.find(oc => oc.id === appointment.oncologyCenter.id)) {
      throw new BadRequestException('El médico no pertenece al centro oncológico seleccionado');
    }

    if (patientId) {
      const patientEntity = await this.patientService.findOne(patientId);
      appointment.patient = patientEntity;
    }

    if(appointment.physician.user.person.id === appointment.patient.person.id) {
      throw new BadRequestException('El médico no puede tener una cita consigo mismo');
    }

    if (reasonId) {
      const reasonEntity = await this.findOneReason(reasonId);
      appointment.reason = reasonEntity;
    }

    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
