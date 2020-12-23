import React from 'react'

// TODO: Название компонента ближе - DataLoader
// TODO: SwitchData - это что-то вроде "Переключение данных", но ты их не переключаешь, а грузишь, и только раз
function SwitchData(props) {
  const smallUrl =  `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`

  const bigUrl =  `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`

  const styles = {
    div: {
      display: 'flex',
      justifyContent: 'center',
      margin: '20px',
    }
  }

  return (
  <div style={styles.div} >
    <button type="button" onClick={() => props.onSelect(smallUrl)} className="btn m-2 btn-success">32 элемента</button>
    <button type="button" onClick={ () => props.onSelect(bigUrl)} className="btn  m-2 btn-danger">1000 элеменов</button>
  </div>
  )}
  export default SwitchData
