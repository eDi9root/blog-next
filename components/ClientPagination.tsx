"use client"
import React from 'react'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useSearchParams } from 'next/navigation'
  
   
export default function ClientPagination() {

    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '5'

    const isActive = Number(page)

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
            href={`/?page=${Number(page) > 1 ? Number(page) - 1 : Number(page)}&per_page=${per_page}`}

            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/?page=1&per_page=${per_page}`} isActive={1 == isActive}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/?page=2&per_page=${per_page}`} isActive={2 == isActive}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/?page=3&per_page=${per_page}`} isActive={3 == isActive}>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
            href={`/?page=${Number(page) < Number(per_page) ? Number(page) + 1 : Number(page)}&per_page=${per_page}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}