import React, { Component } from 'react';
import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner  from '../spinner/';
export default class extends Component {

  getSwapiService = new SwapiService()

  state = {
    person: null
  }

  componentDidMount() {
    this.updatePerson();
  }

  updatePerson = ()=>{
    const{ personId } = this.props

    if(!personId){
      return
    }

    this.getSwapiService
        .getPerson(personId)
        .then( person => {
            this.setState({person})
        })
  }

  componentDidUpdate(prevProps, prevState) {
      if(this.props.personId !== prevProps.personId){

          this.updatePerson()
      }
  }

    render() {
   const person = this.state.person
    if(!person) {
        return <Spinner/>
    }

    let {id,  name, gender, birthYear,  eyeColor} = this.state.person // gender, birthYear, eyeColor

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name} {this.props.personId}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
