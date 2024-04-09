import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.GOVERNMENT_REST_API_URL

export const changeGarbageClass = async ( violationId, isAcceptedClass ) => {
  await $authHost.post(BASE_URL + '/changeGarbageClass', {
    violationId,
    isAcceptedClass
  })
}

export const getGovViolations = async () => {
  const {data} = await $authHost.get(BASE_URL + '/getViolations')
  return data
}

export const changeViolationStatus = async ( violationId, status ) => {
  await $authHost.post(BASE_URL + '/changeViolationStatus ', {
    violationId,
    status
  })
}