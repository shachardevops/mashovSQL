import React from 'react';
 class AdminUser extends React.Component {
    
    goToAttendance = () => {
       
        this.props.history.push(`/attendance`);

    }
    goToAddStudent = () => {
        this.props.history.push(`/addStudent`);
    }
    logOut = () => {
        window.location.reload();
    }
    render(){
        return(
        <div>
            
            <p><button onClick={this.logOut}>LogOut</button></p>
           <p><button onClick={this.goToAttendance}>Attendance Table</button></p>
           <p><button onClick={this.goToAddStudent}>Add Student</button></p>

        </div>
    )
    }

  }

  export default AdminUser;