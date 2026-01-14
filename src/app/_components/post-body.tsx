// import { StructuredText, Image as DatocmsImage } from "react-datocms"
import type { PostRecord } from "~/graphql/types/graphql"
import { StructuredText as StructuredTextField } from "react-datocms/structured-text"

export function PostBody({
  content,
}: {
  content: PostRecord["content"] | null | undefined
}) {
  if (!content) return null

  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue" id="main-content">
        <StructuredTextField data={content as any} />
        {/* <StructuredText
          data={content}
          renderBlock={({ record }) => {
            // if (record.__typename === "ImageBlockRecord") {
            //   return <DatocmsImage data={record.image.responsiveImage} />
            // }

            return (
              <>
                <p>Don&apos;t know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            )
          }}
        /> */}
      </div>
    </div>
  )
}
