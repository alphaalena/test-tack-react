import React from 'react'
import './App.css';
import ReactPaginate from 'react-paginate';
import Loader from './Components/Loader/loader'
import Table from './Components/Table/table'
import Lodash from 'lodash'
import DetailRow from './Components/DetailRow'
import SwitchData from './Components/Switch-data'

  class App extends React.Component {

   state = {
      isSwitchData: false,
      isLoading: false,
      data: [],
      direction: 'asc',
      fieldFilter: 'id',
      row: null
    }

   async fetchData(url) {
    const response = await  fetch( url)
     const data = await response.json()
     this.setState({
       isLoading: false,
       data : Lodash.orderBy(data, this.state.fieldFilter, this.state.direction)
     })
    }
onFilter =  fieldFilter  => {
  const dataClone = this.state.data.concat()
  const direction = this.state.direction === 'asc' ? 'desc' : 'asc'
  const data = Lodash.orderBy(dataClone,fieldFilter, direction)

  this.setState( {
    data,
    direction,
    fieldFilter
  })
}

onRowSelect = row => {
  this.setState({row})
  }

    modeSelectHandler = url => {
      this.setState({
        isSwitchData: true,
        isLoading: true,
      })
      this.fetchData(url)
    }

    render() {
     if (!this.state.isSwitchData) {
       return (
         <div className="container">
           <SwitchData onSelect={this.modeSelectHandler}/>
         </div>
       )
     }
      return (
        <div className="App">
          <header className="App-header">Экран магазинов</header>
          { this.state.isLoading ? <Loader/> :
            <Table data={this.state.data}
                   onFilter={this.onFilter}
                   direction={this.state.direction}
                   fieldFilter={this.state.fieldFilter}
                   onRowSelect={this.onRowSelect}
            />}
          {
            this.state.row ? <DetailRow person={this.state.row}/> : null
          }
        </div>
      )
    }
  }

export default App;
