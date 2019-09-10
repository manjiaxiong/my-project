import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import "./index.css"
import { actionCreator } from './store'
class NormalLoginForm extends React.Component {
    constructor(props){
      super(props)
      this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                 this.props.handleLogin(values)
            }
        });
    };
    render() {
      // console.log(111)
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props)
        return (
        <div className="Login">
        <Form className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z][a-z0-9]{2,5}$/,message:"用户名以字母开头且3-6位"}],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' },{pattern:/^[a-z][a-z0-9]{2,5}$/,message:"密码以字母开头且3-6位"}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                 className="login-form-button"
                 onClick={this.handleSubmit}
                 loading={this.props.isFetching}
                 >
                  登录
              </Button>
            </Form.Item>
        </Form>
        </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
//映射属性到组件
const mapStateToProps = (state) => ({
    isFetching:state.get('login').get('isFetching'),
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleLogin: (values) => {
       dispatch(actionCreator.getLoginAction(values))
    },
   
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)