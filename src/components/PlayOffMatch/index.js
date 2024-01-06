import React from 'react'
import './index.css'

const PlayOffMatch = (teamA, teamB, result) => {




    return (
        <div className='playoff-match-container'>
            <div className='row'>
                <div className='logo-box'></div>
                <div className='team-name'>THE ANBELIVEBALL TURKISH</div>
                <div className='score'>2</div>
            </div>
            <div className='row'>
                <div className='logo-box'></div>
                <div className='team-name'>THE ANBELIVEBALL TURKISH</div>
                <div className='score-win'>2</div>
            </div>
        </div>
    )
}

export default PlayOffMatch