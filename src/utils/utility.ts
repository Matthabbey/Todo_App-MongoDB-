import axios from 'axios'
import redis from 'redis'


export const fetchApiData = async (species:string) => {
    const url = `https://www.fishwatch.gov/api/species/${species}`
    const response = await axios.get(url)
  
    console.log("Request sent to API");
    return response.data
    
  }

