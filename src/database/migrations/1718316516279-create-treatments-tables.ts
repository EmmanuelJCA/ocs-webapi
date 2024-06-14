import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTreatmentsTables1718316516279 implements MigrationInterface {
    name = 'CreateTreatmentsTables1718316516279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "measurement_units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "abbreviation" character varying NOT NULL, CONSTRAINT "UQ_fd7e9079abab775ab791dba3457" UNIQUE ("name"), CONSTRAINT "UQ_301acf93e5ab93ac03880d5f75f" UNIQUE ("abbreviation"), CONSTRAINT "PK_c2442ce42194b3e63b4f502ad40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "instructions" character varying NOT NULL, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "measurement_unit_id" uuid, CONSTRAINT "UQ_f5bf463988950dfd84b2e39a3d6" UNIQUE ("name"), CONSTRAINT "UQ_78f4b752f0898fafbe2bf2e717e" UNIQUE ("description"), CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "treatment_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "department_id" uuid, CONSTRAINT "UQ_2196dd564f44313bd69998ba474" UNIQUE ("name"), CONSTRAINT "UQ_59e3a776a699f5b6bd6896bbedc" UNIQUE ("description"), CONSTRAINT "PK_064bbb5cbf2a841694283c0908b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."treatments_result_enum" AS ENUM('SUCCESS', 'FAILURE')`);
        await queryRunner.query(`CREATE TABLE "treatments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "instructions" character varying NOT NULL, "start_date_time" TIMESTAMP NOT NULL, "end_date_time" TIMESTAMP, "result" "public"."treatments_result_enum", "result_notes" character varying, "treatment_type_id" uuid, "oncology_center_id" uuid, "physician_id" uuid, CONSTRAINT "UQ_42ef5b6c8c9977a053992756cbd" UNIQUE ("instructions"), CONSTRAINT "PK_133f26d52c70b9fa3c2dbb3c89e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "treatment_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "instructions" character varying NOT NULL, "start_date_time" TIMESTAMP NOT NULL, "end_date_time" TIMESTAMP, "observations" character varying NOT NULL, "physician_support_id" uuid, "department_id" uuid, CONSTRAINT "PK_f301891fd97dab91f2c0fe18614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes_supplies" ("recipes_id" uuid NOT NULL, "supplies_id" uuid NOT NULL, CONSTRAINT "PK_e960c913a458b0612f1b0c5787f" PRIMARY KEY ("recipes_id", "supplies_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4341fca5faec1b69abc2030f14" ON "recipes_supplies" ("recipes_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0502531ed38dca94db19812c0" ON "recipes_supplies" ("supplies_id") `);
        await queryRunner.query(`CREATE TABLE "diagnostics_treatments" ("diagnostic_id" uuid NOT NULL, "treatment_id" uuid NOT NULL, CONSTRAINT "PK_32da61180bf2d6f82c6503f8919" PRIMARY KEY ("diagnostic_id", "treatment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7619826a236fe685a793013ec2" ON "diagnostics_treatments" ("diagnostic_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_879110bec990118c74e162ed71" ON "diagnostics_treatments" ("treatment_id") `);
        await queryRunner.query(`CREATE TABLE "treatment_sessions_recipes" ("treatment_sessions" uuid NOT NULL, "recipes_id" uuid NOT NULL, CONSTRAINT "PK_295f053348894cecbddfbd67473" PRIMARY KEY ("treatment_sessions", "recipes_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_959a616b02c14fe5cb4de12b0e" ON "treatment_sessions_recipes" ("treatment_sessions") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ef47ac743a3f5945a193e114b" ON "treatment_sessions_recipes" ("recipes_id") `);
        await queryRunner.query(`ALTER TABLE "supplies" ADD CONSTRAINT "FK_cbb4b75a63ed4fbed85ccb58fcc" FOREIGN KEY ("measurement_unit_id") REFERENCES "measurement_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatment_types" ADD CONSTRAINT "FK_d516df3c6dad07176ccc7463069" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatments" ADD CONSTRAINT "FK_61cdd667fffc5db77a8bab53743" FOREIGN KEY ("treatment_type_id") REFERENCES "treatment_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatments" ADD CONSTRAINT "FK_26828fd2c5579ba6e2f99b5628c" FOREIGN KEY ("oncology_center_id") REFERENCES "oncology_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatments" ADD CONSTRAINT "FK_f44068316beefd1e9e6f6ed179c" FOREIGN KEY ("physician_id") REFERENCES "physicians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions" ADD CONSTRAINT "FK_176ab135ffd0a2f623e1376441d" FOREIGN KEY ("physician_support_id") REFERENCES "physician_supports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions" ADD CONSTRAINT "FK_3a181d8597cce174808572757f7" FOREIGN KEY ("department_id") REFERENCES "treatments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "FK_4341fca5faec1b69abc2030f149" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "FK_c0502531ed38dca94db19812c09" FOREIGN KEY ("supplies_id") REFERENCES "supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnostics_treatments" ADD CONSTRAINT "FK_7619826a236fe685a793013ec2e" FOREIGN KEY ("diagnostic_id") REFERENCES "diagnostics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diagnostics_treatments" ADD CONSTRAINT "FK_879110bec990118c74e162ed713" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions_recipes" ADD CONSTRAINT "FK_959a616b02c14fe5cb4de12b0ee" FOREIGN KEY ("treatment_sessions") REFERENCES "treatment_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions_recipes" ADD CONSTRAINT "FK_6ef47ac743a3f5945a193e114b2" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "treatment_sessions_recipes" DROP CONSTRAINT "FK_6ef47ac743a3f5945a193e114b2"`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions_recipes" DROP CONSTRAINT "FK_959a616b02c14fe5cb4de12b0ee"`);
        await queryRunner.query(`ALTER TABLE "diagnostics_treatments" DROP CONSTRAINT "FK_879110bec990118c74e162ed713"`);
        await queryRunner.query(`ALTER TABLE "diagnostics_treatments" DROP CONSTRAINT "FK_7619826a236fe685a793013ec2e"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "FK_c0502531ed38dca94db19812c09"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "FK_4341fca5faec1b69abc2030f149"`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions" DROP CONSTRAINT "FK_3a181d8597cce174808572757f7"`);
        await queryRunner.query(`ALTER TABLE "treatment_sessions" DROP CONSTRAINT "FK_176ab135ffd0a2f623e1376441d"`);
        await queryRunner.query(`ALTER TABLE "treatments" DROP CONSTRAINT "FK_f44068316beefd1e9e6f6ed179c"`);
        await queryRunner.query(`ALTER TABLE "treatments" DROP CONSTRAINT "FK_26828fd2c5579ba6e2f99b5628c"`);
        await queryRunner.query(`ALTER TABLE "treatments" DROP CONSTRAINT "FK_61cdd667fffc5db77a8bab53743"`);
        await queryRunner.query(`ALTER TABLE "treatment_types" DROP CONSTRAINT "FK_d516df3c6dad07176ccc7463069"`);
        await queryRunner.query(`ALTER TABLE "supplies" DROP CONSTRAINT "FK_cbb4b75a63ed4fbed85ccb58fcc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ef47ac743a3f5945a193e114b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_959a616b02c14fe5cb4de12b0e"`);
        await queryRunner.query(`DROP TABLE "treatment_sessions_recipes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_879110bec990118c74e162ed71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7619826a236fe685a793013ec2"`);
        await queryRunner.query(`DROP TABLE "diagnostics_treatments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0502531ed38dca94db19812c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4341fca5faec1b69abc2030f14"`);
        await queryRunner.query(`DROP TABLE "recipes_supplies"`);
        await queryRunner.query(`DROP TABLE "treatment_sessions"`);
        await queryRunner.query(`DROP TABLE "treatments"`);
        await queryRunner.query(`DROP TYPE "public"."treatments_result_enum"`);
        await queryRunner.query(`DROP TABLE "treatment_types"`);
        await queryRunner.query(`DROP TABLE "supplies"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "measurement_units"`);
    }

}
