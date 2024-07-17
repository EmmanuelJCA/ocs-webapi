import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { PatientService } from '../patient/patient.service';
import { PhysicianService } from '../physician/physician.service';
import { OncologyCenterService } from '../oncology-center/oncology-center.service';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { AppointmentReasonEntity } from './entities/appointment-reason.entity';
import { DiagnosticService } from '../diagnostic/diagnostic.service';

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
    @Inject(forwardRef(() => DiagnosticService))
    private diagnosticService: DiagnosticService
  ) {}

  async create(
    { physicianId, reasonsIds, oncologyCenterId, patientId, ...appointment }: CreateAppointmentDto
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
    const appointmentReasonEntity = await this.findReasonsByIds(reasonsIds);


    const appointmentEntity = this.appointmentRepository.create(appointment);

    appointmentEntity.notes = appointment.notes || '';
    appointmentEntity.patient = patientEntity;
    appointmentEntity.physician = physicianEntity;
    appointmentEntity.reasons = appointmentReasonEntity;
    appointmentEntity.oncologyCenter = oncologyCenterEntity;

    await this.appointmentRepository.save(appointmentEntity);

    return appointmentEntity;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return this.appointmentRepository.find({relations: ['reasons']});
  }

  async findOne(id: Uuid): Promise<AppointmentEntity> {
    const appointmentEntity = await this.appointmentRepository.findOne({relations: ['reasons', 'physician.user.oncologyCenters'], where: { id }});
    if (!appointmentEntity) {
      throw new NotFoundException('Cita médica no encontrada');
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

  async findReasonsByIds(ids: Uuid[]): Promise<AppointmentReasonEntity[]> {
    const reasons = await this.appointmentReasonRepository.findBy({ id: In(ids) });

    if (reasons.length !== ids.length) {
      throw new NotFoundException('Motivos de la cita no encontrados');
    }

    return reasons;
  }

  @Transactional()
  async update(
    id: Uuid,
    { physicianId, reasonsIds, oncologyCenterId, patientId, monitoredDiagnosticsIds, ...appointmentUpdated }: UpdateAppointmentDto
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

    if(monitoredDiagnosticsIds) {
      const monitoredDiagnostics = await this.diagnosticService.findAllByIds(monitoredDiagnosticsIds);
      appointment.monitoredDiagnostics = monitoredDiagnostics;
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

    if (reasonsIds) {
      const reasonEntity = await this.findReasonsByIds(reasonsIds);
      appointment.reasons = reasonEntity;
    }

    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
