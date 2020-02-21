import Unsplash, { toJson } from 'unsplash-js';



export default class  { //SwapiService
  unsplash = new Unsplash({
    accessKey: "1ccdd5c16d7080cec18e7366622b0aaa2d69d6eee9b25e685c4ef54a9d9067ea"
  });

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async getResourceImg(url) {
    const res = await fetch(`${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople(){
    const res = await this.getResource(`/people/`);

    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const planet = await this.getResource(`/people/${id}/`)
    return this._transformPerson(planet)
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`)
    return res.results.map(this._transformPlanet)
  }

  async getPlanet(id) {
     const planet = await this.getResource(`/planets/${id}/`)
     return this._transformPlanet(planet)
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`)
    return res.results.map(this._transformStarship)
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`)
    return this._transformStarship(starship)
  }

  getImages(str){
      return this.unsplash.search
             .photos(str, 1, 30)
             .then(toJson)
             .then(json =>{
                return json.results
             })
  }

  _extractId(item){
    const idRexExp = /\/([0-9]*)\/$/; // /\/([1-9]*)\/$/;

    return item.url.match(idRexExp)[1]
  }

  _transformPlanet = (planet)=>{

    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship)=>{
    return {
      id: this._extractId(starship),
      name:  starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson  = person =>{

    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }

}
