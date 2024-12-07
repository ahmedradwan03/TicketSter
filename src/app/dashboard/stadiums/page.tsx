import React from 'react';
import CreateStadiumForm from '@/components/stadiumsForms/createStadiumForm';
import UpdateStadium from '@/components/stadiumsForms/updateStadium';

export default function stadium() {
    return (
        <div className="w-[80%] mx-auto p-8 ">
            <CreateStadiumForm />
            <UpdateStadium/>
        </div>
    );
}

