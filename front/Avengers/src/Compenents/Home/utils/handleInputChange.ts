/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export const handleImputChange = ({ target }: React.ChangeEvent<HTMLInputElement>, SetLogin: any) => {
  const {name, value} = target;
  SetLogin((prevState: any) => ({
    ...prevState,
    [name]: name === 'promedio_academico'
        ? value === '' ? undefined : Number(value)
        : value
  }));
};