import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientsTable1716943090758 implements MigrationInterface {
    name = 'CreatePatientsTable1716943090758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "person_id" uuid NOT NULL, CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email"), CONSTRAINT "REL_44a2b3d75eb327067c40843ed5" UNIQUE ("person_id"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_44a2b3d75eb327067c40843ed5e" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_44a2b3d75eb327067c40843ed5e"`);
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
