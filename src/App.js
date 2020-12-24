import React from 'react'
import ReactPaginate from 'react-paginate';
import './App.css';
import Loader from './Components/Loader/loader'
import Table from './Components/Table/Table'
import Lodash from 'lodash'
import DetailRow from './Components/PersonDetails'
import DataLoader from './Components/DataLoader'
import Search from './Components/Search'


  class App extends React.Component {

   state = {
      isDataLoaded: false,
      isLoading: false,
      data: [],
      direction: 'asc',
      fieldFilter: 'id',
      row: null,
      currentPage: 0,
      search: ''
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

  async fetchData(url) {
      const response = await  fetch( url)
      const data = await response.json()
      this.setState({
        isLoading: false,
        data : Lodash.orderBy(data, this.state.fieldFilter, this.state.direction)
      })
    }

  modeSelectHandler = async url => {
      this.setState({
        isDataLoaded: true,
        isLoading: true,
      })
      await this.fetchData(url)
    }

  handlePageClick = ({selected}) => {
      this.setState({currentPage: selected})
    }

    searchHandler = search => (
      this.setState({search, currentPage: 0})
    )
    getFilteredData() {
     const {data, search} = this.state

      if (!search) {
        return data
      }
      return data.filter( item => {
        return item['firstName'].toLowerCase().includes(search.toLowerCase()) ||
          item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
          item['email'].toLowerCase().includes(search.toLowerCase())
      })
    }

    render() {
     const paginationSize = 50

     if (!this.state.isDataLoaded) {
       return (
         <div className="container">
           <DataLoader onSelect={this.modeSelectHandler}/>
         </div>
       )
     }
     const filteredData = this.getFilteredData()
     const pageCount = Math.ceil(filteredData.length / paginationSize)
     const displayData = Lodash.chunk(filteredData, paginationSize)[this.state.currentPage]

      return (
        <div className="App">
          <header className="App-header">Customer information</header>
          { this.state.isLoading ? <Loader/> :
           <div>
              <Search onSearch={this.searchHandler}/>
              <Table data={displayData}
                     onFilter={this.onFilter}
                     direction={this.state.direction}
                     fieldFilter={this.state.fieldFilter}
                     onRowSelect={this.onRowSelect}
              />
           </div>
          }
          {
            this.state.data.length > paginationSize &&
              <nav className="App-paginate" >
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                forcePage={this.state.currentPage}
              />
              </nav>
             }
          {
            this.state.row ? <DetailRow person={this.state.row}/> : null
          }
        </div>
      )
    }
  }

export default App;
