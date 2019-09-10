import React, { Component } from 'react'
import { 
    Route, 
    Switch,
} from "react-router-dom"
import Productsave from './save.js'
import ProductDetail from './detail.js'
import ProductList from './list.js'


import "./index.css"

class Category extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
           <Switch>
                <Route path="/product/save/:productId?" component={Productsave} />
                <Route path="/product/detail/:productId?" component={ProductDetail} />
                <Route path="/product/" component={ProductList} />
           </Switch> 
        )
    }
}


export default Category