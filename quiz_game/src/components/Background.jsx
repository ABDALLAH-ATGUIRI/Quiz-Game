import React, { Children, Fragment } from 'react'
import backgroundImage from '../assets/background.avif'

export const Background = ({ children }) => {
  return (

    <Fragment>
      <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] items-center " style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>
        {children}
      </div>
    </Fragment>)
}
