import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateUsersTable1710207237260 implements MigrationInterface {
  name = 'CreateUsersTable1710207237260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_genre_enum" AS ENUM('M', 'F')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM
      ('SUPER_ADMINISTRATOR',
          'ADMINISTRATOR',
          'ONCOLOGIST',
          'RADIONCOLOGIST',
          'NURSE',
          'RADIOTHERAPIST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users"
      (
          "id"             uuid                        NOT NULL DEFAULT uuid_generate_v4(),
          "created_at"     TIMESTAMP                   NOT NULL DEFAULT now(),
          "updated_at"     TIMESTAMP                   NOT NULL DEFAULT now(),
          "inactivated_at" date,
          "first_name"     character varying           NOT NULL,
          "last_name"      character varying           NOT NULL,
          "genre"          "public"."users_genre_enum" NOT NULL,
          "identification" character varying           NOT NULL,
          "date_of_birth"  date                        NOT NULL,
          "role"           "public"."users_role_enum"  NOT NULL,
          "email"          character varying           NOT NULL,
          "password"       character varying           NOT NULL,
          "phone"          character varying           NOT NULL,
          "avatar"         character varying,
          CONSTRAINT "UQ_140d91acc242af813ce91987621" UNIQUE ("identification"),
          CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
          CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
          CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_genre_enum"`);
  }
}
