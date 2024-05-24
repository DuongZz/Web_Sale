import { findProductByFilter, findAllProduct } from "~/models/productModel";

export const filterProductService = async (req) => {
  try {
    const hasQuery = Object.keys(req.query).length > 0;
    if (!hasQuery) {
      return await findAllProduct();
    }
    const {
      name,
      typeDevice,
      _destroy,
      minPrice,
      maxPrice,
      CPU,
      graphicCard,
      display,
      dimensions,
      limit,
      sort,
      brand,
    } = req.query;

    // if (name) {
    //   const query = { name: { $regex: new RegExp(name, "i") } };
    //   return findProductByFilter(query);
    // }
    const sortObj = {};
    if (sort) {
      const sortArr = sort.split(",");
      if (sortArr.includes("-sold")) sortObj.sold = -1;
      if (sortArr.includes("sold")) sortObj.sold = 1;
      if (sortArr.includes("discount")) sortObj.discount = 1;
      if (sortArr.includes("-discount")) sortObj.discount = -1;
      if (sortArr.includes("-price")) sortObj.price = -1;
      if (sortArr.includes("price")) sortObj.price = 1;
    }
    const query = { _destroy: Boolean(_destroy) || false };
    if (name) query.name = { $regex: new RegExp(name, "i") };
    if (typeDevice) query.typeDevice = typeDevice;
    if (CPU) query["techSpecification.CPU"] = { $regex: new RegExp(CPU, "i") };
    if (graphicCard)
      query["techSpecification.graphicCard"] = {
        $regex: new RegExp(graphicCard, "i"),
      };
    if (display)
      query["techSpecification.display"] = { $regex: new RegExp(display, "i") };
    if (dimensions)
      query["techSpecification.dimensions"] = {
        $regex: new RegExp(dimensions, "i"),
      };
    if (brand) query.brand = brand;
    const priceRange = {
      $gte: parseFloat(minPrice) || 0,
      $lte: parseFloat(maxPrice) || Number.MAX_SAFE_INTEGER,
    };
    query.price = priceRange;

    const filteredProducts = await findProductByFilter(query, limit, sortObj);
    return filteredProducts;
  } catch (error) {
    throw error;
  }
};
