import React from 'react'
import loader from '../../src/image/loader-icon.png'

const CustomLoader = () => {
  return (
    <div className='CustomLoader'>
        <div className='CustomLoaderInner'>
            <img src={loader} alt="loader" className='loaaderIcon' />
            <h3>Loading...</h3>
        </div>
    </div>
  )
}

export default CustomLoader