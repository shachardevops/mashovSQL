import React from 'react';
export default class DashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',
            error:'',
        };
    }
    onNameChange = (e) => {
       let userName = e.target.value;
       if(!userName||userName.match(/[S+,1-9,a-zA-Z]{1,}?$/)){
       this.setState(({
        userName
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
    onSubmit = (e) =>{
        e.preventDefault();

        if (!this.state.userName||!this.state.password) {
            this.setState(({
                error:'please provide user name and password'
            }));

        }else{
            this.setState(({
                error:''
            }))
            fetch('https://1pk7nqks6f.execute-api.eu-west-1.amazonaws.com/default/mashovLogin', {
                method: 'POST',  
                body:JSON.stringify({username:this.state.userName, password:this.state.password})
              }).then((res) => res.json())
              .then(json=>{
                if(json[0].username==="admin"&&json[0].password===this.state.password){
                    console.log(json[0]);
                    this.setState(({error:''}));
                     this.props.AdminAccess(true);
                    this.props.history.push(`/admin`);
                }
                else if (json[0].username===this.state.userName&&json[0].password===this.state.password){
                    this.setState(({error:''}));
                    this.props.StudentAccess(true);
                    this.props.history.push(`/student/${json[0].id}`);
                }else{
                    this.setState(({error:'Wrong user name or password'}))
                }
          })
              .catch((err)=>this.setState(({error:'Wrong user name or password'})))       
        }
    }
    render(){
        return(
            <div>
            <h1>DashBoard</h1>
            <form onSubmit={this.onSubmit}>
                <p>Username<input type="text" onChange={this.onNameChange} value={this.state.userName} autoFocus placeholder="User name"/></p>
                <p>Password<input type="password" onChange={this.onPassWordChange} value={this.state.password}  placeholder="User Password"/></p>
                <p><button type="submit">Login</button></p>
            </form>
            {this.state.error&&<p>{this.state.error}</p>}
        </div>
        )
    }
}