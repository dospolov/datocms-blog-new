import { Metadata } from "next"
import { notFound } from "next/navigation"
// import { getAllPosts, getPostBySlug } from "@/lib/api"
import { CMS_NAME } from "@/lib/constants"
import markdownToHtml from "@/lib/markdownToHtml"
import Alert from "@/app/_components/alert"
import Container from "@/app/_components/container"
import Header from "@/app/_components/header"
import { PostHeader } from "@/app/_components/post-header"
import { responsiveImageFragment, metaTagsFragment } from "@/lib/fragments"
import { draftMode } from "next/headers"
import queryDatoCMS from "@/lib/queryDatoCMS"
import { PostBySlugDocument } from "~/graphql/types/graphql"
import { PostPage } from "@/app/_components/post-page"

const PAGE_CONTENT_QUERY = `
  query PostBySlug($slug: String) {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    post(filter: {slug: {eq: $slug}}) {
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
      content {
        value
        blocks {
          __typename
          ...on ImageBlockRecord {
            id
            image {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
    }

    morePosts: allPosts(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
      title
      slug
      excerpt
      date
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
          ...responsiveImageFragment
        }
      }
      author {
        name
        picture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
            ...responsiveImageFragment
          }
        }
      }
    }
  }

  ${responsiveImageFragment}
  ${metaTagsFragment}
`

export default async function Page({
  params,
}: PageProps<"/posts/[slug]">): Promise<React.ReactNode> {
  const { isEnabled } = await draftMode()
  const { slug } = await params

  const { post } = await queryDatoCMS(PostBySlugDocument, { slug }, isEnabled)
  console.log({ post })

  // const pageRequest = await getPageRequest(slug)
  // const data = await queryDatoCMS(PAGE_CONTENT_QUERY, { slug })

  // console.log({ data })

  // return <div>Hello</div>

  // if (isEnabled) {
  //   return (
  //     <DraftPostPage
  //       subscription={{
  //         ...pageRequest,
  //         initialData: data,
  //         token: process.env.NEXT_DATOCMS_API_TOKEN,
  //         environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
  //       }}
  //     />
  //   );
  // }

  return <PostPage post={post} />
}

// export default async function Post(props: Params) {
//   const params = await props.params
//   const post = getPostBySlug(params.slug)

//   if (!post) {
//     return notFound()
//   }

//   const content = await markdownToHtml(post.content || "")

//   return (
//     <main>
//       <Alert preview={post.preview} />
//       <Container>
//         <Header />
//         <article className="mb-32">
//           <PostHeader
//             title={post.title}
//             coverImage={post.coverImage}
//             date={post.date}
//             author={post.author}
//           />
//           <PostBody content={content} />
//         </article>
//       </Container>
//     </main>
//   )
// }

// type Params = {
//   params: Promise<{
//     slug: string
//   }>
// }

// export async function generateMetadata(props: Params): Promise<Metadata> {
//   const params = await props.params
//   const post = getPostBySlug(params.slug)

//   if (!post) {
//     return notFound()
//   }

//   const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`

//   return {
//     title,
//     openGraph: {
//       title,
//       images: [post.ogImage.url],
//     },
//   }
// }

// export async function generateStaticParams() {
//   const posts = getAllPosts()

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
