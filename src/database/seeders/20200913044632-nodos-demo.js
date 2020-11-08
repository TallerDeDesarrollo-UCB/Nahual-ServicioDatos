'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Nodos', [{
                nombre: 'CABA',
            },
            {
                nombre: 'Santa Fe',
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Nodos', null, {});
    }
};