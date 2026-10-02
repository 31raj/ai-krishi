import { Router } from 'express';
import { handleAssistant } from '../controllers/assistantController.js';
import { handleWeather } from '../controllers/weatherController.js';
import { handleIrrigation } from '../controllers/irrigationController.js';

const router = Router();

router.post('/assistant', handleAssistant);
router.get('/weather', handleWeather);
router.post('/irrigation', handleIrrigation);

export default router;
