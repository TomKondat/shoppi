const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/AppError");
const APImethods = require("./../utils/APImethods");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deletedDoc)
      return next(new AppError(400, "the producdt dosent exist"));
    res.status(204).json({
      status: "success",
      Doc: null,
    });
  });
exports.editOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.body, req.params);
    const editedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean();
    res.status(201).json({
      status: "success",
      editedDoc,
    });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      newDoc,
    });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.params.productId)
      filter = {
        product: req.params.productId,
      };
    const apimethods = new APImethods(Model.find(filter), req.query);
    apimethods.filter().sort().selectFields().makePagination();
    const docs = await apimethods.query;

    res.status(200).json({
      status: "success",
      docs,
    });
  });
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    if (!req.params.id)
      return next(new AppError(400, "the doc id dosent exist"));
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(new AppError(400, "the doc dosent exist"));
    res.status(200).json({
      status: "success",
      doc,
    });
  });
