import React from 'react'

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
        <th scope="col">Id</th>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
      </tr>
      </thead>
      <tbody>
      {props.data.map(item => (
        <tr key={item.id}>
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
