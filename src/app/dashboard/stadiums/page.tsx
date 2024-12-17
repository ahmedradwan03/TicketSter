import React from 'react';
import CreateStadiumForm from '@/components/StadiumsForms/createStadiumForm';
import { getAllStadiums } from '@/services/stadiums';
import { StadiumDto } from '@/app/lib/dtos';
import UpdateStadiumForm from '@/components/StadiumsForms/updateStadiumForm';

export default async function stadium() {
    const stadiumsResponse = await getAllStadiums();

    return (
        <div className="w-[80%] mx-auto p-8 ">
            <CreateStadiumForm />
            {stadiumsResponse?.stadiums.map((stadium: StadiumDto) => (
                <UpdateStadiumForm key={stadium.id} stadium={stadium} />
            ))}
        </div>
    );
}
