import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import styles from '../Violation.module.css'

const ViolationList = ({ data = null, setEntity, setOpenMEdit }) => {
  const handleClick = (el) => {
    setEntity(prev => {
      return {
        ...prev,
        id: el.id,
        name: el.name,
        description: el.description,
        file: el.file,
        img: el.img,
        violationStatus: el.violationStatus
      }
    })

    setOpenMEdit(true)
  }

  return (
    <div className={styles.violArrContainer}>
      {data
        ?
        data.map(el => (
          el.isPrint
            ?
            <Card key={el.id} className={styles.card} onClick={() => handleClick(el)}>
              <CardActionArea>
                <Typography className={
                  (el.violationStatus === 'waiting')
                    ?
                    styles.waitingStatus
                    :
                    el.violationStatus === 'accepted'
                      ?
                      styles.acceptedStatus
                      :
                      styles.rejectedStatus
                }>
                  {
                    (el.violationStatus === 'waiting')
                      ?
                      'На рассмотрении'
                      :
                      el.violationStatus === 'accepted'
                        ?
                        'Принято'
                        :
                        'Отклонено'
                  }
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className={styles.violItemTxt}>
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className={styles.violItemTxt}>
                    {el.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            :
            <React.Fragment key={el.id} />
      ))
        :
        <></>
      }
    </div>
  );
};

export default ViolationList;