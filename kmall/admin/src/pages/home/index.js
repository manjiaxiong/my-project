import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Card,Row,Col } from 'antd'

import Layout from 'common/layout'

import "./index.css"
import { actionCreator } from './store'
 
class Home extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.handleCount()//挂载完毕获取数据(页面初始时的数据)
    }
    render() {
        const {usernum,ordernum,productnum } = this.props
        return (
        <div >
             <Layout>
                 <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content">
                    <Row>
                      <Col span={8}>
                        <Card title="用户数" bordered={false} style={{ width: 300 }}>
                          <p>{usernum}</p>
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card title="商品数" bordered={false} style={{ width: 300 }}>
                          <p>{productnum}</p>
                        </Card>                      
                      </Col>
                      <Col span={8}>
                        <Card title="订单数" bordered={false} style={{ width: 300 }}>
                          <p>{ordernum}</p>
                        </Card>  
                      </Col>
                    </Row>                                                        
                </div>
             </Layout>
        </div>
        );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({
    usernum:state.get('home').get('usernum'),
    ordernum:state.get('home').get('ordernum'),
    productnum:state.get('home').get('productnum'),    
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleCount:()=>{
        dispatch(actionCreator.getCountAction())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)