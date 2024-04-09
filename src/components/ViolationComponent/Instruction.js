import React from 'react';
import {Box, Typography} from "@mui/material";

import styles from './Violation.module.css'

const Instruction = () => {
  return (
    <Box className={styles.instructContainer}>
      <b><Typography className={styles.instructTxt}>Инструкция по добавлению нарушения:</Typography></b>
      <ul className={styles.instructUl}>
        <li className={styles.instructLi}>
          <Typography className={styles.instructTxt}>Отметьте маркером точку, где было замечено нарушение, нажав на соответствующее место на карте.</Typography>
        </li>
        <li className={styles.instructLi}>
          <Typography className={styles.instructTxt}>Нажмите кнопку "Добавить", располагающуюся под картой, заполните все необходимые поля и прикрепите фотографию
            подтверждение нарушения.</Typography>
        </li>
        <li className={styles.instructLi}>
          <Typography className={styles.instructTxt}>Ваша заявка поступит в обработку. Статус вашей заявки будет отображён и выделен специальным цветом.</Typography>
        </li>
      </ul>
      <Box className={styles.instructUl}>
        <b><Typography className={styles.instructTxt}>Примечание: </Typography></b>
        <Typography className={styles.instructTxt}>если место было выбрано неверно, можно удалить маркер, нажав на него и выбрав опцию "Удалить место".
          Также можно переместить маркер в случае необходимости.</Typography>
      </Box>
    </Box>
  );
};

export default Instruction;