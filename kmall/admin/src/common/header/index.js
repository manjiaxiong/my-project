import React, { Component } from 'react'
import axios from 'axios'
import api from 'api'
import { Layout, Menu, Icon, Dropdown } from 'antd'
const { Header } = Layout;
import { getUsername,removeUsername } from 'util'
import "./index.css"
class AdminHeader extends Component {
    constructor(props){
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
        api.logout()
         .then(result=>{
            if(result.code == 0){
                removeUsername()//删除前台的localStorage
                window.location.href = '/login'//回到登录页
            }
        })
        /*
        axios({//发送ajax让服务端去删除session
            method: 'delete',
            url:'http://127.0.0.1:3000/sessions/users',
        })
        .then(result=>{
            if(result.data.code == 0){
                removeUsername()//删除前台的localStorage
                window.location.href = '/login'//回到登录页
            }
        })
        */
    }
    render() {
        const menu = (
          <Menu onClick={this.handleLogout}>
            <Menu.Item key="1">
                <Icon type="logout" /> 退出
            </Menu.Item>
          </Menu>
        )     
        return (
            <div className="AdminHeader">
                <Header className="header">
                  <div className="logo">
                    KMALL
                  </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          {getUsername()} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
            </div>
        );
    }
}


export default AdminHeader