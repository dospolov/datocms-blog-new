import type { PostBySlugQuery } from "~/graphql/types/graphql"
import Header from "./header"
import { PostHeader } from "./post-header"
import { PostBody } from "./post-body"
import { MoreStories } from "./more-stories"
import Container from "./container"

export function PostPage({
  post,
  morePosts,
}: {
  post: PostBySlugQuery["post"]
  morePosts: PostBySlugQuery["morePosts"]
}) {
  return (
    <Container>
      <Header />
      <article>
        <PostHeader
          title={post?.title ?? ""}
          coverImage={post?.coverImage?.responsiveImage?.src ?? ""}
          date={post?.date ?? ""}
          author={post?.author}
        />
        <PostBody content={post?.content} />
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  )
}
