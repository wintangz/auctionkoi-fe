import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: (number | string)[] = []

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      // Nếu tổng số trang ít hơn hoặc bằng 5, hiển thị tất cả các số trang
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Nếu tổng số trang lớn hơn 5
      pageNumbers.push(1) // Luôn hiển thị trang 1

      if (currentPage > 3) {
        // Thêm dấu "..." nếu cần
        pageNumbers.push('...')
      }

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Chỉ hiển thị trang cuối cùng nếu cần thiết
      if (currentPage < totalPages - 2) {
        pageNumbers.push(totalPages) // Luôn hiển thị trang cuối cùng
      }
    }
  }

  renderPageNumbers()

  return (
    <div className='flex justify-center mt-14 sm:mt-10 space-x-2'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'}`}
      >
        &lt;
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
          className={`px-4 py-2 border rounded ${
            currentPage === pageNumber ? 'bg-red text-white' : 'bg-white text-black hover:bg-red hover:text-white'
          }`}
          disabled={pageNumber === '...'} // Disable the button for "..."
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'
        }`}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
