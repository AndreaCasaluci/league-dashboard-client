// FixturesPage.js

import React, { useState, useEffect } from 'react';
import Match from '../../components/Match';
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
                    {/* <h3>Matchday {matchday}</h3> */}
                    <div className='matchday-title'>
                        <p className='inner-title'>Matchday {matchday}</p>
                    </div>
                    <div className='matches'>
                        {matches.map((match, matchIndex) => (
                            <>
                                <Match
                                    teamAName={match.teamA}
                                    teamBName={match.teamB}
                                    matchStatus={match.status}
                                    result={match.result}
                                    statsTeamA={match.statsA}
                                    statsTeamB={match.statsB}
                                    replayLink={match.replay}
                                    wildcard={match.wildcard}
                                    defwin={match.defwin}
                                    time={match.time}
                                ></Match>

                            </>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default FixturesPage;
