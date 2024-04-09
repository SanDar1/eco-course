import {URL} from "../../config/URL";
import {$authHost} from "../../config";

const BASE_URL = URL.USER_REST_API_URL

export const getUserInfo = async () => {
  const {data} = await $authHost.get(BASE_URL)

  return data
}

export const updateUserInfo = async (user) => {
  await $authHost.patch(BASE_URL + '/updateProfile', {
    user: user
  })
}

export const uploadProfileImage = async (formData) => {
  await $authHost.post(BASE_URL + '/uploadProfilePhoto', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const removeProfileImage = async (photoProfile) => {
  await $authHost.delete(BASE_URL + '/deleteProfilePhoto', {
    data: {
      photoProfile
    }
  })
}