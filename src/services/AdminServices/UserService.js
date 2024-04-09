import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.ADMIN_REST_API_URL

export const getUsers = async ({page = 0, size = 10}) => {
  const {data} = await $authHost.get(BASE_URL + '/allUsers', {
    params: {
      page: page,
      size: size
    }
  })

  return data
}

export const banUser = async (userId, isBanned) => {
  const {data} = await $authHost.post(BASE_URL + `/banUser/${userId}`,{
    isBanned: isBanned
  })

  return data
}

export const deleteUser = async (userId) => {
  const {data} = await $authHost.delete(BASE_URL + `/deleteUser/${userId}`)

  return data
}