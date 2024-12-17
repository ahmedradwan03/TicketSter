import React from 'react';
import { getAllStadiums } from '@/services/stadiums';
import CreateTeamForm from '@/components/TeamsForms/CreateTeamForm';
import { getAllTeams } from '@/services/teams';
import UpdateTeamForm from '@/components/TeamsForms/UpdateTeamForm';
import { TeamDto } from '@/app/lib/dtos';

export default async function Teams() {
    const stadiumsResponse = await getAllStadiums();
    const teamsResponse = await getAllTeams();

    return (
        <div className="w-[80%] mx-auto p-8 ">
            <CreateTeamForm stadiums={stadiumsResponse.stadiums} />
            {teamsResponse?.teams.map((team: TeamDto) => (
                <UpdateTeamForm key={team.id} team={team} stadiums={stadiumsResponse.stadiums} />
            ))}
        </div>
    );
}
