import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateOncologyCentersTable1710260953242
  implements MigrationInterface
{
  name = 'CreateOncologyCentersTable1710260953242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "oncology_centers"
      (
          "id"             uuid              NOT NULL DEFAULT uuid_generate_v4(),
          "created_at"     TIMESTAMP         NOT NULL DEFAULT now(),
          "updated_at"     TIMESTAMP         NOT NULL DEFAULT now(),
          "inactivated_at" date,
          "name"           character varying NOT NULL,
          "phone"          character varying NOT NULL,
          "email"          character varying NOT NULL,
          "website"        character varying,
          CONSTRAINT "UQ_938683744cae2330b7875274fa5" UNIQUE ("name"),
          CONSTRAINT "UQ_b96b193c2d9929e36f20c5796a4" UNIQUE ("phone"),
          CONSTRAINT "UQ_b4971e7f32372c1cbea245944eb" UNIQUE ("email"),
          CONSTRAINT "PK_8de2631f28ad830c192ad6f25d9" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_oncology_centers"
      (
          "user_id"            uuid NOT NULL,
          "oncology_center_id" uuid NOT NULL,
          CONSTRAINT "PK_0deec138244b9a592c40da8bc82" PRIMARY KEY ("user_id", "oncology_center_id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e0c330422d501c7b01f8a0519" ON "users_oncology_centers" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_52f8ec7080293338e354ab31da" ON "users_oncology_centers" ("oncology_center_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_oncology_centers"
      ADD CONSTRAINT "FK_1e0c330422d501c7b01f8a05193" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_oncology_centers" 
      ADD CONSTRAINT "FK_52f8ec7080293338e354ab31da8" FOREIGN KEY ("oncology_center_id") 
      REFERENCES "oncology_centers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_oncology_centers" DROP CONSTRAINT "FK_52f8ec7080293338e354ab31da8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_oncology_centers" DROP CONSTRAINT "FK_1e0c330422d501c7b01f8a05193"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_52f8ec7080293338e354ab31da"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1e0c330422d501c7b01f8a0519"`,
    );
    await queryRunner.query(`DROP TABLE "users_oncology_centers"`);
    await queryRunner.query(`DROP TABLE "oncology_centers"`);
  }
}
