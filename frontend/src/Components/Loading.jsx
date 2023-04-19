import React from 'react'
import Train from "../Train.json"
import Lottie from "lottie-react"
import "./Loading.css"

const Loading = () => {
  return (
    <div className='loading'>
      <Lottie
      animationData={Train}
      height={20}
      width={20} 
      />
    </div>
  )
}

export default Loading
