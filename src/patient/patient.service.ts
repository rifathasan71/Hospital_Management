import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { UpdateMedicalDto } from './dto/update-medical.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  // a) Find one patient by ID
  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  // b) Update medical info: diagnosis, prescription, treatment_plan
  async updateMedical(id: number, dto: UpdateMedicalDto): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }

  // c) Update progress notes and next appointment
  async updateProgress(id: number, dto: UpdateProgressDto): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, dto);
    return this.patientRepository.save(patient);
  }

  // d) Update discount percentage
  async updateDiscount(id: number, dto: UpdateDiscountDto): Promise<Patient> {
    const patient = await this.findOne(id);
    patient.discount_percentage = dto.discount_percentage;
    return this.patientRepository.save(patient);
  }
}
