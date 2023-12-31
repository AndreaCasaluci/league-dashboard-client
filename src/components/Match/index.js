import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faShieldHeart, faChartSimple, faStopwatch, faFutbol, faHandshake, faMitten, faXmark } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function Match({ teamAName, teamBName, matchStatus, result, statsTeamA, statsTeamB, replayLink, wildcard, defwin, time }) {
    const [teamALogo, setTeamALogo] = useState('');
    const [teamBLogo, setTeamBLogo] = useState('');
    const [actualReplayLink, setActualReplayLink] = useState(replayLink);
    const [expandedMatch, setExpandedMatch] = useState(false);
    const [actualTeamALogo, setActualTeamALogo] = useState('');
    const [actualTeamBLogo, setActualTeamBLogo] = useState('');



    useEffect(() => {
        let tmpTeamALogo = teamAName.replace(/\s/g, "_");
        let tmpTeamBLogo = teamBName.replace(/\s/g, "_");
        /* const teamALogoPath = require(`https://competitivefutsal.it/teamLogos/${tmpTeamALogo}.png`);
        const teamBLogoPath = require(`https://competitivefutsal.it/teamLogos/${tmpTeamBLogo}.png`);
        setTeamALogo(teamALogoPath);
        setTeamBLogo(teamBLogoPath); */
        setActualTeamALogo(`https://competitivefutsal.it/teamLogos/${tmpTeamALogo}.png`);
        setActualTeamBLogo(`https://competitivefutsal.it/teamLogos/${tmpTeamBLogo}.png`);
        if (replayLink) {
            if (!replayLink.startsWith("http://") && !replayLink.startsWith("https://")) setActualReplayLink("https://" + replayLink)
        }
    }, []);

    const handleMatchClick = () => {
        setExpandedMatch(!expandedMatch);
    }


    const handleReplayClick = () => {
        // Cambia l'URL della finestra del browser al link esterno
        window.open(actualReplayLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className='match-container' onClick={() => handleMatchClick()}>
            <div className='match-info'>
                <div className='left-div'>
                    {wildcard && !defwin ?
                        <div className='wildcard'><FontAwesomeIcon icon={faShieldHeart} className="wildcard-icon" />Wildcard</div>
                        :
                        null
                    }
                    {defwin && !wildcard ?
                        <div className='wildcard'><FontAwesomeIcon icon={faXmark} className="wildcard-icon" />Defwin</div>
                        :
                        null
                    }

                    {wildcard && defwin ?
                        <div className='left-wildcard-defwin'>
                            <div className='wildcard'><FontAwesomeIcon icon={faShieldHeart} className="wildcard-icon" />Wildcard</div>
                            <div className='wildcard'><FontAwesomeIcon icon={faXmark} className="wildcard-icon" />Defwin</div>
                        </div>

                        :
                        null
                    }
                </div>
                <div className='center-div'>
                    <div className='left-team-container'>
                        {/* <img src={teamALogo} className='team-logo'></img> */}
                        <p className='team-name'>{teamAName}</p>
                        <img src={actualTeamALogo} className='team-logo'></img>
                    </div>

                    {matchStatus === 'played' ?
                        <div className='result'><b>{result}</b></div>
                        :
                        <div className='vs'>
                            {time != null && time != undefined ?
                                time
                                :
                                "vs"
                            }

                        </div>
                    }

                    <div className='right-team-container'>
                        <img src={actualTeamBLogo} className='team-logo'></img>
                        <p className='team-name'>{teamBName}</p>
                        {/* <img src={teamBLogo} className='team-logo'></img> */}
                    </div>
                </div>
                <div className='right-div'>
                    {matchStatus === 'played' && !defwin ?
                        <div className='replay-button' onClick={handleReplayClick}><FontAwesomeIcon icon={faPlay} className="play-icon" />Replay</div>
                        :
                        null
                    }
                </div>
            </div>
            {expandedMatch && matchStatus === "played" ?
                <div className="stats-container">
                    <div className="team-stats">
                        <h4><FontAwesomeIcon icon={faChartSimple} className="wildcard-icon" />{teamAName} Stats</h4>
                        {statsTeamA.map((stats, statsIndex) => (
                            <div key={statsIndex} className="player-stats">
                                <p className='player-name'>{stats.player}:</p>
                                {/* <p> <FontAwesomeIcon icon={faStopwatch} /> {stats.playtime}s </p> */}
                                {stats.goal ? <p> <FontAwesomeIcon icon={faFutbol} /> {stats.goal}G </p> : null}
                                {stats.assist ? <p> <FontAwesomeIcon icon={faHandshake} /> {stats.assist}A </p> : null}
                                {stats.cleansheet > 0 ? <p> <FontAwesomeIcon icon={faMitten} /> {stats.cleansheet}CS </p> : null}
                                <p> {"("}<FontAwesomeIcon icon={faStopwatch} /> {stats.playtime}s{")"} </p>
                            </div>
                        ))}
                    </div>
                    <div className="team-stats">
                        <h4><FontAwesomeIcon icon={faChartSimple} className="wildcard-icon" />{teamBName} Stats</h4>
                        {statsTeamB.map((stats, statsIndex) => (
                            <div key={statsIndex} className="player-stats">
                                <p className='player-name'>{stats.player}:</p>
                                {/* <p> <FontAwesomeIcon icon={faStopwatch} /> {stats.playtime}s </p> */}
                                {stats.goal ? <p> <FontAwesomeIcon icon={faFutbol} /> {stats.goal}G </p> : null}
                                {stats.assist ? <p> <FontAwesomeIcon icon={faHandshake} /> {stats.assist}A </p> : null}
                                {stats.cleansheet > 0 ? <p> <FontAwesomeIcon icon={faMitten} /> {stats.cleansheet}CS</p> : null}
                                <p> {"("}<FontAwesomeIcon icon={faStopwatch} /> {stats.playtime}s{")"} </p>
                            </div>
                        ))}
                    </div>
                </div>

                :

                null
            }

        </div>
    );
}

export default Match;