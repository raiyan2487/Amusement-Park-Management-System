import React, { useEffect, useState } from 'react';

const boxDesign = {
  width: '95vw',
  height: 'auto',
  backgroundColor: '#f2f2f2',
  borderRadius: '4px',
  padding: '18px',
  marginTop: '8px',
  textAlign: 'left',
  fontSize: '18px'
}

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/fetch-review').then((res) => res.json())
      .then((res) => {
        setReviews(res)
      })
  }, [])

  return (
    <>
      <div className="my-8 w-full border border-y-gray-300"></div>
      <h1 className='font-bold text-2xl relative bottom-2'>Reviews</h1>

      <div>
        {reviews.map((review,i) => (
          <div style={boxDesign} key={i}>
            <strong>User:</strong> {review.UserUserID} <br />
            <strong>Review:</strong> {review.Review}
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewList;