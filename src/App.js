import React from 'react'
import './App.css';
import Loader from './Loader/loader'
import Table from './Table/table'
import Lodash from 'lodash'

  class App extends React.Component {

   state = {
      isLoading: true,
      data: [],
      direction: 'asc',
     fieldFilter: 'id'
    }

   async componentDidMount() {
    const response = await  fetch( `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
     const data = await response.json()
     this.setState({
       isLoading: false,
       data : Lodash.orderBy(data, this.state.fieldFilter, this.state.direction)
     })
    }
onFilter =  fieldFilter  => {
  const dataClone = this.state.data.concat()
  const directionType = this.state.direction === 'asc' ? 'desc' : 'asc'
  const orderedData =Lodash.orderBy(dataClone,fieldFilter, directionType)

  this.setState( {
    data: orderedData,
    direction: directionType,
    fieldFilter
  })
}

    render() {
      return (
        <div className="App">
          <header className="App-header">Экран магазинов</header>
          { this.state.isLoading ? <Loader/> :
            <Table data={this.state.data}
                   onFilter={this.onFilter}
                   direction={this.state.direction}
                   fieldFilter={this.state.fieldFilter}
            />}
        </div>
      )
    }
  }

export default App;
