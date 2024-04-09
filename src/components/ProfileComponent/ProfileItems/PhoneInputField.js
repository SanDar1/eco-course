import React from 'react'
import {IMaskInput} from "react-imask";

const PhoneInputField = React.forwardRef(function PhoneMaskCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="+7 (000) 000-00-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default PhoneInputField