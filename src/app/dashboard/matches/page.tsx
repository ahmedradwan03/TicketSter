import React from 'react';
import CreateMatchForm from '@/components/matchesForms/createMatchForm';
import UpdateMatchForm from '@/components/matchesForms/updateMatchForm';
import { getAllMatches } from '@/services/matches';
import { getAllTeams } from '@/services/teams';
import { getAllStadiums } from '@/services/stadiums';
import { MatchDto } from '@/app/lib/dtos';

export default async function Matches() {

    const matchesResponse = await getAllMatches();
    const teamsResponse = await getAllTeams();
    const stadiumsResponse = await getAllStadiums();

    return (
        <div className="w-[80%] mx-auto p-8 space-y-8">
            <CreateMatchForm
                teams={teamsResponse.teams}
                stadiums={stadiumsResponse.stadiums}
            />

            {matchesResponse?.matches.map((match: MatchDto) => (
                <UpdateMatchForm
                    key={match.id}
                    match={match}
                    teams={teamsResponse.teams}
                    stadiums={stadiumsResponse.stadiums}
                />
            ))}
        </div>
    );
}
