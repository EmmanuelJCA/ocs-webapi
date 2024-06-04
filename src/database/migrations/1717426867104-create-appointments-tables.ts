import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTables1717426867104 implements MigrationInterface {
    name = 'CreateAppointmentsTables1717426867104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment_reasons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, CONSTRAINT "UQ_31abf81244fa381582adf8dedfd" UNIQUE ("description"), CONSTRAINT "PK_e18ed23353770a07977dea3c1dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "notes" character varying NOT NULL, "start_date_time" TIMESTAMP NOT NULL, "end_date_time" TIMESTAMP, "appointment_reason_id" uuid NOT NULL, "oncology_center_id" uuid NOT NULL, "patient_id" uuid NOT NULL, "physician_id" uuid NOT NULL, CONSTRAINT "UQ_3d469b9856bfc4a83786950bba1" UNIQUE ("notes"), CONSTRAINT "UQ_2674de820ed83b2834c216e95e9" UNIQUE ("start_date_time"), CONSTRAINT "UQ_20fca7f43fa819a79936b549288" UNIQUE ("end_date_time"), CONSTRAINT "REL_e155752833b45f16e55e9e84b3" UNIQUE ("appointment_reason_id"), CONSTRAINT "REL_0f9aa19909a6d3e960c8837f3f" UNIQUE ("oncology_center_id"), CONSTRAINT "REL_3330f054416745deaa2cc13070" UNIQUE ("patient_id"), CONSTRAINT "REL_67fb8641827e5d58bb64a52501" UNIQUE ("physician_id"), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_e155752833b45f16e55e9e84b30" FOREIGN KEY ("appointment_reason_id") REFERENCES "appointment_reasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_0f9aa19909a6d3e960c8837f3f7" FOREIGN KEY ("oncology_center_id") REFERENCES "oncology_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_3330f054416745deaa2cc130700" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_67fb8641827e5d58bb64a525017" FOREIGN KEY ("physician_id") REFERENCES "physicians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_67fb8641827e5d58bb64a525017"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_3330f054416745deaa2cc130700"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_0f9aa19909a6d3e960c8837f3f7"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_e155752833b45f16e55e9e84b30"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "appointment_reasons"`);
    }

}
