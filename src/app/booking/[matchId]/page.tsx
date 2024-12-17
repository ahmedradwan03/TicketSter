import React from 'react';
import { getMatch } from '@/services/matches';
import BookingForm from '@/components/BookingForm/BookingForm';
import { getUser } from '@/app/lib/dal';

export default async function booking({ params }: { params: { matchId: number } }) {
    const matchResponse = await getMatch(Number(params.matchId));
    const user = await getUser();

    return (
        <div>
            <BookingForm match={matchResponse.match} userId={user ? user.id : 0} />
        </div>
    );
}
