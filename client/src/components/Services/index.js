import axios from 'axios'

const BASE = process.env.REACT_APP_AIRTABLE_BASE
const KEY = process.env.REACT_APP_AIRTABLE_KEY
export const sessionUrl = `https://api.airtable.com/v0/${BASE}/session`
export const movementUrl = `https://api.airtable.com/v0/${BASE}/movement`
export const movementTwoUrl = `https://api.airtable.com/v0/${BASE}/movementtwo`
export const config = {
    headers: {
      Authorization: `Bearer ${KEY}`
    }
}

export const postSession = async (sessionData) => {
  const response = await axios.post(sessionUrl, { fields: sessionData }, config)
  return response.data
}