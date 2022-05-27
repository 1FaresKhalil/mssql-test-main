const express = require('express');
const apiRoute = require('./api.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/api',
    route: apiRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
