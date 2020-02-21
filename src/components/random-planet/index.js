import React, { Component } from 'react';
import Spinner  from '../spinner/index';
import './random-planet.css';
import  SwapiService from '../../services/swapi-service';
import  PlanetView from './planet-view';
import  ErrorBlock from '../404';


export default class extends Component { //RandomPlanet
  _random = Math.trunc(Math.random() * 10)
  swapiService = new SwapiService()

  state = {
    planet: {},
    imgUrl: null,
    loaded: true,
    error: false
  }

  constructor(){
    super()
    this.updatePlanet()
    this.getAllImages()
  }



  componentDidMount() {
    // console.log('componentDidMount  ' +  this.state.loaded)
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount()')
  }

  getAllImages = () => {

    this.swapiService.getImages('lion').then(data=>{
      const rand = Math.trunc(Math.random() * data.length)
      let imgUrl =  data[rand].urls.thumb

      this.setState({imgUrl})
    })
  }

  onPlanetLoaded = planet =>{
    this.setState({
      planet,
      loaded: false
    })
  }

  onError = () => {
      this.setState({
        error: true,
        loaded: false
      })
  }

  updatePlanet = () => {
     let random = Math.trunc(Math.random() * 11)

    // console.log(random)
    this.swapiService.getPlanet(8)
        .then(this.onPlanetLoaded)
        .catch(this.onError)
  }

  render() {
    // console.log('render()')
    const { planet, imgUrl, loaded, error } = this.state

    const spinner = loaded ? <Spinner/> : null
    const err = error ? <ErrorBlock/> : null
    const addstyle = loaded || err ? ' center' : ''


    const hasData = !(loaded || error)

    const content = hasData
                    ? <PlanetView planet={planet} imgUrl={imgUrl}/>
                    : null;


    return (
      <div className={`random-planet jumbotron rounded${addstyle}`}>
        {err}
        {spinner}
        {content}
      </div>
    )
  }
}
