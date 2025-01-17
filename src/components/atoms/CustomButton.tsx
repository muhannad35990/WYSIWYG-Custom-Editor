"use client"
import React, { FC, ReactElement } from "react"
import { CustomButtonProps } from "../../../types"

const CustomButton:FC<CustomButtonProps>=({title,onClick}):ReactElement=> {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-400 text-white p-1 rounded"
    >
    {title}
    </button>
  )
}

export default CustomButton
