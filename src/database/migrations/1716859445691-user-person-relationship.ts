import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPersonRelationship1716859445691 implements MigrationInterface {
    name = 'UserPersonRelationship1716859445691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."persons_genre_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "genre" "public"."persons_genre_enum" NOT NULL, "identification" character varying NOT NULL, "date_of_birth" date NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_d7950ed18cefbbd53b8ad89b642" UNIQUE ("identification"), CONSTRAINT "UQ_6545fa46b808c5870a6b27a3adf" UNIQUE ("phone"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "genre"`);
        await queryRunner.query(`DROP TYPE "public"."users_genre_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_140d91acc242af813ce91987621"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identification"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "person_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5ed72dcd00d6e5a88c6a6ba3d18" UNIQUE ("person_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5ed72dcd00d6e5a88c6a6ba3d18"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5ed72dcd00d6e5a88c6a6ba3d18"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "person_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_of_birth" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identification" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_140d91acc242af813ce91987621" UNIQUE ("identification")`);
        await queryRunner.query(`CREATE TYPE "public"."users_genre_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "genre" "public"."users_genre_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "persons"`);
        await queryRunner.query(`DROP TYPE "public"."persons_genre_enum"`);
    }

}
