import React from 'react'

// TODO: Название - RowDetails, а лучше даже - PersonDetails
function DetailRow({person}) {
  return (
  <div className='detailRow'>
    <div className='modalWindow'>
    <p>Выбран пользователь
      <b>
        {' ' + person.firstName + ' ' + person.lastName}
      </b>
    </p>
    <p>Описание: <br/>
      <b>
        {person.description}
      </b>
    </p>
    <p> Адрес проживания:
        <b>
          {' ' + person.address.streetAddress}
        </b>
    </p>
    <p> Город:
      <b>
        { '' + person.address.city}
      </b>
    </p>
    <p>Провинция/штат:
      <b>
        {' ' + person.address.state}
      </b>
    </p>
    <p>Индекс:
      <b>
        {' ' + person.address.zip}
      </b>
    </p>
    </div>
  </div>
  )}

export default DetailRow
