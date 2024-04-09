import React from 'react';
import CustomTextField from "../../../UI/Inputs/CustomTextField/CustomTextField";
import CustomButton from "../../../UI/Inputs/CustomButton/CustomButton";

const InputFields = ({ fieldProps }) => {
  const fields = fieldProps.map(field =>
    field
      ?
      field.name === 'buttonLogin'
        ?
        <CustomButton
          key={field.name}
          name={field.name}
          text={field.text}
          handleOnClick={field.handleOnClick}
          style={{width: '45%'}}
        />
        :
        <CustomTextField
          key={field.name}
          name={field.name}
          type={field.type}
          value={field.value}
          label={field.label}
          className={field.className}
          onChange={field.onChange}
          error={field.canError}
          helperText={field.helperText}
          disabledTypography
        />
      :
      <></>
  )

  return (
    <>
      {fields}
    </>
  );
};

export default InputFields;