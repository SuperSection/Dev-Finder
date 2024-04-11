"use client";

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { badgeVariants } from '@/components/ui/badge';


export function TagsList({tags, badgeType} :
  {tags: string[],
  badgeType?: "default" | "secondary" | "outline" | "destructive"}
) {

  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          className={cn(badgeVariants({ variant: badgeType }))}
          onClick={() => {
            router.push(`/dev-rooms?search=${tag}`);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
