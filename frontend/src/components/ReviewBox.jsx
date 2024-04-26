import React, { useEffect, useState } from "react";

const boxDesign = {
    width: "95vw",
    height: "auto",
    backgroundColor: "#fabdb9",
    borderRadius: "4px",
    padding: "18px",
    marginTop: "8px",
    textAlign: "left",
    fontSize: "18px",
};

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/fetch-review")
            .then((res) => res.json())
            .then((res) => {
                setReviews(res);
            });
    }, []);

    return (
        <>
            <div className="my-8 w-full border border-y-gray-300"></div>
            <h1 className="font-bold text-2xl relative bottom-2">Reviews</h1>

            <div>
                {(() => {
                    let elementArr = [];

                    for (let i = reviews.length - 1; i >= 0; i--) {
                        elementArr.push(
                            <div style={boxDesign} key={i}>
                                <strong>User:</strong> {reviews[i].UserUserID}{" "}
                                <br />
                                <strong>Review:</strong> {reviews[i].Review}
                            </div>
                        );
                    }

                    console.log(elementArr);
                    return elementArr;
                })()}
            </div>
        </>
    );
};

export default ReviewList;
