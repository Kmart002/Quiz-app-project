import React from 'react'
import Images from '../Images/tickokay.jpg'


const Header = () => {
  return (
    <div>
    <header className=' flex mt-5 justify-center gap-[13rem]'>
    <div>
    <div className="logo w-[5rem] ">
    <img src={Images} alt='logo'/>
    </div>
    <h2 className=' text-[2.3rem] text-green-500 font-bold'>Congratulations you made it!</h2>
    
    </div>
    <div><button className=' bg-green-500 text-white px-2 h-8 mt-10 rounded-[5px]'>Correct Answer</button></div>
    </header>
    <main className=' mx-auto mt-[10rem] flex  justify-center w-[50%] bg-gray-300'>
      <section className='mt-[3rem] '>
      <h3 className=' text-[1.6rem] text-gray-800 flex justify-center'>You can do better</h3>
      <h2 className=' mt-[2rem] text-[3rem] text-blue-500'> Your Score: 67%</h2>
      <div className=''>
      <p className=' flex justify-between'> <span>Total Number of Questions:</span> <span>15</span></p>
      <p className=' flex justify-between'> <span>Number of attempted questions:</span> <span>15</span></p>
      <p className=' flex justify-between'> <span>Number of Correct Answer:</span> <span>10</span></p>
      <p className=' flex justify-between'> <span>Number of Wrong Answers:</span> <span>5</span></p>
      <p className=' flex justify-between'> <span>Hint used:</span> <span>0 out of 5</span></p>
      <p className=' flex justify-between'> <span>50-50 used:</span> <span>1 out of 2</span></p>
      </div>
      </section>
    </main>
    </div>
  )
}

export default Header