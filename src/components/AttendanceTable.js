import React from 'react';
import Student from './Student';
const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();
const day = date.getDate();
class AttendanceTable extends React.Component{
    
    state = {
        day:day,
        month:month,
        year:year,
        array:''
    }
    onDayChange = (e) => {
        const day = e.target.value;
        this.setState(({day}))
    }
    onMonthChange = (e) => {
        const month = e.target.value;
        this.setState(({month}))
    }
    onYearChange = (e) => {
        const year = e.target.value;
        this.setState(({year}))
    }
    goToAdminPage = () => {
       
        this.props.history.push(`/admin`);

    }
    buildOptions(type) {
        const optionArray = [];
        if (type==="day") {
            for (let i = 1; i <= 31; i++) {
                optionArray.push(<option key={i} value={i}>{i}</option>)
            }
        }else if(type==="month"){
            for (let i = 1; i <= 12; i++) {
                optionArray.push(<option key={i} value={i}>{i}</option>)
            }
        }else{
            for (let i = 2018; i <= 2019; i++) {
                optionArray.push(<option key={i} value={i}>{i}</option>)
            }
        }
        return optionArray; 
    };
    onSearch = () =>{
        fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/JOINTABLES', {
                 method: 'POST',  
                 body:JSON.stringify({day:this.state.day, month:this.state.month,year:this.state.year})
               }).then((res) => res.json())
               .then(json=>{
                   if (json===[]) {
                    this.setState(({array:""}))
                   }else{
                this.setState(({array:json}))
                   }
                })

               .catch((err)=>console.log(err))    
    }
    render(){
        return(
        <div>
            <p><button onClick={this.goToAdminPage}>Admin page</button></p>
          <p> 
              day<select onChange = {this.onDayChange} defaultValue={this.state.day}>
                    {this.buildOptions("day")}
                </select>
                month<select onChange = {this.onMonthChange} defaultValue={this.state.month}>
                    {this.buildOptions("month")}
                </select>
                year<select onChange = {this.onYearChange} defaultValue={this.state.year}>
                    {this.buildOptions()}
                </select>
                <button onClick={this.onSearch}>Search</button>
            </p>
            {this.state.array&& <table className="table">
                <thead>
                    <tr>    
                        <th>id</th>
                        <th>name</th>
                        <th>time</th>
                    </tr>
                </thead>
                {this.state.array.map((student)=>{
                    return <Student key={Math.random()} {...student} />
                })}       
            </table> }
        </div>);
    }
} 
export default AttendanceTable;
