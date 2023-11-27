// FixturesPage.js

import React, { useState, useEffect } from 'react';
import actions from '../../actions';
import './index.css'; // Importa il tuo file CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const FixturesPage = () => {
    const [matches, setMatches] = useState([]);
    const [expandedMatch, setExpandedMatch] = useState(null);

    useEffect(() => {
        actions.fetchMatchdays(setMatches);
    }, []);

    const groupMatchesByMatchday = () => {
        const groupedMatches = {};
        matches.forEach((match) => {
            const matchday = match.matchday;
            if (!groupedMatches[matchday]) {
                groupedMatches[matchday] = [];
            }
            groupedMatches[matchday].push(match);
        });
        return groupedMatches;
    };

    const groupedMatches = groupMatchesByMatchday();

    const handleMatchClick = (match) => {
        setExpandedMatch(expandedMatch === match ? null : match);
    };

    return (
        <div className="fixtures-page">
            <div className='title-header'>
                <h2 className='title-text'><FontAwesomeIcon icon={faCalendarDays} className="fa-icon2" />Fixtures</h2>
            </div>

            {Object.entries(groupedMatches).map(([matchday, matches]) => (
                <div key={matchday} className="matchday-container">
                    <h3>Matchday {matchday}</h3>
                    {matches.map((match, matchIndex) => (
                        <div
                            key={matchIndex}
                            className={`match-container ${expandedMatch === match ? 'expanded' : ''}`}
                            onClick={() => handleMatchClick(match)}
                        >
                            <div className="match-info">
                                <p className="teams">
                                    {match.teamA}
                                    {match.status === 'played' && (
                                        <>
                                            <img src={match.logoA} alt="TeamA Logo" className="team-logo" />
                                            {`${match.scoreA}-${match.scoreB}`}
                                            <img src={match.logoB} alt="TeamB Logo" className="team-logo" />
                                        </>
                                    )}
                                    {match.status === 'notPlayed' && (
                                        <>
                                            <img src={match.logoA} alt="TeamA Logo" className="team-logo" />
                                            <span>vs</span>
                                            <img src={match.logoB} alt="TeamB Logo" className="team-logo" />
                                        </>
                                    )}
                                    {match.teamB}
                                </p>
                                {match.status === 'played' && <p className="result">Result: {match.result}</p>}
                                {match.status === 'notPlayed' && <p className="not-played">Not Played</p>}
                                {match.status === 'played' && (
                                    <div className="replay">
                                        <FontAwesomeIcon icon={faPlay} className="play-icon" />
                                    </div>
                                )}
                            </div>
                            {expandedMatch === match && match.status === 'played' && (
                                <div className="stats-container">
                                    <div className="team-stats">
                                        <h4>{match.teamA} Stats</h4>
                                        {match.statsA.map((stats, statsIndex) => (
                                            <div key={statsIndex} className="player-stats">
                                                <p>Player: {stats.player}</p>
                                                <p>Playtime: {stats.playtime}</p>
                                                <p>Goal: {stats.goal}</p>
                                                <p>Assist: {stats.assist}</p>
                                                <p>Cleansheet: {stats.cleansheet}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="team-stats">
                                        <h4>{match.teamB} Stats</h4>
                                        {match.statsB.map((stats, statsIndex) => (
                                            <div key={statsIndex} className="player-stats">
                                                <p>Player: {stats.player}</p>
                                                <p>Playtime: {stats.playtime}</p>
                                                <p>Goal: {stats.goal}</p>
                                                <p>Assist: {stats.assist}</p>
                                                <p>Cleansheet: {stats.cleansheet}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FixturesPage;
