import React from 'react'
import LogoLoader from './LogoLoader'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] w-full bg-transparent">
      <LogoLoader showText={true} />
    </div>
  )
}

export default LoadingSpinner
