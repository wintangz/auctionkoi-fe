import { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination'
import { Blog } from '../../types/Blog.type'
import http from '../../utils/http'
import { Link } from 'react-router-dom'

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const postsPerPage = 2
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await http.get<{ message: string; value: Blog[] }>('Blog/Blogs')
        setBlogPosts(response.data.value)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen bg-white flex flex-col justify-between'>
      <main className='container mx-auto lg:px-14 lg:py-20 py-0 space-y-12 px-10 lg:mt-0 mt-10'>
        <div className='md:w-1/3'>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FBlogsBanner.png?alt=media&token=59296605-598a-4245-8e6e-e2a5a5d5bde2'
            alt='Blogs banner'
            className='w-full h-auto'
          />
        </div>

        <main>
          <h2 className='text-xl font-semibold mb-2'>Welcome to our Koi blog</h2>
          <p className='mb-6 text-xl text-black' style={{ textAlign: 'justify' }}>
            Dive into a vibrant online community where creativity and passion flourish. At KoiBlogs, we celebrate the
            art of storytelling, providing a platform for writers, artists, and enthusiasts to share their thoughts,
            experiences, and insights.
          </p>

          <p className='mb-6 text-xl text-black' style={{ textAlign: 'justify' }}>
            Explore a diverse range of topics, from lifestyle and travel to technology and personal development. Our
            user-friendly interface and supportive community make it easy to share your unique voice and engage with
            readers. Join us today and let your ideas flow in the tranquil waters of KoiBlogs!
          </p>

          <div className='grid md:grid-cols-2 gap-6 mb-6 lg:mt-20 mt-10'>
            {currentPosts.map((post) => {
              const postedDate = new Date(post.postedDate)
              const date = postedDate.toLocaleDateString()
              const time = postedDate.toLocaleTimeString()

              return (
                <article key={post.id} className='border border-gray-200 rounded-lg overflow-hidden'>
                  <img
                    src={post.urlImage}
                    alt={post.title}
                    className='w-full h-56 object-cover' // Set a fixed height and ensure consistent aspect ratio
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold mb-2'>{post.title}</h3>
                    <p className='text-sm text-gray-600 mb-2'>{date}</p>
                    <p className='text-sm text-gray-600 mb-2'>{time}</p>
                    <p className='mb-4 text-base text-black line-clamp-3'>{post.content}</p>
                    <Link to={`/blog-detail/${post.id}`} className='text-red-600 hover:underline'>
                      Read more...
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </main>
    </div>
  )
}
