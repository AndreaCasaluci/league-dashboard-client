// TeamsPage.js
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUp, faArrowDown, faFutbol, faHandshake, faMitten, faStopwatch, faCoins, faStop } from '@fortawesome/free-solid-svg-icons';
import PlayerStats from '../../components/PlayerStats';
import MiniMatch from '../../components/MiniMatch';
import actions from '../../actions';
import './index.css'; // Importa il tuo file CSS se necessario



const SpecificTeamPage = ({ teamName, teamLogoName, teamShortName, teamPlayers, onClick }) => {
    const [playersAndStats, setPlayersAndStats] = useState([]);
    const [playedMatches, setPlayedMatches] = useState([]);
    const [captainName, setCaptainName] = useState('');
    const [captainSet, setCaptainSet] = useState(false);
    const [reversePlayedMatches, setReversePlayedMatches] = useState([]);

    const [sortType, setSortType] = useState(null); // Imposta un valore predefinito
    const [sortOrder, setSortOrder] = useState(null); // 'asc' per ascendente, 'desc' per discendente


    const sortPlayers = (type) => {
        const sortedPlayers = [...playersAndStats].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[type] - b[type];
            } else {
                return b[type] - a[type];
            }
        });

        setPlayersAndStats(sortedPlayers);
    };

    useEffect(() => {
        // Ordina i giocatori iniziali in base all'ordinamento predefinito
        sortPlayers(sortType);
    }, [sortType, sortOrder]);



    useEffect(() => {
        actions.fetchPlayersStatsByTeam(teamName, setPlayersAndStats);
        actions.fetchPlayedMatchesByTeam(teamName, setPlayedMatches);
    }, []); // Assicurati di gestire correttamente l'effetto collaterale

    useEffect(() => {
        if (captainSet) return;
        playersAndStats.map((playerStat, index) => {
            if (index === 0) {
                setCaptainName(playerStat.name);
                setCaptainSet(true);
            }
            else return;
        });
    }, [playersAndStats]);
    useEffect(() => {
        setReversePlayedMatches(playedMatches.reverse());
    }, [playedMatches]);

    return (
        <div className='specific-team-page'>
            <div className='specific-team-container'>
                <div className='specific-team-header'>
                    <div className='logo-name-container'>
                        <div className='specific-team-logo'><img src={`https://competitivefutsal.it/teamLogos/${teamLogoName}`} alt={`${teamName} Logo`} className="team-logo" /></div>
                        <div className='specific-team-name'>{teamName}</div>
                    </div>
                    <div className='exit-button'><FontAwesomeIcon icon={faXmark} className="exit-button2" onClick={() => onClick(false)} /></div>
                </div>
                <div className='specific-team-stats-container'>
                    <div className='specific-team-players-stats'>
                        <p className='section-title3'>Players:</p>
                        <div className='sort-buttons'>
                            <button className={sortType === 'goal' ? 'active' : ''} onClick={() => { setSortType('goal'); setSortOrder(sortType === 'goal' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                                <FontAwesomeIcon icon={faFutbol} /> {sortType === 'goal' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />}
                            </button>
                            <button className={sortType === 'assist' ? 'active' : ''} onClick={() => { setSortType('assist'); setSortOrder(sortType === 'assist' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                                <FontAwesomeIcon icon={faHandshake} /> {sortType === 'assist' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />}
                            </button>
                            <button className={sortType === 'cs' ? 'active' : ''} onClick={() => { setSortType('cs'); setSortOrder(sortType === 'cs' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                                <FontAwesomeIcon icon={faMitten} /> {sortType === 'cs' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />}
                            </button>
                            <button className={sortType === 'playtime' ? 'active' : ''} onClick={() => { setSortType('playtime'); setSortOrder(sortType === 'playtime' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                                <FontAwesomeIcon icon={faStopwatch} /> {sortType === 'playtime' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />}
                            </button>
                            <button className={sortType === 'cost' ? 'active' : ''} onClick={() => { setSortType('cost'); setSortOrder(sortType === 'cost' && sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                                <FontAwesomeIcon icon={faCoins} /> {sortType === 'cost' && <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUp : faArrowDown} />}
                            </button>
                        </div>

                        {playersAndStats.map((playerStat, index) => (
                            <PlayerStats
                                key={playerStat.name}
                                playerName={playerStat.name}
                                playerGoal={playerStat.goal}
                                playerAssist={playerStat.assist}
                                playerCS={playerStat.cs}
                                playerPlaytime={playerStat.playtime}
                                playerCost={playerStat.cost}
                                captainName={captainName}
                            />
                        ))}




                        {/* <PlayerStats
                            key={1}
                            playerName="Chiesa"
                            playerGoal={5}
                            playerAssist={10}
                            playerCS={0}
                            playerPlaytime={10000}
                            playerCost={3}
                        />
                        <PlayerStats
                            key={2}
                            playerName="PAPEROMANO STARNAZZANTE"
                            playerGoal={5}
                            playerAssist={10}
                            playerCS={0}
                            playerPlaytime={10000}
                            playerCost={3}
                        />
                        <PlayerStats
                            key={3}
                            playerName="Coramerda"
                            playerGoal={5}
                            playerAssist={10}
                            playerCS={0}
                            playerPlaytime={10000}
                            playerCost={3}
                        /> */}
                    </div>
                    <div className='specific-team-last-matches'>
                        <p className='section-title4'>Last Matches</p>

                        {reversePlayedMatches.map((playedMatch, index) => (
                            <MiniMatch
                                key={index}
                                teamAShort={playedMatch.teamAShort}
                                teamBShort={playedMatch.teamBShort}
                                result={playedMatch.result}
                                status={playedMatch.matchStatus}
                                logoAName={playedMatch.teamALogo}
                                logoBName={playedMatch.teamBLogo}

                            />

                        ))}
                        {/* <MiniMatch
                            key={1}
                            teamAShort={"JUV"}
                            teamBShort={"HAS"}
                            result={"3-2"}
                            status={"win"}
                        />
                        <MiniMatch
                            key={2}
                            teamAShort={"TRP"}
                            teamBShort={"JUV"}
                            result={"1-0"}
                            status={"lose"}
                        />
                        <MiniMatch
                            key={3}
                            teamAShort={"JUV"}
                            teamBShort={"QSA"}
                            result={"2-2"}
                            status={"draw"}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecificTeamPage;
