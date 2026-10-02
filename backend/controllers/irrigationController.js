import irrigationService from '../services/irrigationService.js';

export async function handleIrrigation(req, res) {
  try {
    const {
      soilMoisture,
      cropType,
      temperature,
      humidity,
      rainProbability,
      growthStage
    } = req.body;

    if (soilMoisture === undefined || !cropType) {
      return res.status(400).json({
        success: false,
        error: 'soilMoisture and cropType are required'
      });
    }

    const recommendation =
      irrigationService.getIrrigationRecommendation({
        soilMoisture,
        cropType,
        temperature,
        humidity,
        rainProbability,
        growthStage
      });

    res.json({
      success: true,
      recommendation
    });

  } catch (error) {
    console.error('Irrigation error:', error);

    res.status(500).json({
      success: false,
      error: 'Unable to calculate irrigation recommendation'
    });
  }
}