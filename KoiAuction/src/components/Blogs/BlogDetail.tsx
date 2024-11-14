import { useEffect, useState } from 'react'
import { Blog } from '../../types/Blog.type'
import http from '../../utils/http'
import { useParams } from 'react-router-dom'

export default function BlogDetail() {
  const { id } = useParams()
  const [blogPosts, setBlogPosts] = useState<Blog>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await http.get<{ message: string; value: Blog }>(`Blog/${id}`)
        setBlogPosts(response.data.value)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <main className='container mx-auto lg:px-14 lg:py-20 py-0 space-y-12 px-10 lg:mt-0 mt-10'>
        <div className='flex flex-col'>
          <div className='mb-6'>
            <h2 className='text-3xl font-semibold mb-4'>{blogPosts?.title}</h2>
            <div className='flex items-center space-x-4 mb-4'>
              <p className='text-xl text-gray-600'>By DHP</p>

              <p className='text-xl text-gray-500'>
                {blogPosts?.postedDate ? new Date(blogPosts?.postedDate).toLocaleDateString() : 'Ngày chưa xác định'}
              </p>
            </div>
            <p className='text-xl text-black' style={{ textAlign: 'justify' }}>
              {blogPosts?.content}
            </p>
          </div>
          <div className='mb-6'>
            <img src={blogPosts?.urlImage} alt='Blog Post Image' className='w-full h-auto object-cover rounded-lg' />
          </div>
        </div>
      </main>
    </div>
  )
}
