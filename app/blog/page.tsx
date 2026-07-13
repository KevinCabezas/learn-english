export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // const post = await getPost(slug)
 
  return (
    <div className="p-5">
      <h1>Page blog</h1>
    </div>
  )
}