import React from 'react';
import { Circles } from  'react-loader-spinner'

const Loader = () => {
  return (
    <div>
        <Circles
            height = "80"
            width = "80"
            radius = "9"
            color = 'black'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
        />
    </div>
  )
}

export default Loader