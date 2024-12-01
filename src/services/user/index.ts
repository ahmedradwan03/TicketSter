export const getAllmatches = async () => {
    const response = await fetch(`${process.env.SITE_DOMIN || ''}/api/matches`, {
        method: 'GET',
    });
    if (!response.ok) {
        const errorData = await response.json();
        return { matches: [], message: errorData.message || 'An error occurred while fetching matches.' };
    }


    const data = await response.json();
    return { matches: data.matches, message: data.message || 'Matches retrieved successfully.' };
};
