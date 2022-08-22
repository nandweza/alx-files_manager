import express from 'express';
import AppController from '../controllers/AppController';
import router from 'util';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);
}

// App Controller
router.get('/status', (req, res) => {
  AppController.getStatus(req, res);
});

router.get('/stats', (req, res) => {
  AppController.getStats(req, res);
});