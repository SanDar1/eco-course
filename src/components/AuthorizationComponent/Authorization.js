import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

import {Paper} from "@mui/material";
import CustomButton from "../../UI/Inputs/CustomButton/CustomButton";
import InputFields from "./InputFieldsComponent/InputFields";
import {logIn, register} from "../../services/AuthService";
import Loader from "../../UI/Loader/Loader";
import Message from "../../UI/Modal/MessageComponent/Message";
import {EMAIL_REGEXP, MIN_PASSWORD_LENGTH} from "../../etc/AuthTests";
import {
  ADMIN_LOGIN_ROUTE,
  ADMIN_REGISTER_ROUTE,
  GOVERNMENT_LOGIN_ROUTE,
  GOVERNMENT_REGISTER_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTER_ROUTE
} from "../../utils/consts";

import styles from "./Authorization.module.css";

const Authorization = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.includes('admin')
  const isGovernment = location.pathname.includes('government')
  const isLogin = location.pathname.includes('login')

  let initialStateData
  let initialStateError

  if (isLogin) {
    initialStateData = {
      email: '',
      password: '',
      role: isAdmin ? 'ADMIN' : isGovernment ? 'GOVERNMENT' : 'USER'
    }

    initialStateError = {
      emailErr: false,
      passwordErr: false,
    }
  } else {
    initialStateData = {
      email: '',
      password: '',
      passwordRepeat: '',
      role: isAdmin ? 'ADMIN' : isGovernment ? 'GOVERNMENT' : 'USER'
    }

    initialStateError = {
      emailErr: false,
      passwordErr: false,
      passwordRepeatErr: false,
    }
  }

  const [inputData, setInputData] = useState({...initialStateData})
  const [errorState, setErrorState] = useState({...initialStateError})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    visible: false
  })

  const changePage = () => {
    setInputData({...initialStateData})
    setErrorState({...initialStateError})
  }

  const fieldsOnChange = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value})

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

    if (!isLogin) {
      if (e.target.name === 'passwordRepeat') {
        if (e.target.value !== inputData.password) {
          setErrorState({...errorState, passwordRepeatErr: true})
        } else if (e.target.value === inputData.password) {
          setErrorState({...errorState, passwordRepeatErr: false})
        }
      }
    }
  }

  // Проверка на наличие ошибок при нажатии на кнопку
  const checkErrors = () => {
    if (isLogin) {
      setErrorState({
        emailErr: !EMAIL_REGEXP.test(inputData.email)
      })

      return !EMAIL_REGEXP.test(inputData.email)
    } else {
      setErrorState({
        emailErr: !EMAIL_REGEXP.test(inputData.email),
        passwordErr: inputData.password.length < MIN_PASSWORD_LENGTH,
        passwordRepeatErr: inputData.passwordRepeat !== inputData.password,
      })

      return !EMAIL_REGEXP.test(inputData.email) ||
        inputData.password.length < MIN_PASSWORD_LENGTH ||
        inputData.passwordRepeat !== inputData.password;
    }
  }

  const handleClick = async () => {
    if (checkErrors()) {
      return
    }

    try {
      setLoading(true)

      if (isLogin) {
        const data = await logIn(inputData)

        if (inputData.role === 'USER') {
          window.location.href = `https://t.me/EcoProjBot?start=${data.token}`
        } else {
          window.location.href = MAIN_ROUTE
        }
      } else {
        await register(inputData)

        setMessage({
          text:
            isGovernment
              ?
              'Для подтверждения регистрации перейдите по ссылке в письме, отправленном на вашу почту и дождитесь подтверждения вашей учётной записи'
              :
              'Для подтверждения регистрации перейдите по ссылке в письме, отправленном на вашу почту',
          visible: true
        })

        changePage()

        if (isAdmin) {
          navigate(ADMIN_LOGIN_ROUTE)
        } else if (isGovernment) {
          navigate(GOVERNMENT_LOGIN_ROUTE)
        } else {
          navigate(LOGIN_ROUTE)
        }
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

  let fieldProps

  if (isLogin) {
    fieldProps = [
      {
        name: 'email',
        type: 'email',
        value: inputData.email,
        label: 'Логин',
        canError: errorState.emailErr,
        helperText: errorState.emailErr ? "Невалидный email" : "",
        className: styles.inputField,
        onChange: e => fieldsOnChange(e)
      },
      {
        name: 'password',
        type: 'password',
        value: inputData.password,
        label: 'Пароль',
        className: styles.inputField,
        onChange: e => fieldsOnChange(e)
      },
      {
        name: 'buttonLogin',
        text: 'Войти',
        handleOnClick: handleClick
      },
    ]
  } else {
    fieldProps = [
      {
        name: 'email',
        type: 'email',
        value: inputData.email,
        label: 'Логин',
        canError: errorState.emailErr,
        helperText: errorState.emailErr ? "Невалидный email" : "Введите адрес вашей электронной почты",
        className: styles.inputField,
        onChange: e => fieldsOnChange(e)
      },
      {
        name: 'password',
        type: 'password',
        value: inputData.password,
        label: 'Пароль',
        canError: errorState.passwordErr,
        helperText: errorState.passwordErr ? `Длина пароля должна быть не менее ${MIN_PASSWORD_LENGTH} символов` : "Придумайте пароль",
        className: styles.inputField,
        onChange: e => fieldsOnChange(e)
      },
      {
        name: 'passwordRepeat',
        type: 'password',
        value: inputData.passwordRepeat,
        label: 'Повторите пароль',
        canError: errorState.passwordRepeatErr,
        helperText: errorState.passwordRepeatErr ? "Введённые пароли не совпадают" : "",
        className: styles.inputField,
        onChange: e => fieldsOnChange(e)
      },
      {
        name: 'buttonLogin',
        text: 'Зарегистрироваться',
        handleOnClick: handleClick
      },
    ]
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.boxInner}>
          <Paper elevation={3} className={styles.paper}>
            {
              isAdmin || isGovernment
                ?
                <Paper elevation={1} className={styles.paperAdmin}>
                  <p className={styles.enter}>{isAdmin ? 'Администратор' : 'Управление'}</p>
                </Paper>
                :
                <></>
            }
            <p className={styles.enter}>
              {
                isLogin
                  ?
                  'Вход'
                  :
                  'Регистрация'
              }
            </p>
            <InputFields fieldProps={fieldProps ? fieldProps : []}/>
            <p className={styles.question}>
              {
                isLogin
                  ?
                  'Ещё нет аккаунта?'
                  :
                  'Уже есть аккаунт?'
              }
            </p>
            <div>
              {
                <Link to={
                  isLogin
                    ?
                    (isAdmin ? ADMIN_REGISTER_ROUTE : isGovernment ? GOVERNMENT_REGISTER_ROUTE : REGISTER_ROUTE)
                    :
                    (isAdmin ? ADMIN_LOGIN_ROUTE : isGovernment ? GOVERNMENT_LOGIN_ROUTE : LOGIN_ROUTE)}
                      className={styles.link}>
                  <CustomButton
                    text={isLogin ? 'Зарегистрироваться' : 'Войти'}
                    style={{width: '45%'}}
                    handleOnClick={changePage}
                  />
                </Link>
              }
            </div>
          </Paper>
        </div>
      </div>
      <Message
        visible={message.visible}
        handleClose={() => setMessage({...message, visible: !message.visible})}
        text={message.text}
      />
      <Loader open={loading}/>
    </>
  );
};

export default Authorization;