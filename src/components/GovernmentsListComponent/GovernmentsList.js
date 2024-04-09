import React, {useEffect, useMemo, useState} from 'react';

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import CustomTable from "../../UI/CustomTable/CustomTable";
import {
  activateGovernment, addGovernment,
  getDepartmentById,
  getGovernments,
  setDepartment,
  unsetDepartment
} from "../../services/AdminServices/GovernmentService";
import ModalEdit from "../../UI/Modal/ModalEdit/ModalEdit";
import ModalDialog from "../../UI/Modal/ModalDialog/ModalDialog";
import CustomTextField from "../../UI/Inputs/CustomTextField/CustomTextField";
import {getDepartments} from "../../services/AdminServices/DepartmentService";
import Message from "../../UI/Modal/MessageComponent/Message";
import CustomButton from "../../UI/Inputs/CustomButton/CustomButton";
import ModalAdd from "../../UI/Modal/ModalAdd/ModalAdd";
import {MIN_FIO_LENGTH, MIN_NUMBER_LENGTH} from "../../etc/ProfileTests";
import {EMAIL_REGEXP, MIN_PASSWORD_LENGTH} from "../../etc/AuthTests";

import {AddressSuggestions} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import styles from './GovernmentsList.module.css'

const headCells = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'login',
    label: 'Email',
  },
  {
    id: 'isActivated',
    label: 'Статус',
  },
]

