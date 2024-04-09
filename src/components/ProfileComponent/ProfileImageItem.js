import React, {useEffect, useState} from 'react';
import {$authHost} from "../../config";
import {Avatar} from "@mui/material";
import {URL} from '../../config/URL'

const ProfileImageItem = ({ uploadURL, forNav }) => {
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

  if (forNav) {
    return <Avatar
      src={source}
    />
  } else {
    return <Avatar
      src={source}
      sx={{
        width: "300px",
        height: "300px"
      }}
    />
  }
}

export default ProfileImageItem;