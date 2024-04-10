"use client";

import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import searchSchema, { SearchBarType } from '@/validators/search.schema';
import { useEffect } from 'react';


export default function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get("search");

  const searchbar = useForm<SearchBarType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: search ?? "",
    },
  });

  const { register, control, handleSubmit } = searchbar;

  
  useEffect(() => {
    searchbar.setValue("search", search ?? "");
  }, [searchbar, search]);


  async function onSearch(values: SearchBarType) {
    if (values.search) {
      router.push(`/?search=${values.search}`);
    } else {
      router.push("/dev-rooms");
    }
  }


  return (
    <Form {...searchbar}>
      <form className="flex gap-3" onSubmit={handleSubmit(onSearch)}>
        <FormField
          control={control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  {...register("search")}
                  placeholder="Filter rooms by keywords, such as typescript, nextjs, java"
                  className="w-[50vw]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="pr-1 mr-1" /> Search
        </Button>

        {query.get("search") && (
          <Button
            variant="outline"
            onClick={() => {
              searchbar.setValue("search", "");
              router.push("/dev-rooms");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
