import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecializationTables1717182431619 implements MigrationInterface {
    name = 'CreateSpecializationTables1717182431619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "physician_support_specializations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "department_id" uuid, CONSTRAINT "UQ_1618696bbf8e798c939d2a47153" UNIQUE ("name"), CONSTRAINT "PK_ad9e6f58a3b8581066e7aa141d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "physician_specialization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "department_id" uuid, CONSTRAINT "UQ_289230548ccb80a1b1df34f8418" UNIQUE ("name"), CONSTRAINT "PK_4fdea0767339248d21785135966" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "physician_support_specializations" ADD CONSTRAINT "FK_e0aa068dbd8712ce89df111c0da" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "physician_specialization" ADD CONSTRAINT "FK_8a7ea74043d9abe769999502cdf" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "physician_specialization" DROP CONSTRAINT "FK_8a7ea74043d9abe769999502cdf"`);
        await queryRunner.query(`ALTER TABLE "physician_support_specializations" DROP CONSTRAINT "FK_e0aa068dbd8712ce89df111c0da"`);
        await queryRunner.query(`DROP TABLE "physician_specialization"`);
        await queryRunner.query(`DROP TABLE "physician_support_specializations"`);
    }

}
