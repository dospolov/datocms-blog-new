import { draftMode } from "next/headers"
import queryDatoCMS from "@/lib/queryDatoCMS"
import { PostBySlugDocument } from "~/graphql/types/graphql"
import { PostPage } from "@/app/_components/post-page"

export default async function Page({
  params,
}: PageProps<"/posts/[slug]">): Promise<React.ReactNode> {
  const { isEnabled } = await draftMode()
  const { slug } = await params

  const { post, morePosts } = await queryDatoCMS(
    PostBySlugDocument,
    { slug },
    isEnabled,
  )

  return <PostPage post={post} morePosts={morePosts ?? []} />
}
