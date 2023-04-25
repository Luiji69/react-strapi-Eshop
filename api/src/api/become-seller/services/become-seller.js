'use strict';

/**
 * become-seller service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::become-seller.become-seller');
