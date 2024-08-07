'use strict';
const axios = require('axios');
const { Medicine } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const medicineNames = ['prolyte']; 
    const medicinesToSeed = [];

    const fetchMedicineData = async (medicineName) => {
      const options = {
        method: 'GET',
        url: 'https://medicine-name-and-details.p.rapidapi.com/',
        params: { medicineName },
        headers: {
          'x-rapidapi-key': '8483232804msh524d6411e90d2d8p12fc13jsneda66e8f419e', 
          'x-rapidapi-host': 'medicine-name-and-details.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    for (const name of medicineNames) {
      const medicineData = await fetchMedicineData(name);

      if (medicineData && medicineData.length > 0) {
        medicineData.forEach(data => {
          medicinesToSeed.push({
            medicineName: data.medicineName,
            description: '', 
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }
    }

    return queryInterface.bulkInsert('Medicines', medicinesToSeed, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Medicines', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
