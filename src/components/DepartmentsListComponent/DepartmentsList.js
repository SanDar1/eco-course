import React, {useEffect, useState} from 'react';
import {Box, TableCell, TableRow, Typography} from "@mui/material";
import styles from './DepartmentsList.js.module.css'
import ModalEdit from "../../UI/Modal/ModalEdit/ModalEdit";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment
} from "../../services/AdminServices/DepartmentService";
import CustomButton from "../../UI/Inputs/CustomButton/CustomButton";
import {createTheme} from "@mui/material/styles";
import ModalAdd from "../../UI/Modal/ModalAdd/ModalAdd";
import {MIN_TEXT_LENGTH} from "../../etc/ViolationTests";
import CustomTextField from "../../UI/Inputs/CustomTextField/CustomTextField";
import ModalDelete from "../../UI/Modal/ModalDelete/ModalDelete";
import Message from "../../UI/Modal/MessageComponent/Message";
import CustomTable from "../../UI/CustomTable/CustomTable";

const headCells = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Наименование',
  },
]

const DepartmentsList = () => {
  const initialStateExtraOptions = {
    page: 0,
    size: 10
  }

  const initialStateDepartment = {
    id: '',
    name: '',
    latitudeOne: '',
    longitudeOne: '',
    latitudeTwo: '',
    longitudeTwo: '',
    latitudeThree: '',
    longitudeThree: '',
    latitudeFour: '',
    longitudeFour: ''
  }

  const initialStateError = {
    nameErr: false,
    latitudeOneErr: false,
    longitudeOneErr: false,
    latitudeTwoErr: false,
    longitudeTwoErr: false,
    latitudeThreeErr: false,
    longitudeThreeErr: false,
    latitudeFourErr: false,
    longitudeFourErr: false
  }

  const [departments, setDepartments] = useState([])
  const [selected, setSelected] = useState({...initialStateDepartment})
  const [errorState, setErrorState] = useState({...initialStateError})
  const [countRows, setCountRows] = useState(null)
  const [extraOptions, setExtraOptions] = useState({...initialStateExtraOptions})
  const [loading, setLoading] = useState(false)
  const [openMEdit, setOpenMEdit] = useState(false)
  const [openMAdd, setOpenMAdd] = useState(false)
  const [openMDelete, setOpenMDelete] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    visible: false
  })

  const loadData = async () => {
    setLoading(true)

    try {
      const resDeps = await getDepartments(extraOptions)
      setDepartments(resDeps.content)
      setCountRows(resDeps.count)
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [extraOptions])

  // Строки таблицы
  const tableRows = (handleClick, row, index) => {
    return (
      <TableRow
        hover
        onClick={() => handleClick(row, index)}
        tabIndex={-1}
        key={index}
      >
        <TableCell component="td" scope="row">{row.id}</TableCell>
        <TableCell component="td" scope="row">{row.name}</TableCell>
      </TableRow>
    )
  }

  const fieldsOnChange = (e) => {
    setSelected({...selected, [e.target.name]: e.target.value})

    if (e.target.name === 'name') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, nameErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, nameErr: false})
      }
    }

    if (e.target.name === 'latitudeOneErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeOneErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeOneErr: false})
      }
    }

    if (e.target.name === 'longitudeOneErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeOneErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeOneErr: false})
      }
    }

    if (e.target.name === 'latitudeTwoErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeTwoErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeTwoErr: false})
      }
    }

    if (e.target.name === 'longitudeTwoErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeTwoErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeTwoErr: false})
      }
    }

    if (e.target.name === 'latitudeThreeErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeThreeErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeThreeErr: false})
      }
    }

    if (e.target.name === 'longitudeThreeErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeThreeErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeThreeErr: false})
      }
    }

    if (e.target.name === 'latitudeFourErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeFourErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, latitudeFourErr: false})
      }
    }

    if (e.target.name === 'longitudeFourErr') {
      if (e.target.value.length < MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeFourErr: true})
      } else if (e.target.value.length >= MIN_TEXT_LENGTH) {
        setErrorState({...errorState, longitudeFourErr: false})
      }
    }
  }

  // Поля ввода
  const data = [
    openMEdit && {
      value: selected.id || '',
      label: 'ID',
      autoFocus: false,
      disabled: true,
      required: false,
      type: 'number',
    },
    {
      value: selected.name || '',
      label: 'Наименование',
      autoFocus: true,
      required: true,
      type: 'text',
      name: 'name',
      canError: errorState.nameErr,
      helperText: errorState.nameErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.latitudeOne || '',
      label: 'Широта 1',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'latitudeOne',
      canError: errorState.latitudeOneErr,
      helperText: errorState.latitudeOneErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.longitudeOne || '',
      label: 'Долгота 1',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'longitudeOne',
      canError: errorState.longitudeOneErr,
      helperText: errorState.longitudeOneErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.latitudeTwo || '',
      label: 'Широта 2',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'latitudeTwo',
      canError: errorState.latitudeTwoErr,
      helperText: errorState.latitudeTwoErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.longitudeTwo || '',
      label: 'Долгота 2',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'longitudeTwo',
      canError: errorState.longitudeTwoErr,
      helperText: errorState.longitudeTwoErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.latitudeThree || '',
      label: 'Широта 3',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'latitudeThree',
      canError: errorState.latitudeThreeErr,
      helperText: errorState.latitudeThreeErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.longitudeThree || '',
      label: 'Долгота 3',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'longitudeThree',
      canError: errorState.longitudeThreeErr,
      helperText: errorState.longitudeThreeErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.latitudeFour || '',
      label: 'Широта 4',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'latitudeFour',
      canError: errorState.latitudeFourErr,
      helperText: errorState.latitudeFourErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
    {
      value: selected.longitudeFour || '',
      label: 'Долгота 4',
      autoFocus: false,
      required: true,
      type: 'text',
      name: 'longitudeFour',
      canError: errorState.longitudeFourErr,
      helperText: errorState.longitudeFourErr ? "Поле не может быть пустым" : "",
      onChange: fieldsOnChange
    },
  ]

  // Поля модальных окон
  const modalFields = (data) => (
    <>
      {data.map((field, idx) =>
        <div key={idx} style={{display: 'flex', justifyContent: 'center'}}>
          {
            field
              ?
                <CustomTextField
                  name={field.name}
                  className={styles.modalTextField}
                  type={field.type}
                  autoFocus={field.autoFocus}
                  label={field.label}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  required={field.required}
                  error={field.canError}
                  helperText={field.helperText}
                  fullWidth
                />
              :
              <></>
          }
        </div>
      )}
      <ModalDelete
        text={'Вы действительно хотите удалить выбранную запись?'}
        open={openMDelete}
        handleClose={() => setOpenMDelete(false)}
        handleAccept={handleAcceptModalDelete}
      />
    </>
  )

  const checkErrors = () => {
    return errorState.nameErr
  }

  // Сохранение данных из модального окна
  const handleSaveEdit = async () => {
    if (checkErrors()) {
      return
    }

    try {
      setLoading(true)

      await updateDepartment(selected)
      await loadData()

      setMessage({
        text: 'Данные успешно обновлены!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setOpenMEdit(false)
      setSelected({...initialStateDepartment})
      setLoading(false)
    }
  }

  const handleSaveAdd = async () => {
    if (checkErrors()) {
      return
    }

    try {
      setLoading(true)

      await createDepartment(selected)

      setMessage({
        text: 'Данные успешно сохранены!',
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

  // Закрытие модального окна редактирования
  const handleCloseModal = () => {
    setOpenMEdit(false)
    setOpenMAdd(false)
    setSelected({...initialStateDepartment})
  }

  // Подтверждение нажатия в модальном окне удаления
  const handleAcceptModalDelete = async () => {
    try {
      setLoading(true)
      await deleteDepartment(selected.id)
      await loadData()

      setMessage({
        text: 'Удаление завершено!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setOpenMDelete(false)
      setOpenMEdit(false)
      setSelected({...initialStateDepartment})
      setLoading(false)
    }
  }

  return (
    <Box className={styles.box}>
      <Typography
        component='div'
        className={styles.title}
      >
        Регионы
      </Typography>
      <div>
        <CustomButton
          text={'Добавить'}
          style={{width: '25%'}}
          handleOnClick={() => setOpenMAdd(true)}
        />
      </div>
      <hr className={styles.hr}/>
      <CustomTable
        tRows={departments !== [] ? departments : []}
        countRows={countRows}
        tHeaders={headCells}
        setOpen={setOpenMEdit}
        setSelected={setSelected}
        tableRows={tableRows}
        loading={loading}
        extraOptions={extraOptions}
        setExtraOptions={setExtraOptions}
      />
      <ModalAdd
        open={openMAdd}
        data={data}
        modalFields={modalFields}
        handleSave={handleSaveAdd}
        handleClose={handleCloseModal}
        setEntity={setDepartments}
        selected={selected}
      />
      <ModalEdit
        open={openMEdit}
        data={data}
        modalFields={modalFields}
        handleSave={handleSaveEdit}
        handleClose={handleCloseModal}
        handleDelete={() => setOpenMDelete(true)}
      />
      <Message
        visible={message.visible}
        text={message.text}
        handleClose={() => setMessage({...message, visible: !message.visible, text: ''})}
      />
    </Box>
  );
};

export default DepartmentsList;