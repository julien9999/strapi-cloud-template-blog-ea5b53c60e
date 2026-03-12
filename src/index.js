'use strict';
const bootstrap = require("./bootstrap");

module.exports = {
  register(/*{ strapi }*/) {},
  bootstrap({ strapi }) {
    return bootstrap(strapi);
  },
};
