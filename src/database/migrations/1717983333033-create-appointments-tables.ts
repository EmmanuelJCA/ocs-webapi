import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTables1717983333033 implements MigrationInterface {
    name = 'CreateAppointmentsTables1717983333033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment_reasons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, CONSTRAINT "UQ_31abf81244fa381582adf8dedfd" UNIQUE ("description"), CONSTRAINT "PK_e18ed23353770a07977dea3c1dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "notes" character varying NOT NULL, "start_date_time" TIMESTAMP NOT NULL, "end_date_time" TIMESTAMP, "oncology_center_id" uuid NOT NULL, "patient_id" uuid NOT NULL, "physician_id" uuid NOT NULL, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment_reasons_appointments" ("appointment_reasons_id" uuid NOT NULL, "appointments_id" uuid NOT NULL, CONSTRAINT "PK_81bb7c6691ca450ea1417ba077c" PRIMARY KEY ("appointment_reasons_id", "appointments_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_46bdd500a7596cfbb08368966f" ON "appointment_reasons_appointments" ("appointment_reasons_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d98cdcc199fcb08eaaee2b119" ON "appointment_reasons_appointments" ("appointments_id") `);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_0f9aa19909a6d3e960c8837f3f7" FOREIGN KEY ("oncology_center_id") REFERENCES "oncology_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_3330f054416745deaa2cc130700" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_67fb8641827e5d58bb64a525017" FOREIGN KEY ("physician_id") REFERENCES "physicians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_reasons_appointments" ADD CONSTRAINT "FK_46bdd500a7596cfbb08368966f0" FOREIGN KEY ("appointment_reasons_id") REFERENCES "appointment_reasons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "appointment_reasons_appointments" ADD CONSTRAINT "FK_3d98cdcc199fcb08eaaee2b1192" FOREIGN KEY ("appointments_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment_reasons_appointments" DROP CONSTRAINT "FK_3d98cdcc199fcb08eaaee2b1192"`);
        await queryRunner.query(`ALTER TABLE "appointment_reasons_appointments" DROP CONSTRAINT "FK_46bdd500a7596cfbb08368966f0"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_67fb8641827e5d58bb64a525017"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_3330f054416745deaa2cc130700"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_0f9aa19909a6d3e960c8837f3f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d98cdcc199fcb08eaaee2b119"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46bdd500a7596cfbb08368966f"`);
        await queryRunner.query(`DROP TABLE "appointment_reasons_appointments"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "appointment_reasons"`);
    }

}
