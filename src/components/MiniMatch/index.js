import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faCoins, faFutbol, faHandshake, faMitten, faStopwatch, faUsers } from '@fortawesome/free-solid-svg-icons'; // Sostituisci con le icone appropriate
import './index.css'

const MiniMatch = ({ teamAShort, teamBShort, logoAName, logoBName, result, status }) => {


    return (
        <div className='mini-match'>
            <div className='left-team2'>
                <div className='mini-logo2-left'><img src={`https://competitivefutsal.it/teamLogos/${logoAName}`} alt={`Logo`} /></div>
                <div className='short-name2'>{teamAShort}</div>

            </div>
            {status === "win" ?
                <div className='result2-win'>{result}</div>
                :
                status === "lose" ?
                    <div className='result2-lose'>{result}</div>
                    :
                    <div className='result2-draw'>{result}</div>
            }
            <div className='right-team2'>
                <div className='short-name2'>{teamBShort}</div>
                <div className='mini-logo2-right'><img src={`https://competitivefutsal.it/teamLogos/${logoBName}`} alt={`Logo`} /></div>
            </div>
        </div>
    )
}

export default MiniMatch