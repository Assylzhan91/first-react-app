import React, { Component } from 'react'
import './error-button.css'
export default class extends Component{
    state = {
        errorRender: false
    }
    render() {
        if(this.state.errorRender){
            this.foo.bar = 0
        }
        return <button
            className='error-button btn btn-danger btn-lg'
            onClick={()=> this.setState({errorRender: true}) }
        >
            Throw Error
        </button>

    }
}