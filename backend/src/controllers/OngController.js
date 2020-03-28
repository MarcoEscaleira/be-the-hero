const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");
  
    return response.json(ongs);
  },
  async create(request, response) {
    // TODO: Dont allow ONGS with duplicate name, email or whatsapp
    const { name, email, whatsapp, city, district } = request.body;
    const id = crypto.randomBytes(4).toString("HEX");

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      district
    });

    return response.json({
      id
    });
  }
}