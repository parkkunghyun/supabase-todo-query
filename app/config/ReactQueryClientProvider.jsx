"use client";
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const ReactQueryClientProvider = ({children}) => {
  return (
      <QueryClientProvider client={queryClient}>
          {children}
    </QueryClientProvider>
  )
}

export default ReactQueryClientProvider