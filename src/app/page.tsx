import Hero from '@/components/Hero/Hero';
import HomeMatches from '../components/HomeMatches/HomeMatches';
import { getAllMatches } from '@/services/matches';

export default async function Home() {

    const matchesResponse = await getAllMatches();

    return (
        <div>
            <Hero />
            <HomeMatches matches={matchesResponse.matches}
                         message={!matchesResponse.success ? matchesResponse.message : ''} />
        </div>
    );
}
