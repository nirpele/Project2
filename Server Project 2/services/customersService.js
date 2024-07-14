const custRep = require('../repositories/customersRepository');

const getAllCustomers = (filters) => {
  return custRep.getAllCustomers(filters);
};

const getAllCities = async () => {
  try {
    const customers = await getAllCustomers({});
    const cities = customers.map((cust) => cust.city);
    return cities;
  } catch (error) {
    throw error;
  }
};

const getById = (id) => {
  return custRep.getById(id);
};

const addCustomer = (obj) => {
  return custRep.addCustomer(obj);
};

const updateCustomer = (id, obj) => {
  return custRep.updateCustomer(id, obj);
};

const deleteCustomer = (id) => {
  return custRep.deleteCustomer(id);
};

module.exports = {
  getAllCustomers,
  getAllCities,
  getById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
