import { draftMode } from "next/headers"
import RealTime from "./RealTime"
// import { PostPage } from "@/app/_components/post-page"
import queryDatoCMS from "@/lib/queryDatoCMS"
import { PostBySlugDocument } from "~/graphql/types/graphql"

export default async function Page({
  params,
}: PageProps<"/posts/[slug]">): Promise<React.ReactNode> {
  const { isEnabled: isDraft } = await draftMode()
  const { slug } = await params

  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isDraft)

  return <RealTime slug={slug} data={data} />
}
