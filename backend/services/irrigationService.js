const irrigationService = {
  getIrrigationRecommendation({ soilMoisture, cropType }) {
    const moisture = Number(soilMoisture || 0);
    const base = cropType ? cropType.toLowerCase() : 'general';

    if (moisture >= 70) {
      return `Soil moisture is high for ${base}. Watering is not needed right now.`;
    }

    if (moisture >= 40) {
      return `Soil moisture is moderate for ${base}. Consider light irrigation soon.`;
    }

    return `Soil moisture is low for ${base}. Schedule irrigation immediately.`;
  },
};

export default irrigationService;
