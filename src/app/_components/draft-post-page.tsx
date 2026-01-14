"use client"

import { useQuerySubscription } from "react-datocms/use-query-subscription"
import { PostPage } from "./post-page"
import type { PostBySlugQuery } from "~/graphql/types/graphql"

export function DraftPostPage({
  subscription,
  post,
}: {
  subscription: any
  post: PostBySlugQuery["post"]
}) {
  const { data } = useQuerySubscription(subscription)

  return <PostPage post={data.post} />
}
