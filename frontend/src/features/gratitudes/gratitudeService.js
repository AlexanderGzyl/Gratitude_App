import axios from 'axios'

const API_URL = '/api/gratitudes/'

// Create new gratitude
const createGratitude = async (gratitudeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, gratitudeData, config)

  return response.data
}

// Get user gratitudes
const getGratitudes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user gratitude
const deleteGratitude = async (gratitudeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + gratitudeId, config)

  return response.data
}



const gratitudeService = {
  createGratitude,
  getGratitudes,
  deleteGratitude
  
}

export default gratitudeService