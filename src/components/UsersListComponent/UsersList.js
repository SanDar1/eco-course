import React, {useEffect, useState} from 'react';
import {Box, Checkbox, TableCell, TableRow, TextField, Typography} from "@mui/material";
import styles from './UsersList.module.css'
import CustomTable from "../../UI/CustomTable/CustomTable";
import {banUser, deleteUser, getUsers} from "../../services/AdminServices/UserService";
import ModalEdit from "../../UI/Modal/ModalEdit/ModalEdit";
import Message from "../../UI/Modal/MessageComponent/Message";
import ModalDelete from "../../UI/Modal/ModalDelete/ModalDelete";

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
    id: 'isBanned',
    label: 'Статус',
  },
]

const UsersList = () => {
  const initialStateExtraOptions = {
    page: 0,
    size: 10
  }

  const initialStateUser = {
    id: '',
    email: '',
    isBanned: false
  }

  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState({...initialStateUser})
  const [countRows, setCountRows] = useState(null)
  const [extraOptions, setExtraOptions] = useState({...initialStateExtraOptions})
  const [loading, setLoading] = useState(false)
  const [openMEdit, setOpenMEdit] = useState(false)
  const [openMDelete, setOpenMDelete] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    visible: false
  })

  const loadData = async () => {
    setLoading(true)

    try {
      const resUsers = await getUsers(extraOptions)

      setUsers(resUsers.content)
      setCountRows(resUsers.count)
    } catch (e) {
      setMessage({
        text: e.response.data.message,
        visible: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
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
        <TableCell
          component="td"
          scope="row"
        >
          {row.id}
        </TableCell>
        <TableCell
          component="td"
          scope="row"
        >
          {row.email}
        </TableCell>
        <TableCell
          component="td"
          scope="row"
        >
          <div className={row.isBanned ? styles.banned : styles.notBanned}>
            {row.isBanned ? 'Доступ запрещён' : 'Доступ разрешен'}
          </div>
        </TableCell>
      </TableRow>
    )
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
      name: 'email'
    },
    {
      name: 'isBanned',
      value: selected.isBanned,
      label: 'Ограничить доступ',
      onChange: () => setSelected({...selected, isBanned: !selected.isBanned}),
      checked: selected?.isBanned,
      color: 'green'
    }
  ]

  // Подтверждение нажатия в модальном окне удаления
  const handleAcceptModalDelete = async () => {
    try {
      setLoading(true)
      await deleteUser(selected.id)
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
      setSelected({...initialStateUser})
      setLoading(false)
    }
  }

  // Поля модальных окон
  const modalFields = (data) => (
    <>
      {data.map((field, idx) =>
        <div key={idx} style={{display: 'flex', justifyContent: 'center'}}>
          {
            field
              ?
              field.name === 'isBanned'
                ?
                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                  <Checkbox
                    name={field.name}
                    value={field.value}
                    checked={field?.checked}
                    onChange={field.onChange}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  />
                  <Typography>{field.label}</Typography>
                </div>
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
      <ModalDelete
        text={'Вы действительно хотите удалить выбранную запись?'}
        open={openMDelete}
        handleClose={() => setOpenMDelete(false)}
        handleAccept={handleAcceptModalDelete}
      />
    </>
  )

  // Сохранение данных из модального окна
  const handleSaveEdit = async () => {
    try {
      await banUser(selected.id, selected.isBanned)

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
      setSelected({...initialStateUser})
    }
  }

  // Закрытие модального окна редактирования
  const handleCloseModalEdit = () => {
    setOpenMEdit(false)
    setSelected({...initialStateUser})
  }

  return (
    <Box className={styles.box}>
      <Typography
        component='div'
        className={styles.title}
      >
        Пользователи
      </Typography>
      <hr className={styles.hr}/>
      <CustomTable
        tRows={users !== [] ? users : []}
        countRows={countRows}
        tHeaders={headCells}
        setEntity={setUsers}
        setOpen={setOpenMEdit}
        setSelected={setSelected}
        tableRows={tableRows}
        loading={loading}
        extraOptions={extraOptions}
        setExtraOptions={setExtraOptions}
      />
      <ModalEdit
        open={openMEdit}
        data={data}
        modalFields={modalFields}
        handleSave={handleSaveEdit}
        handleClose={handleCloseModalEdit}
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

export default UsersList;