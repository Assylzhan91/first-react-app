import React from 'react'
import icon from './death-star.png'
import style from './styles.css'

export  default function (props) {
    return <div className='err-block'>
        <img src={icon} alt=""/>
        <h1>Error</h1>
    </div>
}

