import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.ADMIN_REST_API_URL

export const getGovernments = async ({page = 0, size = 10}) => {
  const {data} = await $authHost.get(BASE_URL + '/allGovernments', {
    params: {
      page: page,
      size: size
    }
  })

  return data
}

export const addGovernment = async (government) => {
  const {data} = await $authHost.post(BASE_URL + '/registerGovernment ', government)
  return data
}

export const activateGovernment = async (govId, isActivated) => {
  const {data} = await $authHost.post(BASE_URL + '/activateGovernment', {
    governmentId: parseInt(govId),
    isActivated: isActivated
  })

  return data
}

export const setDepartment = async (govId, depId) => {
  const {data} = await $authHost.post(BASE_URL + '/setDepartment', {
    governmentId: parseInt(govId),
    departmentId: parseInt(depId)
  })

  return data
}

export const getDepartmentById = async (depId) => {
  const {data} = await $authHost.get(BASE_URL + `/department/${depId}`)
  return data
}

export const unsetDepartment = async (govId) => {
  const {data} = await $authHost.post(BASE_URL + `/unsetDepartment`,{
    governmentId: parseInt(govId)
  })

  return data
}