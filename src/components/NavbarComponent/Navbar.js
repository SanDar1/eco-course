import React, {useEffect, useMemo, useState} from 'react';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CustomDrawer from "../DrawerComponent/Drawer";
import styles from './Navbar.module.css'
import {logOut} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import {USER_PROFILE} from "../../utils/consts";
import {getUserInfo} from "../../services/UserServices/ProfileService";
import ProfileImageItem from "../ProfileComponent/ProfileImageItem";

const Navbar = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRole, setUserRole] = useState('')
  const [openDrawer, setOpenDrawer] = useState({
    left: false,
  });
  const [source, setSource] = useState(null)

  const loadData = async () => {
    if (JSON.parse(localStorage.getItem('userData')).role === 'USER') {
      try {
        let res = await getUserInfo()

        if (Object.keys(res.photo).length > 0) {
          res.source = <ProfileImageItem uploadURL={res.photo[0].link} forNav={true} />
          setSource(res.source)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const checkPermissions = () => {
    if (localStorage.getItem('userData')) {
      setUserRole(JSON.parse(localStorage.getItem('userData')).role)
    } else {
      setUserRole('USER')
    }
  }

  useMemo(() => {
    checkPermissions()
  }, [openDrawer])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer({...openDrawer, [anchor]: open});
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose()
    navigate(USER_PROFILE)
  }

  const logOutHandler = async () => {
    await logOut()
  }

  return (
    <Box>
      <AppBar position="static" sx={{backgroundColor: '#007a80'}} className={styles.box}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h4" component="div" className={styles.text}>
            Экологический проект
          </Typography>
          <CustomDrawer
            state={openDrawer}
            setState={setOpenDrawer}
            toggleDrawer={toggleDrawer}
            userRole={userRole}
          />
          <div>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              {
                source
                ?
                  source
                  :
                  <Avatar />
              }
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                (userRole === 'USER' || userRole === 'GOVERNMENT')
                &&
                <MenuItem onClick={handleProfile}>Профиль</MenuItem>
              }
              <MenuItem onClick={logOutHandler}>Выйти</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default Navbar;