import React, {Component} from 'react';

import { Header } from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-button';
import  ErrorBlock from '../404/';
import './app.css';

export default class  extends Component { // App
    state = {
        showRandomPlanet: true,
        selectedPerson: 4,
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch')
        this.setState({
            hasError: true
        })
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    onPersonSelected = id => {
        this.setState({
            selectedPerson: parseInt(id)
        })
    }

    render() {
        const {showRandomPlanet, selectedPerson} = this.state
    const planet = showRandomPlanet
            ? <RandomPlanet />
            : null

        if(this.state.hasError){
            return <ErrorBlock/>
        }
        return (
            <div>
                <Header />
                { planet }
                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton/>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelect={this.onPersonSelected}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={selectedPerson} />
                    </div>
                </div>
            </div>
        )
    }

};

