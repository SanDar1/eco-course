import React, {useEffect, useState} from 'react';
import {$authHost} from "../../config";
import {CardMedia} from "@mui/material";
import {URL} from '../../config/URL'

const ViolationImageItem = ({ uploadURL }) => {
  const [source, setSource] = useState('')

  useEffect(() => {
    $authHost
      .get(
        URL.PROFILE_REST_API_URL + '/' + uploadURL,
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setSource("data:;base64," + base64);
      });
  })

  /*return <CardMedia
    component="img"
    height="300"
    image={source}
  />*/
  return <CardMedia
    component="img"
    height="300"
    image={'https://api.telegram.org/file/bot6250764787:AAE3ijts2oFWYn3_pH4wPxKk4EYXfRCgCoQ/photos/file_19.jpg'}
  />
}

export default ViolationImageItem;