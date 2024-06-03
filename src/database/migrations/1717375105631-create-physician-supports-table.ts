import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePhysicianSupportsTable1717375105631 implements MigrationInterface {
    name = 'CreatePhysicianSupportsTable1717375105631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "physician_supports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "REL_f573525ddf48bf0cc62069318a" UNIQUE ("user_id"), CONSTRAINT "PK_f2462b5f374366d32a172192fa1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "physician_supports_specializations_physician_supports" ("physician_support_specialization_id" uuid NOT NULL, "physician_support_id" uuid NOT NULL, CONSTRAINT "PK_6a7f281c0d33338c2fcf4c34d75" PRIMARY KEY ("physician_support_specialization_id", "physician_support_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df05cbb3b041c01b9ccd3806e4" ON "physician_supports_specializations_physician_supports" ("physician_support_specialization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e447097b7c5032cecbf510ae7" ON "physician_supports_specializations_physician_supports" ("physician_support_id") `);
        await queryRunner.query(`ALTER TABLE "physician_supports" ADD CONSTRAINT "FK_f573525ddf48bf0cc62069318a0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "physician_supports_specializations_physician_supports" ADD CONSTRAINT "FK_df05cbb3b041c01b9ccd3806e4b" FOREIGN KEY ("physician_support_specialization_id") REFERENCES "physician_support_specializations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "physician_supports_specializations_physician_supports" ADD CONSTRAINT "FK_5e447097b7c5032cecbf510ae74" FOREIGN KEY ("physician_support_id") REFERENCES "physician_supports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "physician_supports_specializations_physician_supports" DROP CONSTRAINT "FK_5e447097b7c5032cecbf510ae74"`);
        await queryRunner.query(`ALTER TABLE "physician_supports_specializations_physician_supports" DROP CONSTRAINT "FK_df05cbb3b041c01b9ccd3806e4b"`);
        await queryRunner.query(`ALTER TABLE "physician_supports" DROP CONSTRAINT "FK_f573525ddf48bf0cc62069318a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e447097b7c5032cecbf510ae7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df05cbb3b041c01b9ccd3806e4"`);
        await queryRunner.query(`DROP TABLE "physician_supports_specializations_physician_supports"`);
        await queryRunner.query(`DROP TABLE "physician_supports"`);
    }

}
