import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: number[] = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

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
          key={pageNumber} // Use pageNumber as the key instead of index for better performance
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 border rounded ${
            currentPage === pageNumber ? 'bg-red text-white' : 'bg-white text-black hover:bg-red hover:text-white'
          }`}
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
