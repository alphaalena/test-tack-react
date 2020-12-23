import React from 'react'
import ReactPaginate from 'react-paginate';
import './App.css';
import Loader from './Components/Loader/loader'
import Table from './Components/Table/table'
import Lodash from 'lodash'
import DetailRow from './Components/DetailRow'
import SwitchData from './Components/Switch-data'
import Search from './Components/Search'

// TODO: Сделай на всем проекте автоформат (Ctrl + Alt + L)
// TODO: У тебя в проекте появился файл .editorconfig, когда будешь читать это - позови меня, я тебе объясню что это
  class App extends React.Component {

   state = {
      isSwitchData: false,
      isLoading: false,
      data: [],
      direction: 'asc',
      fieldFilter: 'id',
      row: null,
      currentPage: 0,
      search: '',
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
        isSwitchData: true,
        isLoading: true,
      })
      await this.fetchData(url)
    }

  handlePageClick = ({selected}) => {
      this.setState({currentPage: selected})
    }

    // TODO: Должно быть единообразие в названиях - строго camelCase, тоже самое касается названий файлов - посмотри как они называются
    SearchHandler = search => (
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
     // TODO: camelCase
     const PaginationSize = 50

      // TODO: Только тут мне стало понятно, как используется переменная isSwitchData
      // TODO: Измени ей название на isDataLoaded
     if (!this.state.isSwitchData) {
       return (
         <div className="container">
           <SwitchData onSelect={this.modeSelectHandler}/>
         </div>
       )
     }
     const filteredData = this.getFilteredData()
     const pageCount = Math.ceil(filteredData.length / PaginationSize)
     const displayData = Lodash.chunk(filteredData, PaginationSize)[this.state.currentPage]

      return (
        <div className="App">
          <header className="App-header">Customer information</header>
          { this.state.isLoading ? <Loader/> :
           <div>
              <Search onSearch={this.SearchHandler}/>
              <Table data={displayData}
                     onFilter={this.onFilter}
                     direction={this.state.direction}
                     fieldFilter={this.state.fieldFilter}
                     onRowSelect={this.onRowSelect}
              />
           </div>
          }
          {
            this.state.data.length > PaginationSize &&
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
