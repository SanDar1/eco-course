import React, {useEffect, useMemo, useState} from 'react';

import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';

import Loader from "../../UI/Loader/Loader";
import ViolationImageItem from "./ViolationImageItem";
import Instruction from "./Instruction";
import Message from "../../UI/Modal/MessageComponent/Message";
import MapComponent from "../MapComponent/MapComponent";
import CustomTextField from "../../UI/Inputs/CustomTextField/CustomTextField";
import CustomButton from "../../UI/Inputs/CustomButton/CustomButton";
import ViolationList from "./ViolationItems/ViolationList";
import ModalEdit from "../../UI/Modal/ModalEdit/ModalEdit";
import ModalAdd from "../../UI/Modal/ModalAdd/ModalAdd";
import {MIN_TEXT_LENGTH} from "../../etc/ViolationTests";
import {addViolation, getViolations} from "../../services/UserServices/ViolationService";
import {
  changeGarbageClass,
  changeViolationStatus,
  getGovViolations
} from "../../services/GovernmentServices/GovernmentViolationService";


import styles from "./Violation.module.css";


const Violation = () => {
  const initialStateData = {
    name: '',
    violationStatus: '',
    description: '',
    latitude: '',
    longitude: '',
    file: null
  }

  const initialStateError = {
    nameErr: true,
    descErr: true,
    fileErr: true
  }

  const [violations, setViolations] = useState([])
  const [userRole, setUserRole] = useState('')
  const [selected, setSelected] = useState({...initialStateData})
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  })
  const [errorState, setErrorState] = useState({...initialStateError})
  const [openMAdd, setOpenMAdd] = useState(false)
  const [openMEdit, setOpenMEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    visible: false
  })

  const loadData = async () => {
    if (JSON.parse(localStorage.getItem('userData')).role === 'GOVERNMENT') {
      setUserRole('GOVERNMENT')

      setLoading(true)

      try {
        // const res = await getGovViolations()
        const res = [
          {
            id: 1,
            isPrint: true,
            name: 'Violation name',
            description: 'ООО ПК-ТЕКСИ оказывает услуги по поверке манометров и термометров, а так же других средств измерений в соответствии с областью аккредитации на поверку СИ в',
            violationStatus: 'waiting',
            img: <ViolationImageItem />
          },
          {
            id: 2,
            isPrint: true,
            name: 'Violation name',
            description: 'ООО ПК-ТЕКСИ оказывает услуги по поверке манометров и термометров, а так же других средств измерений в соответствии с областью аккредитации на поверку СИ в',
            violationStatus: 'waiting'
          },
          {
            id: 3,
            isPrint: true,
            name: 'Violation name',
            description: 'ООО ПК-ТЕКСИ оказывает услуги по поверке манометров и термометров, а так же других средств измерений в соответствии с областью аккредитации на поверку СИ в',
            violationStatus: 'waiting'
          }
        ]

        /*for (const el of res) {
          el.isPrint = false

          if (el.file[0] !== undefined) {
            el.img = <ViolationImageItem uploadURL={el.file[0].link} />
            el.isPrint = true
          }
        }*/
        setViolations(res)
      } catch (e) {
        setMessage({
          text: e.response.data.message,
          visible: true,
        })
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(true)

      try {
        const res = await getViolations()

        for (const el of res) {
          el.isPrint = false

          if (el.file[0] !== undefined) {
            el.img = <ViolationImageItem uploadURL={el.file[0].link} />
            el.isPrint = true
          }
        }

        setViolations(res)
      } catch (e) {
        setMessage({
          text: e.response.data.message,
          visible: true,
        })
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const fieldsOnChange = (e) => {
    setSelected({...selected, [e.target.name]: e.target.value})

    if (e.target.name === 'name') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, nameErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, nameErr: false})
      }
    }

    if (e.target.name === 'description') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, descErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, descErr: false})
      }
    }
  }

  const fieldProps = [
    {
      name: 'name',
      autofocus: true,
      required: true,
      type: 'text',
      value: selected.name,
      label: 'Заголовок',
      canError: errorState.nameErr && !openMEdit,
      helperText: (errorState.nameErr  && !openMEdit) ? "Поле не может быть пустым" : "",
      className: styles.inputField,
      onChange: e => fieldsOnChange(e),
      multiline: false,
      disabled: openMEdit
    },
    {
      name: 'description',
      autofocus: true,
      required: true,
      type: 'text',
      value: selected.description,
      label: 'Описание',
      canError: errorState.descErr && !openMEdit,
      helperText: (errorState.descErr && !openMEdit) ? "Поле не может быть пустым" : "",
      className: styles.inputField,
      onChange: e => fieldsOnChange(e),
      multiline: true,
      disabled: openMEdit
    },
  ]

  // ====== Категории мусора ======
  const category = 'Промышленные отходы'
  const [categoryStatus, setCategoryStatus] = useState(-1)
  const [formHelperText, setFormHelperText] = useState({
    text: '',
    error: false
  })

  const messageFormHelperText = {
    text: '',
    error: false
  }

  const errorMessageFormHelperText = {
    text: 'Подтвердите/отклоните категорию перед подтверждением/отклонением нарушения',
    error: true
  }

  const handleChangeCategory = async (event) => {
    setCategoryStatus(event.target.value)
    try {
      await changeGarbageClass(selected.id, event.target.value)
    } catch (e) {
      setMessage({
        text: e.message,
        visible: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useMemo(() => {
    if (categoryStatus === -1) {
      setFormHelperText({...errorMessageFormHelperText})
    } else {
      setFormHelperText({...messageFormHelperText})
    }
  }, [categoryStatus])
  // ====== Категории мусора ======

  const changeStatus = async (status) => {
    if (categoryStatus === -1) {
      return
    }

    try {
      setLoading(true)

      await changeViolationStatus(selected.id, status)

      await loadData()

      setMessage({
        text: 'Статус нарушения успешно изменён!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      handleCloseModal()
      await loadData()
      setLoading(false)
    }
  }

  const extraGovFields = {
    categoryProps: {
      category: category,
      categoryStatus: categoryStatus,
      handleChangeCategory: handleChangeCategory,
      formHelperText: formHelperText
    },
    buttonsProps: [
      {
        text: 'Подтвердить нарушение',
        visible: selected?.violationStatus === 'waiting',
        onClick: () => changeStatus('accepted'),
      },
      {
        text: 'Отклонить нарушение',
        visible: selected?.violationStatus === 'waiting',
        onClick: () => changeStatus('rejected'),
      },
    ]
  }

  const uploadContent = (event) => {
    event.preventDefault()
    if (event.target.files[0]) {
      setSelected({
        ...selected,
        file: event.target.files[0]
      })
    }
  }

  const removeImg = () => {
    setSelected({
      ...selected,
      file: null
    })
  }

  const modalFields = (data) => (
    <>
      {data.map(field => (
        field
          ?
          <CustomTextField
            key={field.name}
            name={field.name}
            className={styles.modalTextField}
            type={field.type}
            autoFocus={field.autoFocus}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            error={field.canError}
            helperText={field.helperText}
            fullWidth
            multiline={field.multiline}
            rows={5}
            disabled={field.disabled}
          />
          :
          <></>
      ))}
      {!openMEdit
        &&
        <div>
          <div className={styles.modalPhotoDiv}>
            <Typography className={styles.instructTxt}>Прикрепить фотографию</Typography>
            <Tooltip className={styles.instructTxt} title="Нажмите, чтобы прикрепить фотографию">
              <IconButton color="success" aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  multiple={true}
                  max={1}
                  onChange={uploadContent}
                />
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </div>
          <div className={styles.modalPhotoDiv}>
          {
            selected.file
              ?
              <>
                <Typography className={styles.imgFileDiv}>
                  {selected.file?.name}
                </Typography>
                <Tooltip className={styles.instructTxt} title="Нажмите, чтобы открепить фотографию">
                  <IconButton color="success" component="label" onClick={removeImg}>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </>
              :
              <>
                <Typography className={styles.imgFileDivErr}>
                  Пожалуйста, прикрепите фотографию
                </Typography>
              </>
          }
          </div>
        </div>
      }
    </>
  )

  const handleCloseModal = () => {
    setSelected({...initialStateData})
    setErrorState({...initialStateError})

    if (openMEdit) {
      setOpenMEdit(false)
    } else {
      setOpenMAdd(false)
    }
  }

  const checkErrors = () => {
    if (selected.file === null) {
      setErrorState({
        ...errorState,
        fileErr: true
      })
    } else {
      setErrorState({
        ...errorState,
        fileErr: false
      })
    }

    return errorState.fileErr || errorState.descErr || errorState.nameErr
  }

  const handleSaveAdd = async () => {
    if (checkErrors()) {
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', selected.file)

      await addViolation(selected, formData, coords.latitude.toString(), coords.longitude.toString())

      setMessage({
        text: 'Нарушение успешно загружено и принято в обработку!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      handleCloseModal()
      await loadData()
      setLoading(false)
      setCoords({...coords, latitude: null, longitude: null})
    }
  }

  const handleOpenMAdd = () => {
    if (coords.longitude && coords.latitude) {
      setOpenMAdd(true)
    } else {
      setMessage({
        text: 'Для добавления информации необходимо отметить нарушение на карте!',
        visible: true,
      })
    }
  }

  const customStyleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <>
      <Box className={styles.box}>
        <Typography
          component='div'
          className={styles.title}
        >
          Зафиксированные нарушения
        </Typography>
        {
          userRole !== 'GOVERNMENT'
          &&
          <>
            <div className={styles.mapInstructDiv}>
              <div className={styles.mapDiv}>
                <MapComponent
                  coords={coords}
                  setCoords={setCoords}
                />
              </div>
              <div className={styles.instructDiv}>
                <Instruction />
                <div className={styles.buttonDiv}>
                  <CustomButton
                    text={'Добавить'}
                    handleOnClick={handleOpenMAdd}
                  />
                </div>
              </div>
            </div>
          </>
        }
        <hr className={styles.hr}/>
        <ViolationList
          data={violations}
          entity={selected}
          setEntity={setSelected}
          setOpenMEdit={setOpenMEdit}
        />
      </Box>
      <ModalAdd
        open={openMAdd}
        data={fieldProps}
        modalFields={modalFields}
        handleSave={handleSaveAdd}
        handleClose={handleCloseModal}
        setEntity={setViolations}
        selected={selected}
      />
      <ModalEdit
        open={openMEdit}
        data={fieldProps}
        modalFields={modalFields}
        handleClose={handleCloseModal}
        extraParams={true}
        customStyle={customStyleModal}
        img={selected?.img}
        extraGovFields={extraGovFields}
        roleGov={userRole === 'GOVERNMENT'}
      />
      <Loader open={loading}/>
      <Message
        visible={message.visible}
        text={message.text}
        handleClose={() => setMessage({...message, visible: !message.visible, text: ''})}
      />
    </>
  );
};

export default Violation;