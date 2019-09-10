import React, { Component } from 'react'
import './App.css'
import Login from 'pages/login'
import Home from 'pages/home'
import Err from "common/err"
import User from 'pages/user'
import Ad from 'pages/ad'
import Category from 'pages/category'
import Product from 'pages/product'
import Order from 'pages/order'
import {
 BrowserRouter as Router,
 // HashRouter as Router,
 Route, Link ,Switch,Redirect
} 
 from "react-router-dom";
 import {getUsername} from "util"
class App extends Component {
    render() {
    	//自定义组件
        const ProtectRoute=({component:Component,...rest})=>{
            return <Route
                {...rest}
                render={(props)=>{
                    return getUsername() ? <Component  {...props}/> : <Redirect to="/login"/>
                }}

            />
         }
        const LoginRoute = ({component:Component,...rest})=>{
            return <Route
                {...rest} 
                render={(props)=>{
                    return getUsername() ? <Redirect to="/" /> : <Component {...props}/>
                }}
            />
        }
        return (
        	<Router forceRefresh={true}>
	            <div className="App">
                    <Switch>
    			        <ProtectRoute path="/" exact  component={Home} />
                        <ProtectRoute  path="/user" component={User}  />
                        <ProtectRoute  path="/category" component={Category}  />
                        <ProtectRoute  path="/product" component={Product}  />
                        <ProtectRoute  path="/ad" component={Ad}  />
    			        <LoginRoute path="/login"  component={Login} />
                        <ProtectRoute path="/order"  component={Order} />
    			        <Route component={Err}/>
                    </Switch>
	            </div>
            </Router>
        )          
    }
}



export default App