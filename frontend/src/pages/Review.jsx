import { useState, useEffect } from 'react'
import ReviewList from '../components/ReviewBox'
import Header from '../components/Header';

const Review = () => {
  const [review, setReview] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    fetch('http://localhost:4000/add-review', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        UserUserID: document.cookie.split('=')[1],
        Review: review
      })
    }).then((res) => {
      if(!res.ok) return setMessage("An error Occured")
      return res.json()
    }).then((res) => {
      
    })
    setMessage("Thank you for your review! Refreshing...")

    setTimeout(() => {
      window.location.reload()
    }, 600)
  }

  return (
    <>
    <Header/>
    <div className="mx-8 flex flex-col items-center">
       <h1 className="font-bold text-3xl my-5">Add a Review</h1>
       <input type="sumbit" className='font-bold my-2 mx-0 p-4 border-2 border-black rounded-2xl w-1/2' value={review} onChange={(e) => setReview(e.target.value)} />
       <p className='font-bold'>{message}</p>
       <button className="font-bold relative top-2 border-none bg-red-400 px-5 py-4 rounded-lg cursor-pointer text-black" onClick={handleSubmit}>Submit</button>

       <ReviewList/>

       <div className='my-5'></div>
    </div>
    </>
  )
}

export default Review