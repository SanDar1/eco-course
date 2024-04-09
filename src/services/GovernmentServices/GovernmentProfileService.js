import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.GOVERNMENT_REST_API_URL

export const getGovernmentProfile = async () => {
  const {data} = await $authHost.get(BASE_URL)
  return data
}

export const updateGovernmentProfile = async (government) => {
  const {data} = await $authHost.patch(BASE_URL + '/updateProfile', {
    government
  })
  return data
}