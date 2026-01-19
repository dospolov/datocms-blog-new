"use client"

import {
  PostBySlugDocument,
  type PostBySlugQuery,
} from "~/graphql/types/graphql"
import { useQuerySubscription } from "react-datocms/use-query-subscription"
import { PostPage } from "@/app/_components/post-page"

export default function RealTime({
  slug,
  data,
}: {
  slug: string
  data: PostBySlugQuery
}) {
  const variables = { slug }

  const subscription = useQuerySubscription({
    query: PostBySlugDocument,
    variables,
    token: process.env.NEXT_DATOCMS_READONLY_API_TOKEN!,
    initialData: data,
    preview: true,
  })

  return (
    <PostPage
      post={subscription.data?.post}
      morePosts={subscription.data?.morePosts ?? []}
    />
  )
}
