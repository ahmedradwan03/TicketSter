export const getAllmatches = async () => {
    try {
        const response = await fetch(`api/user/matches`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error in getting all matches', error);
        return [];
    }
};
