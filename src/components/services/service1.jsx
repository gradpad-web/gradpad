import React from 'react'

const Service1 = () => {
  return (
    <div className="lg:max-w-5xl xl:max-w-7xl mx-auto px-3 py-10">
      <h1 className='text-2xl md:text-4xl font-semibold capitalize mb-3 sm:mb-5 dark:text-white md:px-3'>Service1</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
        <div className='md:px-3 dark:text-neutral-300'>
          <p className='mb-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <p className='mb-5'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
          <p className='mb-5'>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </div>
        <div className='md:px-3'>
          <img className='w-full rounded-xl' src='https://assets.aceternity.com/demos/algochurn.webp' alt='service 1 name' />
        </div>
      </div>
    </div>
  )
}

export default Service1