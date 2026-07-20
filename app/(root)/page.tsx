"use client";

import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import {useEffect, useState} from "react";

export default function Home() {

  const {data, isLoading, error} = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>Hale hula haha
      {JSON.stringify(data)/* <ModeToggle/>
      <UserButton/> */}

    </div>

  );
}
