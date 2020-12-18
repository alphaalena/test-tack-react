import React from 'react'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

const styles = {
 bold: {
   textTransform: 'uppercase'
 }
}

function Table(props) {
  return (
    <table className="table">
      <thead style={styles.bold}>
      <tr>
        <th scope="col" onClick={props.onFilter.bind(null, 'id')}> Id
          { props.direction === 'asc' ? <ArrowUpward/> : <ArrowDownward/>}
        </th>
        <th scope="col" onClick={props.onFilter.bind(null, 'firstName')}>First name
          {props.direction === 'asc' ? <ArrowUpward/> : <ArrowDownward/>}</th>
        <th scope="col" onClick={props.onFilter.bind(null, 'lastName')}>Last name
          {props.direction === 'asc' ? <ArrowUpward/> : <ArrowDownward/>}</th>
        <th scope="col" onClick={props.onFilter.bind(null, 'email')}>Email
          {props.direction === 'asc' ? <ArrowUpward/> : <ArrowDownward/>}</th>
        <th scope="col" onClick={props.onFilter.bind(null, 'phone')}>Phone
          {props.direction === 'asc' ? <ArrowUpward/> : <ArrowDownward/>}</th>
      </tr>
      </thead>
      <tbody>
      {props.data.map(item => (
        <tr key={item.id + item.phone} onClick={props.onRowSelect.bind(null, item)}>
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
