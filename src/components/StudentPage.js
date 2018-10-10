import React from 'react';
class StudentPage extends React.Component{
    state = {
        alreadyArrived:false,
        message:''
    }
    componentDidMount(){
        fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/attendanceSELECT', {
                method: 'POST',  
                body:JSON.stringify({
                    studentID:this.props.match.params.id
                  })
              }).then((res) => res.json())
              .then((json)=>{
                  if (json.length>0) {
                      this.setState(({alreadyArrived:true,
                        message:'already arrived to the class'}));
                    
                  }
              })
    }
    GoHome = () => {
        window.location.reload();
    }
    isArrived = () => {
        this.setState(({alreadyArrived:true}));
        if (!this.state.alreadyArrived) {
            fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/attendanceSELECT', {
                method: 'POST',  
                body:JSON.stringify({
                    studentID:this.props.match.params.id
                  })
              }).then((res) => res.json())
              .then((json)=>{
                  if (json.length>0) {
                      this.setState(({alreadyArrived:true,
                        message:'already arrived to the class'}));
                    
                  }else{

                    this.setState(({alreadyArrived:true}));

                    fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/attendanceInsert', {
                        method: 'POST',  
                        body:JSON.stringify({
                            studentID:this.props.match.params.id
                          })
                      }).then((res) => res.json())
                      .then((json)=>{
                        this.setState(({alreadyArrived:true,
                        message:"Arrival marked successfully"}));
        
                      })

                  }
              })
            
        }
        
    }
    render(){
        return (<div>
        <h1>Student</h1>

    
            <p><button onClick={this.GoHome}>LogOut</button></p>
            <button onClick={this.isArrived} disabled={this.state.alreadyArrived}>I Arrived</button>
            {this.state.message&&<h3>{this.state.message}</h3>}
    </div>
);
    }
    
   
}
export default StudentPage;
