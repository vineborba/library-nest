import { MigrationInterface, QueryRunner } from 'typeorm';

export class initializeDatabase1642126530352 implements MigrationInterface {
  name = 'initializeDatabase1642126530352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "published_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "books_categories" ("bookId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_67306b12bb62a5e5e31748b0fbc" PRIMARY KEY ("bookId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85139bf66c8b26e8834d0583f6" ON "books_categories" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_05f1fbc852d8fd48f5a14547da" ON "books_categories" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_categories" ADD CONSTRAINT "FK_85139bf66c8b26e8834d0583f6e" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_categories" ADD CONSTRAINT "FK_05f1fbc852d8fd48f5a14547dae" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books_categories" DROP CONSTRAINT "FK_05f1fbc852d8fd48f5a14547dae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books_categories" DROP CONSTRAINT "FK_85139bf66c8b26e8834d0583f6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_05f1fbc852d8fd48f5a14547da"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_85139bf66c8b26e8834d0583f6"`,
    );
    await queryRunner.query(`DROP TABLE "books_categories"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "author"`);
  }
}
