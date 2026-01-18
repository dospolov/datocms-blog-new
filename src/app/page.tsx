import Container from "@/app/_components/container"
import { HeroPost } from "@/app/_components/hero-post"
import { Intro } from "@/app/_components/intro"
import { MoreStories } from "@/app/_components/more-stories"
import { HomePageDocument } from "~/graphql/types/graphql"
import queryDatoCMS from "@/lib/queryDatoCMS"
import { draftMode } from "next/headers"

export default async function Index() {
  const { isEnabled: isDraft } = await draftMode()
  console.log({ isDraft })
  const data = await queryDatoCMS(HomePageDocument, {}, isDraft)
  const allPosts = data.allPosts

  console.log({ data })

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title ?? ""}
          coverImage={heroPost.coverImage?.responsiveImage?.src ?? ""}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  )
}
