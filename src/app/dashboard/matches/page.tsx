import React from 'react';
import CreateMatchForm from '@/components/matchesForms/createMatchForm';
import UpdateMatchForm from '@/components/matchesForms/updateMatchForm';

export default function matchs() {
    return (
        <div className="w-[80%] mx-auto p-8 ">
            <CreateMatchForm />
            <UpdateMatchForm />
        </div>
    );
}
