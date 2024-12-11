import MatchCard from '../../components/MatchCard';
import { getAllMatches } from '../../services/matches';
import { MatchDto } from '../lib/dtos';


export default async function allMatches() {

    const { matches, message } = await getAllMatches();
    if (!matches) return message;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col gap-3 items-center justify-center p-4">
            {matches && matches.length > 0 ? (
                matches.map((match:MatchDto) => (
                    <MatchCard key={match.id} match={match} />
                ))
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
                    <h2 className="text-red-600 text-3xl font-semibold mb-4">
                        {message || 'No matches found.'}
                    </h2>
                </div>)}
        </div>

    );
}
