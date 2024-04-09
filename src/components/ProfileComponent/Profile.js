import React, {useEffect, useState} from 'react'
import {
  getUserInfo,
  removeProfileImage,
  updateUserInfo,
  uploadProfileImage
} from "../../services/UserServices/ProfileService"
import {Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import styles from './Profile.module.css'
import ProfileAvatar from "./ProfileItems/ProfileAvatar";
import ProfileInfo from "./ProfileItems/ProfileInfo";
import {EMAIL_REGEXP} from "../../etc/AuthTests";
import ModalEdit from "../../UI/Modal/ModalEdit/ModalEdit";
import CustomTextField from "../../UI/Inputs/CustomTextField/CustomTextField";
import Loader from "../../UI/Loader/Loader";
import PhoneInputField from "./ProfileItems/PhoneInputField";
import {MIN_FIO_LENGTH, MIN_NUMBER_LENGTH} from "../../etc/ProfileTests";
import ProfileImageItem from "./ProfileImageItem";
import Message from "../../UI/Modal/MessageComponent/Message";
import {
  getGovernmentProfile,
  updateGovernmentProfile
} from "../../services/GovernmentServices/GovernmentProfileService";

const Profile = () => {
  const initialStateUserData = {
    lastname: '',
    name: '',
    patronymic: '',
    number: '',
    sex: '',
    email: '',
  }

  const initialStateError = {
    lastnameErr: false,
    nameErr: false,
    patronymicErr: false,
    numberErr: false,
    sexErr: false,
    emailErr: false,
    depErr: false,
  }

  const [userData, setUserData] = useState({...initialStateUserData})
  const [userRole, setUserRole] = useState('')
  const [selected, setSelected] = useState({...initialStateUserData})
  const [openMEdit, setOpenMEdit] = useState(false)
  const [errorState, setErrorState] = useState({...initialStateError})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    visible: false
  })

  const loadData = async () => {
    try {
      setLoading(true)

      if (JSON.parse(localStorage.getItem('userData')).role === 'GOVERNMENT') {
        setUserRole('GOVERNMENT')

        const res = await getGovernmentProfile()
        setUserData({...res})
      } else {

        const res = await getUserInfo()

        if (Object.keys(res.photo).length > 0) {
          res.img = <ProfileImageItem uploadURL={res.photo[0].link} />
        }

        setUserData({...res})
      }
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOnClick = () => {
    setSelected({...userData})
    setOpenMEdit(true)
  }

  const fieldProps = [
    !openMEdit && {
      name: 'email',
      type: 'email',
      value: userData.email || '',
      label: 'Логин',
      className: styles.inputField,
      disabled: !openMEdit,
      autoFocus: false,
      canError: openMEdit && errorState.emailErr,
      helperText: openMEdit && (errorState.emailErr ? "Невалидный email" : ""),
      onChange: e => fieldsOnChange(e)
    },
    {
      name: 'lastname',
      type: 'text',
      value: openMEdit ? ((selected.lastname) || '') : ((userData.lastname) || ''),
      label: 'Фамилия',
      className: styles.inputField,
      disabled: !openMEdit,
      autoFocus: true,
      canError: openMEdit && errorState.lastnameErr,
      helperText: openMEdit && (errorState.lastnameErr ? "Данное поле не может быть пустым" : ""),
      onChange: e => fieldsOnChange(e)
    },
    {
      name: 'name',
      type: 'text',
      value: openMEdit ? ((selected.name) || '') : ((userData.name) || ''),
      label: 'Имя',
      className: styles.inputField,
      disabled: !openMEdit,
      autoFocus: false,
      canError: openMEdit && errorState.nameErr,
      helperText: openMEdit && (errorState.nameErr ? "Данное поле не может быть пустым" : ""),
      onChange: e => fieldsOnChange(e)
    },
    {
      name: 'patronymic',
      type: 'text',
      value: openMEdit ? ((selected.patronymic) || '') : ((userData.patronymic) || ''),
      label: 'Отчество',
      className: styles.inputField,
      disabled: !openMEdit,
      autoFocus: false,
      canError: openMEdit && errorState.patronymicErr,
      helperText: openMEdit && (errorState.patronymicErr ? "Данное поле не может быть пустым" : ""),
      onChange: e => fieldsOnChange(e)
    },
    {
      name: 'sex',
      value: openMEdit ? ((selected.sex) || '') : ((userData.sex) || ''),
      label: 'Пол',
      className: styles.inputField,
      disabled: !openMEdit,
      autoFocus: false,
      canError: openMEdit && errorState.sexErr,
      helperText: openMEdit && (errorState.sexErr ? "Это поле обязательно" : ""),
      onChange: e => fieldsOnChange(e)
    },
    {
      name: 'number',
      type: 'tel',
      value: openMEdit ? ((selected.number) || '') : ((userData.number) || ''),
      label: 'Номер телефона',
      className: styles.inputField,
      disabled: !openMEdit,
      autoFocus: false,
      canError: openMEdit && errorState.numberErr,
      helperText: openMEdit && (errorState.numberErr ? "Невалидный номер телефона" : ""),
      onChange: e => fieldsOnChange(e),
      inputMask: PhoneInputField
    }
  ]

  const printInfo = (fieldProps) => (
    <>
      {fieldProps.map(field =>
        field
          ?
          field.name === 'sex'
            ?
            <FormControl style={{marginTop: '2vh'}} fullWidth key={field.label} className={styles.form}>
              <InputLabel className={styles.inputLabel}>Пол</InputLabel>
              <Select
                id={field.label}
                name={field.name}
                label={field.label}
                onChange={field.onChange}
                value={field.value}
                error={field.canError}
                disabled={field.disabled}
              >
                <MenuItem className={styles.menuItem} value={''}>Не выбрано</MenuItem>
                <MenuItem className={styles.menuItem} value={'male'}>Мужской</MenuItem>
                <MenuItem className={styles.menuItem} value={'female'}>Женский</MenuItem>
              </Select>
            </FormControl>
            :
              field.name === 'number'
              ?
                <CustomTextField
                  key={field.label}
                  name={field.name}
                  type={field.type}
                  value={field.value}
                  label={field.label}
                  className={field.className}
                  onChange={field.onChange}
                  error={field.canError}
                  helperText={field.helperText}
                  disabled={field.disabled}
                  InputProps={{
                    inputComponent: field.inputMask,
                  }}
                />
                :
                <CustomTextField
                  key={field.label}
                  name={field.name}
                  type={field.type}
                  value={field.value}
                  label={field.label}
                  className={field.className}
                  onChange={field.onChange}
                  error={field.canError}
                  helperText={field.helperText}
                  disabled={field.disabled}
                />
          :
          <></>
      )}
    </>
  )

  const fieldsOnChange = (e) => {
    setSelected({...selected, [e.target.name]: e.target.value})

    if (e.target.name === 'lastname') {
      if (e.target.value.length < MIN_FIO_LENGTH) {
        setErrorState({...errorState, lastnameErr: true})
      } else if (e.target.value.length >= MIN_FIO_LENGTH) {
        setErrorState({...errorState, lastnameErr: false})
      }
    }

    if (e.target.name === 'name') {
      if (e.target.value.length < MIN_FIO_LENGTH) {
        setErrorState({...errorState, nameErr: true})
      } else if (e.target.value.length >= MIN_FIO_LENGTH) {
        setErrorState({...errorState, nameErr: false})
      }
    }

    if (e.target.name === 'patronymic') {
      if (e.target.value.length < MIN_FIO_LENGTH) {
        setErrorState({...errorState, patronymicErr: true})
      } else if (e.target.value.length >= MIN_FIO_LENGTH) {
        setErrorState({...errorState, patronymicErr: false})
      }
    }

    if (e.target.name === 'sex') {
      if (e.target.value === '') {
        setErrorState({...errorState, sexErr: true})
      } else if (e.target.value !== '') {
        setErrorState({...errorState, sexErr: false})
      }
    }

    if (e.target.name === 'number') {
      if (e.target.value.length < MIN_NUMBER_LENGTH) {
        setErrorState({...errorState, numberErr: true})
      } else if (e.target.value.length >= MIN_NUMBER_LENGTH) {
        setErrorState({...errorState, numberErr: false})
      }
    }

    if (e.target.name === 'email') {
      if (!EMAIL_REGEXP.test(e.target.value)) {
        setErrorState({...errorState, emailErr: true})
      } else if (EMAIL_REGEXP.test(e.target.value)) {
        setErrorState({...errorState, emailErr: false})
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCloseModalEdit = () => {
    setSelected({...initialStateUserData})
    setErrorState({...initialStateError})
    setOpenMEdit(false)
  }

  const checkErrors = () => {
    return (errorState.sexErr || errorState.patronymicErr ||
            errorState.nameErr || errorState.numberErr ||
            errorState.emailErr || errorState.lastnameErr
    )
  }

  const handleSaveEdit = async () => {
    if (checkErrors()) {
      return
    }

    try {
      setLoading(true)

      if (userRole === 'GOVERNMENT') {
        await updateGovernmentProfile(selected)
      } else {
        await updateUserInfo(selected)
      }

      setOpenMEdit(false)

      await loadData()

      setMessage({
        text: 'Информация успешно обновлена!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setSelected({...initialStateUserData})
      setErrorState({...initialStateError})
      setLoading(false)
    }
  }

  const handleOnClickUpload = async (event) => {
    try {
      setLoading(true)

      event.preventDefault()

      const formData = new FormData()
      if (event.target.files[0]) {
        formData.append('image', event.target.files[0])
      }

      await uploadProfileImage(formData)
      await loadData()

      setMessage({
        text: 'Фотография успешно загружена',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setLoading(false)
      window.location.reload()
    }
  }

  const handleOnClickRemove = async () => {
    try {
      setLoading(true)

      await removeProfileImage(userData.photo[0].link)
      await loadData()

      setMessage({
        text: 'Фотография успешно удалена!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setLoading(false)
      window.location.reload()
    }
  }

  return (
    <Box>
      <Box className={styles.main}>
        <Box className={styles.box}>
          <Typography
            component='div'
            className={styles.title}
          >
            Профиль пользователя
          </Typography>
          <hr className={styles.hr}/>
        </Box>
        <Box className={styles.imgContainer}>
          {
            userRole !== 'GOVERNMENT'
            &&
            <Paper className={styles.paper}>
              <ProfileAvatar
                imgData={userData.img}
                uploadContent={handleOnClickUpload}
                handleOnClickRemove={handleOnClickRemove}
              />
            </Paper>
          }
          <Paper className={styles.paper}>
            <ProfileInfo
              info={fieldProps}
              printInfo={printInfo}
              handleOnClick={handleOnClick}
            />
          </Paper>
        </Box>
      </Box>
      <ModalEdit
        open={openMEdit}
        data={fieldProps}
        modalFields={printInfo}
        handleSave={handleSaveEdit}
        handleClose={handleCloseModalEdit}
      />
      <Loader open={loading}/>
      <Message
        visible={message.visible}
        text={message.text}
        handleClose={() => setMessage({...message, visible: !message.visible, text: ''})}
      />
    </Box>
  )
}

export default Profile