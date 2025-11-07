"use client";

import { useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

type Review = {
  name: string;
  username: string;
  body: string;
  img: string;
  stars: number;
};

const ReviewCard = ({
  img,
  name,
  username,
  body,
  stars,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  stars: number;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "max-h-[170px] transition-all duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt=""
          src={img}
          loading="lazy"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
          <p className="flex absolute right-5 text-sm">{stars.toString()}/5</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-ellipsis">{body}</blockquote>
    </figure>
  );
};

type ReviewsResponse = {
  reviews: Review[];
  average: number;
};

const reviewsQueryKey = ["reviews"] as const;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

async function fetchReviews(): Promise<ReviewsResponse> {
  try {
    const response = await fetch("/api/reviews", { method: "GET" });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const payload = (await response.json()) as Partial<ReviewsResponse>;
    const reviews = Array.isArray(payload?.reviews)
      ? (payload.reviews as Review[])
      : [];
    const average = typeof payload?.average === "number" ? payload.average : 0;

    return { reviews, average };
  } catch {
    return { reviews: [], average: 0 };
  }
}

function ReviewMarqueeContent() {
  const { data } = useSuspenseQuery({
    queryKey: reviewsQueryKey,
    queryFn: fetchReviews,
  });

  const { reviews, average } = data;

  const [firstRow, secondRow] = useMemo(() => {
    const mid = Math.floor(reviews.length / 2);
    return [reviews.slice(0, mid), reviews.slice(mid)];
  }, [reviews]);

  const memoizedFirstMarquee = useMemo(
    () => (
      <Marquee className="[--duration:500s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    ),
    [firstRow]
  );

  const memoizedSecondMarquee = useMemo(
    () => (
      <Marquee reverse className="[--duration:500s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    ),
    [secondRow]
  );

  const averageScore = Number.isFinite(average) ? average : 0;

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Average mspaint rating: {averageScore.toFixed(2)} ⭐
      </p>

      <div className="relative py-10 flex w-screen flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl text-left">
        {memoizedFirstMarquee}
        {memoizedSecondMarquee}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </>
  );
}

export default function ReviewMarquee() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReviewMarqueeContent />
    </QueryClientProvider>
  );
}
