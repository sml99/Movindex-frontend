import Image from 'next/image';
import Search from './components/Search';
import { getMovies } from '@/lib/data/search';
import Link from 'next/link';

export default async function Home({
    searchParams: { query },
}: {
    searchParams: { query: string };
}) {
    const movies = await getMovies(query);
    console.log('🚀 ~ Home ~ query:', query);
    console.log('🚀 ~ movies:', movies);

    return (
        <div className="min-w-[400px] flex flex-col items-center justify-center">
            <h1 className="mb-4">Movindex</h1>
            {/* Search input */}
            <Search placeholder="Looking for movies..." />
            {/* Movies */}
            <div className="w-[80vw] min-w-[400px] flex flex-col flex-wrap justify-center">
                {movies.map((movie: any) => (
                    <div
                        key={movie.id}
                        className="m-4 flex flex-col items-start bg-gray-50 rounded-md shadow-md p-4"
                    >
                        <h2 className="mb-2 capitalize text-lg font-bold">
                            {movie.title}
                        </h2>
                        <p className="mb-4 flex flex-wrap gap-3 py-2">
                            {movie.keyWords
                                .split(' ')
                                .filter(
                                    (word: string) =>
                                        word &&
                                        word?.trim()?.length > 2 &&
                                        word.match(/[a-zA-Z0-9]/)
                                )
                                .map((word: string) => (
                                    <span
                                        key={word}
                                        className="bg-gray-200  rounded-md mx-1 px-1"
                                    >
                                        {word.trim()}
                                    </span>
                                ))}
                        </p>
                        <Link
                            href={movie.url ?? ''}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" px-2 py-2 bg-blue-500 rounded-sm mt-8  text-white hover:bg-blue-600 transition-all duration-200 ease-in-out"
                        >
                            View on IMDB &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
