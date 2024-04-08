import React from 'react'
import { Badge } from '@/components/ui/badge';


export function splitTags(tags: string) {
    return tags.split(",").map((tag) => tag.trim());
}


export function TagsList({tags, badgeType} :
  {tags: string[],
  badgeType?: "default" | "secondary" | "outline" | "destructive"}
) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant={badgeType} className="w-fit">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
