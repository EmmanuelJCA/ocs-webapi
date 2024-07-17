import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticEntity } from './entities/diagnostic.entity';
import { In, Repository } from 'typeorm';
import { AppointmentService } from '../appointment/appointment.service';
import { CancerService } from '../cancer/cancer.service';
import { CreateDiagnosticDto } from './dtos/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dtos/update-diagnostic.dto';

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectRepository(DiagnosticEntity)
    private diagnosticRepository: Repository<DiagnosticEntity>,
    @Inject(forwardRef(() => AppointmentService))
    private appointmentService: AppointmentService,
    private cancerService: CancerService,
  ) {}

  async create(
    { appointmentId, cancerStageId, cancerTypeId, ...diagnostic }: CreateDiagnosticDto
  ): Promise<DiagnosticEntity> {
    const appointmentEntity = await this.appointmentService.findOne(appointmentId);
    const cancerTypeEntity = await this.cancerService.findOneCancerType(cancerTypeId);
    const cancerStageEntity = await this.cancerService.findOneCancerStage(cancerStageId);

    const diagnosticEntity = this.diagnosticRepository.create(diagnostic);

    diagnosticEntity.appointment = appointmentEntity;
    diagnosticEntity.cancerType = cancerTypeEntity;
    diagnosticEntity.cancerStage = cancerStageEntity;

    await this.diagnosticRepository.save(diagnosticEntity);

    return diagnosticEntity;
  }

  async findOne(id: Uuid): Promise<DiagnosticEntity> {
    const diagnosticEntity = await this.diagnosticRepository.findOneBy({ id });
    if (!diagnosticEntity) {
      throw new NotFoundException('Diagnóstico no encontrado');
    }

    return diagnosticEntity;
  }

  async findAll(patientId: Uuid | undefined): Promise<DiagnosticEntity[]> {
    return this.diagnosticRepository.find({
      ...(patientId
          ? { where: { appointment: { patient: { id: patientId } } }}
          : {}
    )});
  }

  async findAllByIds(ids: Uuid[]): Promise<DiagnosticEntity[]> {
    return this.diagnosticRepository.findBy({ id: In(ids) });
  }

  async update(
    id: Uuid,
    { appointmentId, cancerTypeId, cancerStageId, ...diagnostic }: UpdateDiagnosticDto
  ): Promise<DiagnosticEntity> {
    const diagnosticEntity = await this.findOne(id);

    const updatedDiagnostic = this.diagnosticRepository.merge(diagnosticEntity, diagnostic);

    if (appointmentId) {
      const appointmentEntity = await this.appointmentService.findOne(appointmentId);
      updatedDiagnostic.appointment = appointmentEntity;
    }

    if (cancerTypeId) {
      const cancerTypeEntity = await this.cancerService.findOneCancerType(cancerTypeId);
      updatedDiagnostic.cancerType = cancerTypeEntity;
    }

    if (cancerStageId) {
      const cancerStageEntity = await this.cancerService.findOneCancerStage(cancerStageId);
      updatedDiagnostic.cancerStage = cancerStageEntity;
    }

    await this.diagnosticRepository.save(updatedDiagnostic);

    return updatedDiagnostic;
  }

  async close(id: Uuid): Promise<DiagnosticEntity> {
    const diagnosticEntity = await this.findOne(id);

    diagnosticEntity.closedAt = new Date();

    await this.diagnosticRepository.save(diagnosticEntity);

    return diagnosticEntity;
  }
}
