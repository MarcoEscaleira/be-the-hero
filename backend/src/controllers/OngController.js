const connection = require("../database/connection");
const generateUniqueId = require("../utils/generateUniqueId");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");
  
    return response.json(ongs);
  },
  async create(request, response) {
    // TODO: Dont allow ONGS with duplicate name, email or whatsapp
    const { name, email, whatsapp, city, district } = request.body;
    const id = generateUniqueId();

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