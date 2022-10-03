import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Smith', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Neo', salary: 1500, increase: true, rise: false, id: 2},
                {name: 'Trinity', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
            
        })        
    }

    onAddEmployee = (name, salary) => {
        const newEmployee = {name, salary, increase: false, rise: false, id: this.maxId++}
        this.setState(({data}) => {
            const newArr = [...data, newEmployee];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter(i => {
            return i.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilter = (data, filter) => {
        switch (filter) {
            case 'rise':
                return data.filter(i => i.rise)
            case 'salary':
                return data.filter(i => i.salary > 1000)
            default:
                return data
        }   
    }

    onClickFilter = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.onFilter(this.searchEmp(data, term), filter);
        return(
            <div className="app">
                <AppInfo data={data}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                        filter={filter}
                        onClickFilter={this.onClickFilter}/>
                </div>
                <EmployeesList
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                onAddEmployee={this.onAddEmployee}/>
            </div>
        );
    }

    
}

export default App