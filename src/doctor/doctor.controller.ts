import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { Doctor } from './doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('register')
  async register(@Body() dto: RegisterDoctorDto): Promise<Doctor> {
    return this.doctorService.register(dto);
  }
}
