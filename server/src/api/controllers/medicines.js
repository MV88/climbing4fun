const mongoose = require('mongoose');
const Medicine = require('../models/medicine');

module.exports = {
  medicinesGet: (req, res, next) => {
    Medicine.find()
      .select("_id name desc medicineImage expMonth expYear")
      .exec()
      .then((result) => {
        // if(result.length > 0) {
        const response = {
          count: result.length,
          medicines: result.map(res => ({
            ...res,
            request: {
              type: "GET",
              url: `http://localhost:3000/medicines/${res._id}`,
            },
          })),
        };
        res.status(200).json({
          ...response,
          message: "handling GET requests  to /medicines",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
  },
  medicinesGetById: (req, res, next) => {
    const medicineId = req.params.medicineId;
    Medicine
      .findById(medicineId)
      .select("_id name desc medicineImage expMonth expYear")
      .exec()
      .then((result) => {
        console.log(result);
        if (result) {
          res.status(200).json({
            medicine: result,
            request: {
              type: "GET",
              description: "get all medicines",
              url: `http://localhost:3000/medicines/`,
            },
          });
        } else {
          res.status(404).json({
            message: "invalid id",
            medicineId,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
    res.status(200).json({
      message: "handling GET requests  to /medicines/:medId",
      medicineId,
    });
  },
  medicinesPatchById: (req, res, next) => {
    const medicineId = req.params.medicineId;

    Medicine
      .update({
        _id: medicineId,
      }, {
        $set: req.body,
      })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          medicine: result,
          request: {
            type: "GET",
            description: "get data for a single medicine",
            url: `http://localhost:3000/medicines/${res._id}`,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });

    res.status(200).json({
      message: "handling PATCH requests  to /medicines/:medId",
      medicineId,
    });
  },
  medicinesDeleteById: (req, res, next) => {
    const medicineId = req.params.medicineId;
    Medicine
      .remove({
        _id: medicineId,
      })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "medicine deleted",
          request: {
            type: "POST",
            description: "create a new medicine",
            url: `http://localhost:3000/medicines/`,
            data: {
              name: { type: String, required: true },
              desc: String,
              medicineImage: String,
              expMonth: { type: Number, required: true },
              expYear: { type: Number, required: true },
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
  },
  medicinesPost: (req, res, next) => {
    const medicine = {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      desc: req.body.desc,
      medicineImage: req.file.path,
      expMonth: req.body.expMonth,
      expYear: req.body.expYear,
    };
    const dbHandler = new Medicine(medicine);

    console.log("before save");
    dbHandler.save()
      .then((result) => {
        console.log("result", result);
        const response = {
          ...result,
          request: {
            type: "GET",
            url: `http://localhost:3000/medicines/${res._id}`,
          },
        };
        res.status(201).json({
          ...response,
          message: "created medicine successfully",
        });
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).json({ error });
      });
  },
};
