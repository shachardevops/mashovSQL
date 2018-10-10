import { BrowserRouter , Switch, Route} from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import DashBoard from '../components/DashBoard';
import StudentPage from '../components/StudentPage';
import PrivateRoute from './PrivateRoute';
import AdminUser from '../components/adminUser';
import HOC from '../components/HOC';
import AttendenceTable from '../components/AttendanceTable';
import AddStudent from '../components/AddStudent';
import NotFoundPage from '../components/NotFoundPage';
class AppRouter extends React.Component{
  state = {
    isAdmin:false,
    isStudent:false
  }
  AdminAccess = (isAdmin) => {
    if (isAdmin) {
      this.setState(({
        isAdmin
      }));
    }else{
      this.setState(({
        isAdmin
      }));
    }

  }
  StudentAccess = (isStudent) => {
    if (isStudent) {
      this.setState(({
        isStudent
      }));

    }else{
      this.setState(({
        isStudent
      }));
    }
  }
  render(){
    return(
      <BrowserRouter>
    
        <div>
          <Header />
          <Switch>
              <HOC path='/' component={DashBoard} exact={true} AdminAccess={this.AdminAccess} StudentAccess={this.StudentAccess}/>
              <PrivateRoute path="/student/:id" component={StudentPage} isStudent={this.state.isStudent}/>
              <PrivateRoute path='/admin' component={AdminUser} isAdmin={this.state.isAdmin}/>
              <PrivateRoute path='/attendance' component={AttendenceTable} isAdmin={this.state.isAdmin}/>
              <PrivateRoute path='/addstudent' component={AddStudent} isAdmin={this.state.isAdmin}/>
              <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
      );
  }
} 
export default AppRouter;
