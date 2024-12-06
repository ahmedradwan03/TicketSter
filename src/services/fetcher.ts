export const API_BASE_URL = process.env.SITE_DOMAIN || '';

export const fetcher = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return { success: false, message: errorData.message || 'An error occurred while processing the request.' };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        if (error instanceof Error) return { success: false, message: error.message };
        return { success: false, message: 'An unknown error occurred.' };
    }
};
