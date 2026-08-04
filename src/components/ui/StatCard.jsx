import React from 'react'

function StatCard({
  title,
  value,
}) {
  return (
    <>
        <section>
  <div
    className="
      bg-white
      border border-gray-300
      rounded-2xl
      p-6
      hover:scale-105
      transition-all
      duration-300
      ease-in-out
      cursor-pointer
    "
  >
    <p className="text-sm font-medium text-gray-500">
      {title}
    </p>

    <h3 className="mt-3 text-3xl font-bold text-gray-800">
      {value}
    </h3>
  </div>
</section>
    </>
  )
}

export default StatCard