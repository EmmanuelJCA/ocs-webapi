import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifySuppliesTable1718632138287 implements MigrationInterface {
    name = 'ModifySuppliesTable1718632138287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplies_treatment_types" ("supplies_id" uuid NOT NULL, "treatment_type_id" uuid NOT NULL, CONSTRAINT "PK_4ba711d0556f3f951ee398ee551" PRIMARY KEY ("supplies_id", "treatment_type_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23f381f72b61a6fcfbd49800a6" ON "supplies_treatment_types" ("supplies_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_269cf2a358d581c55be48bb75c" ON "supplies_treatment_types" ("treatment_type_id") `);
        await queryRunner.query(`ALTER TABLE "supplies_treatment_types" ADD CONSTRAINT "FK_23f381f72b61a6fcfbd49800a65" FOREIGN KEY ("supplies_id") REFERENCES "supplies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supplies_treatment_types" ADD CONSTRAINT "FK_269cf2a358d581c55be48bb75c5" FOREIGN KEY ("treatment_type_id") REFERENCES "treatment_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplies_treatment_types" DROP CONSTRAINT "FK_269cf2a358d581c55be48bb75c5"`);
        await queryRunner.query(`ALTER TABLE "supplies_treatment_types" DROP CONSTRAINT "FK_23f381f72b61a6fcfbd49800a65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_269cf2a358d581c55be48bb75c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23f381f72b61a6fcfbd49800a6"`);
        await queryRunner.query(`DROP TABLE "supplies_treatment_types"`);
    }

}
