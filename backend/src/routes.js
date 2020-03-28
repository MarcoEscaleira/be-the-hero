const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const router = express.Router();

router.post("/session", celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessionController.create)

router.get("/ongs", OngController.index);

router.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(7).max(16),
    city: Joi.string().required(),
    district: Joi.string().required()
  })
}), OngController.create);

router.get("/profile", celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index);

router.get("/incidents", celebrate({
  [Segments.QUERY]: {
    page: Joi.number()
  }
}), IncidentController.index);

router.post("/incidents", celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required()
  }).unknown()
}), IncidentController.create);

router.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentController.delete);

module.exports = router;