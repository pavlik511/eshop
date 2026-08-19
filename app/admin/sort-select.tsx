'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';

interface SortSelectProps {
  currentSort: string;
  showNewest?: boolean; // Optional prop (přidáno pro uživatelské menu)
}

export function SortSelect({ currentSort, showNewest = true }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={isPending ? 'opacity-60' : 'opacity-100'}>
      <select 
        name="sort" 
        value={currentSort}
        disabled={isPending}
        onChange={handleSortChange}
        className="border border-gray-300 rounded p-2 text-xs text-gray-700 bg-white focus:ring-2 focus:ring-brand-primary outline-none cursor-pointer font-medium"
      >
        {/* Zobrazí se JEN když je showNewest true */}
        {showNewest && <option value="newest">Nejnovější</option>}
        
        <option value="price_asc">Od nejlevnější</option>
        <option value="price_desc">Od nejdražší</option>
        <option value="name_asc">Abecedně (A-Z)</option>
      </select>
    </div>
  );
}