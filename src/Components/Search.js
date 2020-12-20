import React, {useState} from 'react'

function Search(props) {

  const  [value, setValue] = useState('')
  const valueChangeHandler = event => { setValue(event.target.value) }

  return (
    <div className="input-group mx-2 my-3">
      <input value={value} onChange={valueChangeHandler} type="text" className="form-control ml-2" placeholder="Search" aria-label="Recipient's username"
             aria-describedby="basic-addon2"/>
        <div className="input-group-append mx-4">
          <button  onClick={ () => props.onSearch(value)} className="btn btn btn-primary">Search</button>
        </div>
    </div>
  )
}
 export default Search
