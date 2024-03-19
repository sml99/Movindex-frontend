'use client';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({
    placeholder = 'search admins',
}: {
    placeholder: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);

        inputRef.current?.focus();
    }, 300);

    return (
        <div className="relative w-full">
            <Input
                className="peer block w-full py-2 pl-10 shadow-md  hover:shadow-lg focus:shadow-lg transition-all duration-200 ease-in-out rounded-md"
                id="search"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}
