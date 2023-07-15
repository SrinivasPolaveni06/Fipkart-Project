const productSchema = require("../model/projectSchemas");

const createProduct = async function (req, res, next) {
  try {
    const { body } = req;

    //const StrId = user_id.toString();
    //console.log(body);
    const product = new productSchema({ ...body });
    product.save();
    return res.status(200).send({ message: "Product Created", status: "ok" });
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const getProducts = async function (req, res, next) {
  try {
    //const { body } = req;
    //console.log(req.query);
    const { search, order_by, limit } = req.query;

    const priceSortValue = order_by !== "DESC" ? 1 : -1;
    //const nameSortValue = order !== "DESC" ? 1 : -1;

    const data =
      order_by === ""
        ? await productSchema.aggregate([
            { $match: { category: req.query.search } },
          ])
        : await productSchema.aggregate([
            { $match: { category: req.query.search } },
            { $sort: { price: priceSortValue } },
          ]);

    if (limit !== undefined) {
      return res.send(data.slice(0, limit));
    }
    return res.send(data);
    //}
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const getTotalData = async function (req, res, next) {
  try {
    const data = await productSchema.find({});
    return res.send(data);
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

const getSpecificData = async function (req, res, next) {
  try {
    const id = req.params.id;
    const data = await productSchema.findById(id);
    return res.send(data);
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
};

module.exports = { createProduct, getProducts, getTotalData, getSpecificData };
