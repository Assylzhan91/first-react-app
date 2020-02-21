import React, { Component } from 'react'
import  SwapiService from '../../services/swapi-service';
import Spinner  from '../spinner/index';
import './item-list.css'


export default class extends Component {
    swapiService = new SwapiService()

    state={
        peopleList: null
    }

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then( peopleList =>{
                this.setState({peopleList})
            })
    }

    renderItem(arr){
        const {onItemSelect} = this.props

        return arr.map(({id, name})=> {
            return <li
                className="list-group-item"
                key={id}
                onClick={()=> onItemSelect(id)}
            >
                {id}. {name}
            </li>
        })
    }

    render() {

        const {peopleList}   =  this.state


        if(!peopleList){
            return <Spinner/>
        }
        const items = this.renderItem(peopleList);
        return (
            <ul className="item-list list-group">
            {items}
        </ul>
    );
  }
}
