const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      // To set a header: .set("authorization", "value")
      .send({
        name: "APAD",
        email: "apda@geral.com",
        whatsapp: "918676912",
        city: "Matosinhos",	
        district: "Porto"
      });

      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toHaveLength(8);
  });
});