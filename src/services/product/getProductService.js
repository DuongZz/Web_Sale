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
    } = req.query;

    if (name) {
      const query = { name: { $regex: new RegExp(name, "i") } };
      return findProductByFilter(query);
    }

    const query = { _destroy: Boolean(_destroy) || false };
    if (typeDevice) query.typeDevice = typeDevice;
    if (CPU) query["techSpecification.CPU"] = { $regex: new RegExp(CPU, "i") };
    if (graphicCard)
      query["techSpecification.graphicCard"] = {
        $regex: new RegExp(graphicCard, "i"),
      };
    if (display)
      query["techSpecification.display"] = { $regex: new RegExp(display, "i") };

    const priceRange = {
      $gte: parseFloat(minPrice) || 0,
      $lte: parseFloat(maxPrice) || Number.MAX_SAFE_INTEGER,
    };
    query.price = priceRange;

    const filteredProducts = await findProductByFilter(query);
    return filteredProducts;
  } catch (error) {
    throw error;
  }
};
