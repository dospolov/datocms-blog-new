import Container from "@/app/_components/container"
import { HeroPost } from "@/app/_components/hero-post"
import { Intro } from "@/app/_components/intro"
import { MoreStories } from "@/app/_components/more-stories"
import { getAllPosts } from "@/lib/api"
import { HomePageDocument } from "~/graphql/types/graphql"
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments"
import queryDatoCMS from "@/lib/queryDatoCMS"

// const PAGE_CONTENT_QUERY = `
//   {
//     site: _site {
//       favicon: faviconMetaTags {
//         ...metaTagsFragment
//       }
//     }
//     blog {
//       seo: _seoMetaTags {
//         ...metaTagsFragment
//       }
//     }
//     allPosts(orderBy: date_DESC, first: 20) {
//       title
//       slug
//       excerpt
//       date
//       coverImage {
//         responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
//           ...responsiveImageFragment
//         }
//       }
//       author {
//         name
//         picture {
//           responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
//             ...responsiveImageFragment
//           }
//         }
//       }
//     }
//   }

//   ${metaTagsFragment}
//   ${responsiveImageFragment}
// `

export default async function Index() {
  const { allPosts } = await queryDatoCMS(HomePageDocument)

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  console.log({ heroPost })

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
