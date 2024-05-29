import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartmentSpecializationTable1716992259924 implements MigrationInterface {
    name = 'CreateDepartmentSpecializationTable1716992259924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specializations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "department_id" uuid, CONSTRAINT "UQ_68ccfdea9eca4570f9aa5454b25" UNIQUE ("name"), CONSTRAINT "PK_1d4b2b9ff96a76def0bf7195a8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD CONSTRAINT "FK_666260ead12392526dbdb25cb25" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specializations" DROP CONSTRAINT "FK_666260ead12392526dbdb25cb25"`);
        await queryRunner.query(`DROP TABLE "specializations"`);
        await queryRunner.query(`DROP TABLE "departments"`);
    }

}
