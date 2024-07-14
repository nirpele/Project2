const purchaseRep = require('../repositories/purchasesRepository');

const getAllPurchases = (filters) => {
  return purchaseRep.getAllPurchases(filters);
};

const getAllCities = async () => {
  try {
    const purchases = await getAllPurchases({});
    const cities = purchases.map((purchase) => purchase.city);
    return cities;
  } catch (error) {
    throw error;
  }
};

const getById = (id) => {
  return purchaseRep.getById(id);
};

const addPurchase = (obj) => {
  return purchaseRep.addPurchase(obj);
};

const updatePurchase = (id, obj) => {
  return purchaseRep.updatePurchase(id, obj);
};

const deletePurchase = (id) => {
  return purchaseRep.deletePurchase(id);
};

module.exports = {
  getAllPurchases,
  getAllCities,
  getById,
  addPurchase,
  updatePurchase,
  deletePurchase,
};
