import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login  from './pages/login';
import Home  from './pages/home';
import PageRender from './customRouter/PageRender';
import Alert from './components/notify/Alert';
import {useSelector, useDispatch} from "react-redux"
import {refreshtoken} from "./redux/actions/authAction"
import Header from './components/header/Header';
import Register from "./pages/register";
//import PrivateRouter from './customRouter/PrivateRouter';





function App() {
  const {auth}=useSelector(state=>state)

  const dispatch =useDispatch()

  useEffect(()=>{
    dispatch(refreshtoken())
  },[dispatch])
 
  return (
    <Router>
      <Alert/>
      <input type="checkbox" id="theme"/>
      <div className="App">
      <div className="main">
       {auth.token && <Header/>}
      <Route exact path="/" component={auth.token ? Home : Login}/>
      <Route exact path="/register" component={Register}/>
        <Route exact path="/:page" component={PageRender}/>
        <Route exact path="/:page/:id" component={PageRender}/>
        
        </div>
      </div>
    </Router>
  );
}

export default App;
