import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePhysicianTable1717183755962 implements MigrationInterface {
    name = 'CreatePhysicianTable1717183755962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "physicians" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "REL_155ac0042118593267f894485f" UNIQUE ("user_id"), CONSTRAINT "PK_ca420d8a50c2f5ae18e781f244f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "physicians_specializations_physicians" ("physician_specialization_id" uuid NOT NULL, "physician_id" uuid NOT NULL, CONSTRAINT "PK_b95ac46f690b141f3d602839e86" PRIMARY KEY ("physician_specialization_id", "physician_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24b8a777257b873033b551bb4f" ON "physicians_specializations_physicians" ("physician_specialization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd12a7989dbb74db779cd78e26" ON "physicians_specializations_physicians" ("physician_id") `);
        await queryRunner.query(`ALTER TABLE "physicians" ADD CONSTRAINT "FK_155ac0042118593267f894485f5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "physicians_specializations_physicians" ADD CONSTRAINT "FK_24b8a777257b873033b551bb4f5" FOREIGN KEY ("physician_specialization_id") REFERENCES "physician_specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "physicians_specializations_physicians" ADD CONSTRAINT "FK_dd12a7989dbb74db779cd78e268" FOREIGN KEY ("physician_id") REFERENCES "physicians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "physicians_specializations_physicians" DROP CONSTRAINT "FK_dd12a7989dbb74db779cd78e268"`);
        await queryRunner.query(`ALTER TABLE "physicians_specializations_physicians" DROP CONSTRAINT "FK_24b8a777257b873033b551bb4f5"`);
        await queryRunner.query(`ALTER TABLE "physicians" DROP CONSTRAINT "FK_155ac0042118593267f894485f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd12a7989dbb74db779cd78e26"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24b8a777257b873033b551bb4f"`);
        await queryRunner.query(`DROP TABLE "physicians_specializations_physicians"`);
        await queryRunner.query(`DROP TABLE "physicians"`);
    }

}
