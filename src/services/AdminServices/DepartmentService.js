import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.ADMIN_REST_API_URL

export const getDepartments = async ({page = 0, size = 50}) => {
  const {data} = await $authHost.get(BASE_URL + '/allDepartments',{
    params: {
      page: 0,
      size: 49
    }
  })

  return data
}

export const createDepartment = async (department) => {
  const {data} = await $authHost.post(BASE_URL + '/createDepartment', {
    department
  })

  return data
}

export const updateDepartment = async (department) => {
  const {data} = await $authHost.patch(BASE_URL + '/changeDepartment', {
    department
  })

  return data
}

export const deleteDepartment = async (departmentId) => {
  const {data} = await $authHost.delete(BASE_URL + '/deleteDepartment', {
    data: {
      departmentId
    }
  })

  return data
}
