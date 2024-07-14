const prodRep = require('../repositories/productsRepository');

const getAllProducts = (filters) => {
  return prodRep.getAllProducts(filters);
};

const getAllCities = async () => {
  try {
    const products = await getAllProducts({});
    const cities = products.map((prod) => prod.city);
    return cities;
  } catch (error) {
    throw error;
  }
};

const getById = (id) => {
  return prodRep.getById(id);
};

const addProduct = (obj) => {
  return prodRep.addProduct(obj);
};

const updateProduct = (id, obj) => {
  return prodRep.updateProduct(id, obj);
};

const deleteProduct = (id) => {
  return prodRep.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getAllCities,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};
