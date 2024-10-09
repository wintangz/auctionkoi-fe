import { useState } from 'react'
import Pagination from '../Pagination/Pagination'

const BlogPost = ({ title, date, excerpt }: { title: string; date: string; excerpt: string }) => (
  <article className='border border-gray-200 rounded-lg overflow-hidden'>
    <img
      src='https://firebasestorage.googleapis.com/v0/b/koiaution.appspot.com/o/HomePage%2FBlogKoi1.png?alt=media&token=1502433d-7db5-465c-8fa5-07592db8f1da'
      alt='Koi fish in a pond'
      className='w-full h-auto object-cover'
    />
    <div className='p-4'>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <p className='text-sm text-gray-600 mb-2'>{date}</p>
      <p className='mb-4'>{excerpt}</p>
      <a href='#' className='text-red-600 hover:underline'>
        Read More »
      </a>
    </div>
  </article>
)

export default function Blogs() {
  const blogPosts = [
    // Example blog posts array
    {
      title: 'Japanese Koi Buying Trip - 2020',
      date: 'April 6, 2020',
      excerpt:
        'Japanese Koi Buying Trip 2020 This year we heard that there might be a shortage of small koi available, so we made the decision to...'
    },
    {
      title: 'Koi Pond Maintenance Tips',
      date: 'March 10, 2021',
      excerpt:
        'Learn how to maintain your koi pond for optimal health and beauty. We share essential tips for keeping your pond clean and your koi happy.'
    },
    {
      title: 'The Beauty of Koi Colors',
      date: 'February 15, 2022',
      excerpt: 'Explore the various colors and patterns of koi fish and learn how they affect their value and appeal.'
    },
    {
      title: 'Feeding Your Koi: What You Need to Know',
      date: 'January 5, 2023',
      excerpt:
        'Proper nutrition is vital for the health of your koi. Discover the best foods and feeding practices to ensure your koi thrive.'
    },
    {
      title: 'The History of Koi Fish',
      date: 'December 20, 2023',
      excerpt: 'Dive into the rich history of koi fish, their origins, and their significance in various cultures.'
    }
    // You can add more posts here
  ]

  const postsPerPage = 2 // Adjust the number of posts per page
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
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
          <p className='mb-6' style={{ textAlign: 'justify' }}>
            Dive into a vibrant online community where creativity and passion flourish. At KoiBlogs, we celebrate the
            art of storytelling, providing a platform for writers, artists, and enthusiasts to share their thoughts,
            experiences, and insights.
          </p>

          <p className='mb-6' style={{ textAlign: 'justify' }}>
            Explore a diverse range of topics, from lifestyle and travel to technology and personal development. Our
            user-friendly interface and supportive community make it easy to share your unique voice and engage with
            readers. Join us today and let your ideas flow in the tranquil waters of KoiBlogs!
          </p>

          <div className='grid md:grid-cols-2 gap-6 mb-6 lg:mt-20 mt-10'>
            {currentPosts.map((post, index) => (
              <BlogPost key={index} title={post.title} date={post.date} excerpt={post.excerpt} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </main>
    </div>
  )
}