const GovernmentsList = () => {
  const initialStateExtraOptions = {
    page: 0,
    size: 10
  }

  const initialStateGovernment = {
    id: '',
    email: '',
    password: '',
    lastname: '',
    name: '',
    patronymic: '',
    number: '',
    sex: '',
    isActivated: true
  }

  const initialStateError = {
    lastnameErr: false,
    nameErr: false,
    patronymicErr: false,
    numberErr: false,
    sexErr: false,
    emailErr: false,
    passwordErr: false,
    depErr: false,
  }

  const [governments, setGovernments] = useState([])
  const [departments, setDepartments] = useState([])
  const [selected, setSelected] = useState({...initialStateGovernment})
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [countRows, setCountRows] = useState(null)
  const [extraOptions, setExtraOptions] = useState({...initialStateExtraOptions})
  const [loading, setLoading] = useState(false)
  const [openMEdit, setOpenMEdit] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    visible: false
  })
  const [selectedDepartmentList, setSelectedDepartmentList] = useState(true)
  const [openMAdd, setOpenMAdd] = useState(false)
  const [errorState, setErrorState] = useState({...initialStateError})

  const loadData = async () => {
    setLoading(true)

    try {
      const resGovernment = await getGovernments(extraOptions)

      for (const gov of resGovernment?.content) {
        if (gov.departmentId) {
          try {
            gov.departmentObj = await getDepartmentById(parseInt(gov.departmentId))
          } catch (e) {
            console.log(e)
          }
        }
      }

      setGovernments(resGovernment.content)
      setCountRows(resGovernment.count)

      const resDeps = await getDepartments(extraOptions)
      setDepartments(resDeps.content)
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
        <TableCell component="td" scope="row">{row.email}</TableCell>
        <TableCell
          component="td"
          scope="row"
        >
          <div className={row.isActivated ? styles.activated : styles.notActivated}>
            {row.isActivated ? 'Активирован' : 'Не активирован'}
          </div>
        </TableCell>
      </TableRow>
    )
  }

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

    if (e.target.name === 'password') {
      if (e.target.value.length < MIN_PASSWORD_LENGTH) {
        setErrorState({...errorState, passwordErr: true})
      } else if (e.target.value.length >= MIN_PASSWORD_LENGTH) {
        setErrorState({...errorState, passwordErr: false})
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
      value: selected.email || '',
      label: 'Почта',
      autoFocus: true,
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'email',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.emailErr,
      helperText: !openMEdit && (errorState.emailErr ? "Невалидный email" : ""),
    },
    !openMEdit && {
      value: selected.password || '',
      label: 'Пароль',
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'password',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.passwordErr,
      helperText: !openMEdit && (errorState.passwordErr ? `Длина пароля должна быть не менее ${MIN_PASSWORD_LENGTH} символов` : ""),
    },
    !openMEdit && {
      value: selected.lastname || '',
      label: 'Фамилия',
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'lastname',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.lastnameErr,
      helperText: !openMEdit && (errorState.lastnameErr ? "Данное поле не может быть пустым" : ""),
    },
    !openMEdit && {
      value: selected.name || '',
      label: 'Имя',
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'name',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.nameErr,
      helperText: !openMEdit && (errorState.nameErr ? "Данное поле не может быть пустым" : ""),
    },
    !openMEdit && {
      value: selected.patronymic || '',
      label: 'Отчество',
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'patronymic',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.patronymicErr,
      helperText: !openMEdit && (errorState.patronymicErr ? "Данное поле не может быть пустым" : ""),
    },
    !openMEdit && {
      value: selected.number || '',
      label: 'Номер телефона',
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'number',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.numberErr,
      helperText: !openMEdit && (errorState.numberErr ? "Невалидный номер телефона" : ""),
    },
    !openMEdit && {
      value: selected.sex || '',
      label: 'Пол',
      disabled: openMEdit,
      required: !openMEdit,
      type: 'text',
      name: 'sex',
      onChange: e => fieldsOnChange(e),
      canError: !openMEdit && errorState.sexErr,
      helperText: !openMEdit && (errorState.sexErr ? "Это поле обязательно" : ""),
    },
    !openMAdd && {
      name: 'isActivated',
      value: selected.isActivated,
      label: 'Активирован',
      onChange: () => setSelected({...selected, isActivated: !selected.isActivated}),
      checked: selected?.isActivated,
      color: 'green'
    }
  ]

  const [openMDialog, setOpenMDialog] = useState(false)

  // Открытие модального окна прав доступа
  const handleOpenModalDialog = () => {
    setSelectedDepartment(selected.departmentObj)
    setOpenMDialog(true)
  }

  // Закрытие модального окна прав доступа
  const handleCloseModalDialog = () => {
    setSelectedDepartment(null)
    setOpenMDialog(false)
  }

  const checkErrors = () => {
    setErrorState({
      sexErr: selected.sex.length < 1,
      patronymicErr: selected.patronymic.length < 1,
      nameErr: selected.name.length < 1,
      numberErr: selected.number.length < 1,
      emailErr: selected.email.length < 1,
      lastnameErr: selected.lastname.length < 1,
    })

    return (errorState.sexErr || errorState.patronymicErr ||
      errorState.nameErr || errorState.numberErr ||
      errorState.emailErr || errorState.lastnameErr ||
      errorState.passwordErr
    )
  }

  const handleSaveModalDialog = () => {
    if (selectedDepartmentList) {
      setSelected({
        ...selected,
        department: selectedDepartment ? selectedDepartment.id : null,
        departmentObj: selectedDepartment ? selectedDepartment : null
      })
    } else {
      setSelected({
        ...selected,
        department: selectedDepartment ? selectedDepartment.id : null,
        departmentObj: selectedDepartment ? selectedDepartment : null
      })
    }
    console.log(selectedDepartment)
    setSelectedDepartment(null)
    setOpenMDialog(false)
  }

  const dialogFields = useMemo(() => {
    return (
      <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Box style={{display: 'flex', alignItems: 'center', width: '100%', padding: '3%'}}>
          <Checkbox
            name={'selectedDepartmentList'}
            value={selectedDepartmentList}
            checked={selectedDepartmentList}
            onChange={() => setSelectedDepartmentList(prevState => {
              return !prevState
            })}
            sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
          />
          <Typography>Регион из списка "Регионы"</Typography>
        </Box>
        {selectedDepartmentList
          ?
          <Autocomplete
            options={departments}
            getOptionLabel={(dep) => dep.name || ''}
            value={selectedDepartment || null}
            // onChange={(_, newDep) => console.log(newDep)}
            onChange={(_, newDep) => setSelectedDepartment(newDep)}
            style={{width: '50vh'}}
            renderInput={(params) =>
              <CustomTextField
                {...params}
                label="Выберите регион..."
                variant="outlined"
              />}
          />
          :
          <AddressSuggestions
            token="6bab1cf273d9c02e91f5d5712a54ea5a581e33d4"
            value={selectedDepartment || null}
            onChange={setSelectedDepartment}
            containerClassName={styles.dadataDep}
          />
        }
      </Box>
    )
  }, [selected, selectedDepartment, selectedDepartmentList])

  // Поля модальных окон
  const modalFields = (data) => (
    <>
      {data.map((field, idx) =>
        <div key={idx} style={{display: 'flex', justifyContent: 'center'}}>
          {
            field
              ?
              field.name === 'isActivated'
                ?
                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                  <Checkbox
                    name={field.name}
                    value={field.value}
                    checked={field?.checked}
                    onChange={field.onChange}
                    sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
                  />
                  <Typography>{field.label}</Typography>
                </div>
                :
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
                    <TextField
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
      <ModalDialog
        handleOpen={handleOpenModalDialog}
        handleClose={handleCloseModalDialog}
        handleSave={handleSaveModalDialog}
        open={openMDialog}
        text={'Регион'}
        dialogFields={dialogFields}
      />
    </>
  )

  // Сохранение данных из модального окна
  const handleSaveEdit = async () => {
    try {
      await activateGovernment(selected.id, selected.isActivated)

      if (selected.department) {
        await setDepartment(selected.id, selected.department)
      } else {
        await unsetDepartment(selected.id)
      }

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
      setSelected({...initialStateGovernment})
    }
  }

  const handleSaveAdd = async () => {
    if (checkErrors()) {
      return
    }

    try {
      await addGovernment(selected)

      if (selected.department) {
        await setDepartment(selected.id, selected.department)
      } else {
        await unsetDepartment(selected.id)
      }

      await loadData()

      setMessage({
        text: 'Госслужащий добавлен!',
        visible: true,
      })
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setOpenMAdd(false)
      setSelected({...initialStateGovernment})
      setErrorState({...initialStateError})
    }
  }

  // Закрытие модального окна редактирования
  const handleCloseModalEdit = () => {
    setOpenMEdit(false)
    setSelected({...initialStateGovernment})
  }
  const handleCloseModalAdd = () => {
    setOpenMAdd(false)
    setSelected({...initialStateGovernment})
  }

  return (
    <Box className={styles.box}>
      <Typography
        component='div'
        className={styles.title}
      >
        Управляющие
      </Typography>
      <hr className={styles.hr}/>
      <CustomButton
        text={'Создать запись'}
        handleOnClick={() => setOpenMAdd(true)}
      />
      <CustomTable
        tRows={governments !== [] ? governments : []}
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
        handleClose={handleCloseModalAdd}
        setEntity={setGovernments}
        selected={selected}
      />
      <ModalEdit
        open={openMEdit}
        data={data}
        modalFields={modalFields}
        handleSave={handleSaveEdit}
        handleClose={handleCloseModalEdit}
      />
      <Message
        visible={message.visible}
        text={message.text}
        handleClose={() => setMessage({...message, visible: !message.visible, text: ''})}
      />
    </Box>
  );
};

export default GovernmentsList;