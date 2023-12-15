import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faCoins, faFutbol, faHandshake, faMitten, faStopwatch, faUsers } from '@fortawesome/free-solid-svg-icons'; // Sostituisci con le icone appropriate
import './index.css'

const PlayerStats = ({ playerName, playerGoal, playerAssist, playerCS, playerPlaytime, playerCost, captainName }) => {
    let isCaptain = false;
    const captainIconPath = require(`../../captain_icon.png`);
    if (playerName === captainName) isCaptain = true;

    return (
        <div className='player-stats2'>
            {isCaptain ?
                <div className='captain-icon2'><img src={captainIconPath} className='captain-icon2'></img></div>
                :
                <div className="captain-icon2"><FontAwesomeIcon icon={faPersonRunning} className='captain-icon3' /></div>
            }

            <p className='player-name30'>{playerName}:</p>
            <p> <FontAwesomeIcon icon={faFutbol} /> {playerGoal} </p>
            <p> <FontAwesomeIcon icon={faHandshake} /> {playerAssist} </p>
            <p> <FontAwesomeIcon icon={faMitten} /> {playerCS}</p>
            <p> <FontAwesomeIcon icon={faStopwatch} /> {playerPlaytime}s </p>
            <p>
                {playerCost === 3 ?
                    <p className='coins3-1'> <FontAwesomeIcon icon={faCoins} color='0xcc87eb' /> {playerCost} </p>
                    :
                    playerCost === 2 ?
                        <p className='coins2-1'> <FontAwesomeIcon icon={faCoins} color='0xfdd550' /> {playerCost} </p>
                        :
                        playerCost === 1 ?
                            <p className='coins1-1'> <FontAwesomeIcon icon={faCoins} color='0xa3bdba' /> {playerCost} </p>
                            :
                            <p> <FontAwesomeIcon icon={faCoins} /> {playerCost} </p>
                }
            </p>
        </div>
    )
}

export default PlayerStats