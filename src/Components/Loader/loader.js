import React from 'react'
import './loader.css'

const styles = {
  div: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
  }
}

function Loader () {
  return (
    <div style={styles.div}>
     <div className="lds-dual-ring"/>
    </div>
  )

}
export default Loader
