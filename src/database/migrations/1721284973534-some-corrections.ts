import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeCorrections1721284973534 implements MigrationInterface {
    name = 'SomeCorrections1721284973534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "FK_4341fca5faec1b69abc2030f149"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4341fca5faec1b69abc2030f14"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0502531ed38dca94db19812c0"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP COLUMN "recipes_id"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "PK_bb0d60435e7f59e1b92d10a363a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD "dose" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD "recipe_id" uuid`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "FK_c0502531ed38dca94db19812c09"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ALTER COLUMN "supplies_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "FK_32df95d69cfac3347358793f8fa" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "FK_c0502531ed38dca94db19812c09" FOREIGN KEY ("supplies_id") REFERENCES "supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "FK_c0502531ed38dca94db19812c09"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "FK_32df95d69cfac3347358793f8fa"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ALTER COLUMN "supplies_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "FK_c0502531ed38dca94db19812c09" FOREIGN KEY ("supplies_id") REFERENCES "supplies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP COLUMN "dose"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP CONSTRAINT "PK_bb0d60435e7f59e1b92d10a363a"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD "recipes_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_c0502531ed38dca94db19812c0" ON "recipes_supplies" ("supplies_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4341fca5faec1b69abc2030f14" ON "recipes_supplies" ("recipes_id") `);
        await queryRunner.query(`ALTER TABLE "recipes_supplies" ADD CONSTRAINT "FK_4341fca5faec1b69abc2030f149" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
