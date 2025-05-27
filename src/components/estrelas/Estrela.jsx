"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/StarRating.css"

const StarRating = ({ initialRating = 0, totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleClick = (starIndex) => {
    const newRating = starIndex + 1
    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1
        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? "filled" : "empty"}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            role="button"
            aria-label={`Avaliar com ${starValue} ${starValue === 1 ? "estrela" : "estrelas"}`}
          >
            ★
          </span>
        )
      })}
      <span className="rating-value ms-2">({rating})</span>
    </div>
  )
}

export default StarRating
