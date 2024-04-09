import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.USER_REST_API_URL

export const addViolation = async (violationObj, formData, latitude, longitude) => {
  const objToSent = {
    ...violationObj,
    latitude: latitude,
    longitude: longitude
  }

  const {data} = await $authHost.post(BASE_URL + '/setViolationInfo', {
    violation: objToSent
  })

  await $authHost.post(BASE_URL + '/uploadViolation', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'vid': Number(data.id)
    }
  })
}

export const getViolations = async () => {
  const {data} = await $authHost.get(BASE_URL + '/violations')
  return data
}