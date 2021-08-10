import sensorData from '../data/sensors.json'
import readingData from '../data/readings.json'

const mergeJSON = () => readingData.map(data => ({...data, ...sensorData.find(sensor => sensor.id === data.sensorId)})); 

export default mergeJSON;