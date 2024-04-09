import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import {Typography} from "@mui/material";
import styles from './Drawer.module.css'
import {Link} from "react-router-dom";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const CustomDrawer = ({state, toggleDrawer, userRole}) => {
  const listItems = [
    {
      title: 'Главная',
      href: '/',
      visible: 'ADMIN,USER,GOVERNMENT'
    },
    {
      title: 'Зафиксированные нарушения',
      href: '/violation',
      visible: 'USER,GOVERNMENT'
    },
    {
      title: 'Пользователи',
      href: '/admin/users',
      visible: 'ADMIN'
    },
    {
      title: 'Управляющие',
      href: '/admin/governments',
      visible: 'ADMIN'
    },
    {
      title: 'Регионы',
      href: '/admin/departments',
      visible: 'ADMIN'
    },
  ]

  const list = (anchor) => (
    <Box
      className={styles.box}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography className={styles.menu}>Меню</Typography>
      <List>
        {listItems.map((item, index) => (
          item.visible.includes(userRole)
          ?
            <ListItem key={index}>
              <Link to={item.href} className={styles.link}>
                <ListItemButton>
                  <ListItemIcon>
                    {
                      item
                        ?
                        item.title === 'Пользователи' || item.title === 'Управляющие'
                          ?
                          <PersonIcon />
                          :
                          item.title === 'Главная'
                            ?
                            <ArticleIcon />
                            :
                            item.title === 'Зафиксированные нарушения'
                            ?
                              <CollectionsBookmarkIcon />
                              :
                              item.title === 'Регионы'
                                ?
                                <GpsFixedIcon />
                                :
                                <></>
                        :
                        <></>
                    }
                  </ListItemIcon>
                  <ListItemText primary={item.title} disableTypography/>
                </ListItemButton>
              </Link>
            </ListItem>
            :
            <React.Fragment key={index} />
        ))}
      </List>
      <Divider/>
    </Box>
  );

  return (
    <React.Fragment key={'left'}>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </React.Fragment>
  );
};

export default CustomDrawer;