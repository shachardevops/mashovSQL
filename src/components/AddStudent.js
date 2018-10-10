import React from 'react';
export default class AddStudent extends React.Component {
    state = {
        studentId:'',
        userName:'',
        password:'',
        error:''
    }
    onNameChange = (e) => {
        const userName = e.target.value;
        if(!userName||userName.match(/[S+,1-9,a-zA-Z]{1,}?$/)){
            this.setState(() => ({ userName }));
     }
    }
     onIdChange = (e) => {
        const studentId = e.target.value;
        if(!studentId||studentId.match(/[S+,1-9]{1,}?$/)){
        this.setState(({
        studentId
        }));
     }
    }
     onPassWordChange = (e) => {
         const password = e.target.value;
         if(!password||password.match(/[S+,1-9,a-zA-Z]{1,}?$/)){

         this.setState(({
          password
         }));
      }
    }
      goToAdminPage = () => {
       
        this.props.history.push(`/admin`);

    }
     onSubmit = (e) =>{
         e.preventDefault();
         if (!this.state.userName||!this.state.password||!this.state.studentId) {
             this.setState(({
                 error:'please provide user name, password and student id'
             }));
 
         }else{
            fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/mashovSELECT', {
                method: 'POST',  
                body:JSON.stringify({studentId:this.state.studentId,username: this.state.userName})
              }).then((res) => res.json())
              .then(json=>{ 
                if (json[0]!==undefined) {

                   this.setState(({error:'student already registered'}))
                }else{
                    fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/CreateStudentDynamoDB', {
                        method: 'POST',  
                        body:JSON.stringify({username:this.state.userName, password:this.state.password,studentId:this.state.studentId})
                      }).then((res) => res.json())
                      .then(json=>{                 
                        if (json===false) {
                           this.setState(({error:'The student has already been added'}))
                         }else{
                           this.setState(({error:'Insert successfully'}))
       
                         }
                       })
                      .catch((err)=>console.log(err))       
                }
               })
              .catch((err)=>console.log(err))  
             this.setState(({
                 error:''
             }))
            
         }
     }
    render(){
        return(
        <div>
            <p><button onClick={this.goToAdminPage}>Admin page</button></p>
            <form onSubmit={this.onSubmit}>
                <p>Student ID<input type="text" onChange={this.onIdChange} value={this.state.studentId} autoFocus placeholder="Student ID"/></p>
                <p>Student name<input type="text" onChange={this.onNameChange} value={this.state.userName}  placeholder="Student name"/></p>
                <p>Student password<input type="text" onChange={this.onPassWordChange} value={this.state.password}  placeholder="Student Password"/></p>
                <p><button type="submit">Create</button></p>
            </form>
            {this.state.error&&<p>{this.state.error}</p>}
        </div>
    )
    }

  }

