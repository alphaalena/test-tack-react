import React from 'react'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const styles = {
  bold: {
    textTransform: 'uppercase'
  }
}

function Arrow({ toTop, isActive }) {
  return (
    <span className={isActive ? 'arrow-active' : 'arrow-inactive'}>
      { toTop && isActive ? <ArrowUpward/> : <ArrowDownward/> }
    </span>
  );
}

function Table({ direction, data, fieldFilter, onFilter, onRowSelect }) {
  return (
    <table className="table">
      <thead style={styles.bold}>
      <tr>
        <th scope="col" onClick={onFilter.bind(null, 'id')}> Id
          <Arrow toTop={direction === 'asc'} isActive={fieldFilter === 'id'}/>
        </th>
        <th scope="col" onClick={onFilter.bind(null, 'firstName')}>First name
          <Arrow toTop={direction === 'asc'} isActive={fieldFilter === 'firstName'}/>
        </th>
        <th scope="col" onClick={onFilter.bind(null, 'lastName')}>Last name
          <Arrow toTop={direction === 'asc'} isActive={fieldFilter === 'lastName'}/>
        </th>
        <th scope="col" onClick={onFilter.bind(null, 'email')}>Email
          <Arrow toTop={direction === 'asc'} isActive={fieldFilter === 'email'}/>
        </th>
        <th scope="col" onClick={onFilter.bind(null, 'phone')}>Phone
          <Arrow toTop={direction === 'asc'} isActive={fieldFilter === 'phone'}/>
        </th>
      </tr>
      </thead>
      <tbody>
      {data && data.map(item => (
        <tr key={item.id + item.phone} onClick={onRowSelect.bind(null, item)}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}
export default Table
