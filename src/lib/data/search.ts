export const getMovies = async (query: string) => {
    const url = `${process.env.API_URL}/search?query=${query}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error('There was an error!', error);
    }
};
