import React, { useState, useEffect } from 'react';
import actions from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import PlayOffMatch from '../../components/PlayOffMatch';

const PlayOffPage = () => {

    useEffect(() => {
        //actions.fetchMatchdays(setMatches, setMatchdayDates);
    }, []);

    return (
        <div className='playoff-page-container'>
            <div className='title-header'>
                <h2 className='title-text'><FontAwesomeIcon icon={faStar} className="fa-icon2" />PlayOff</h2>
            </div>

            <div className='playoff-board'>
                <div className='quarter-finals'>
                    <div className='round-title'>
                        ‎ QUARTER FINALS 🎖️
                    </div>
                    <div className='date'>04/03/2024</div>
                    <div className='round-matches'>
                        <div className='playoff-match'>
                            <PlayOffMatch />
                        </div>

                        <div className='playoff-match'>
                            <PlayOffMatch />
                        </div>
                    </div>
                </div>
                <div className='semi-finals'>
                    <div className='round-title'>
                        ‎ SEMI FINALS 🏅
                    </div>
                    <div className='date'>04/03/2024</div>
                    <div className='round-matches'>
                        <div className='playoff-match'>
                            <PlayOffMatch />
                        </div>

                        <div className='playoff-match'>
                            <PlayOffMatch />
                        </div>

                    </div>
                </div>
                <div className='final'>
                    <div className='round-title'>
                        ‎ FINAL 🏆
                    </div>
                    <div className='date'>04/03/2024</div>
                    <div className='round-matches'>
                        <div className='playoff-match'>
                            <PlayOffMatch />
                        </div>
                    </div>
                </div>
            </div>



            <div className='match-stats-container'>
                p
            </div>
        </div>
    );
};

export default PlayOffPage;