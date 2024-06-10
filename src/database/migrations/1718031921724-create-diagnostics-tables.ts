import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiagnosticsTables1718031921724 implements MigrationInterface {
    name = 'CreateDiagnosticsTables1718031921724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cancer_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_8499ffdb03781b90781320647be" UNIQUE ("name"), CONSTRAINT "PK_9b966529784bcc125c03a4438a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cancer_stages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "level" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_06c62eda696e653c33d99fd0dde" UNIQUE ("name"), CONSTRAINT "PK_ed3dad94cb9599ce0bac30c9ed0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diagnostics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "closed_at" TIMESTAMP, "date" TIMESTAMP NOT NULL, "notes" character varying NOT NULL, "appointment_id" uuid NOT NULL, "cancer_type_id" uuid NOT NULL, "cancer_stage_id" uuid NOT NULL, CONSTRAINT "PK_2bb20db72fbfd9dc034f6ee7e55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diagnostics_appointments" ("diagnostic_id" uuid NOT NULL, "appointment_id" uuid NOT NULL, CONSTRAINT "PK_6118c5fa031ffbb4e010d5d64b8" PRIMARY KEY ("diagnostic_id", "appointment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_632117189d914a586869a78b27" ON "diagnostics_appointments" ("diagnostic_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ecc9aee5b0d8c97abf636fbc75" ON "diagnostics_appointments" ("appointment_id") `);
        await queryRunner.query(`ALTER TABLE "diagnostics" ADD CONSTRAINT "FK_260b1e6e1dcf10a6f177bd80af9" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnostics" ADD CONSTRAINT "FK_27c33512c80144d47b0d4e68b66" FOREIGN KEY ("cancer_type_id") REFERENCES "cancer_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnostics" ADD CONSTRAINT "FK_224a23385421172beee04de13eb" FOREIGN KEY ("cancer_stage_id") REFERENCES "cancer_stages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnostics_appointments" ADD CONSTRAINT "FK_632117189d914a586869a78b278" FOREIGN KEY ("diagnostic_id") REFERENCES "diagnostics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diagnostics_appointments" ADD CONSTRAINT "FK_ecc9aee5b0d8c97abf636fbc75a" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diagnostics_appointments" DROP CONSTRAINT "FK_ecc9aee5b0d8c97abf636fbc75a"`);
        await queryRunner.query(`ALTER TABLE "diagnostics_appointments" DROP CONSTRAINT "FK_632117189d914a586869a78b278"`);
        await queryRunner.query(`ALTER TABLE "diagnostics" DROP CONSTRAINT "FK_224a23385421172beee04de13eb"`);
        await queryRunner.query(`ALTER TABLE "diagnostics" DROP CONSTRAINT "FK_27c33512c80144d47b0d4e68b66"`);
        await queryRunner.query(`ALTER TABLE "diagnostics" DROP CONSTRAINT "FK_260b1e6e1dcf10a6f177bd80af9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ecc9aee5b0d8c97abf636fbc75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_632117189d914a586869a78b27"`);
        await queryRunner.query(`DROP TABLE "diagnostics_appointments"`);
        await queryRunner.query(`DROP TABLE "diagnostics"`);
        await queryRunner.query(`DROP TABLE "cancer_stages"`);
        await queryRunner.query(`DROP TABLE "cancer_types"`);
    }

}
