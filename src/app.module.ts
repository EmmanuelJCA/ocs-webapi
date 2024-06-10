import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { AuthModule } from './modules/auth/auth.module';
import { OncologyCenterModule } from './modules/oncology-center/oncology-center.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { PersonModule } from './modules/person/person.module';
import { PatientModule } from './modules/patient/patient.module';
import { DepartmentModule } from './modules/department/department.module';
import { PhysicianModule } from './modules/physician/physician.module';
import { PhysicianSupportModule } from './modules/physician-support/physician-support.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { CancerModule } from './modules/cancer/cancer.module';
import { DiagnosticModule } from './modules/diagnostic/diagnostic.module';

@Module({
  imports: [
    AuthModule,
    AppointmentModule,
    CancerModule,
    DepartmentModule,
    DiagnosticModule,
    UserModule,
    PersonModule,
    PhysicianModule,
    PhysicianSupportModule,
    PatientModule,
    OncologyCenterModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        throttlers: [configService.throttlerConfigs],
      }),
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
