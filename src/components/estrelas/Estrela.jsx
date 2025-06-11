import { useState } from "react"

const StarRating = ({ initialRating = 0, totalStars = 5, onRatingChange, size = "normal", readonly = false }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleClick = (starIndex) => {
    if (readonly) return

    const newRating = starIndex + 1
    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  const handleKeyDown = (event, starIndex) => {
    if (readonly) return

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleClick(starIndex)
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "star-rating-small"
      case "large":
        return "star-rating-large"
      default:
        return ""
    }
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

      <div className={`star-rating ${getSizeClass()} ${readonly ? "readonly" : ""}`}>
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1
          const isActive = starValue <= (hover || rating)

          return (
            <span
              key={index}
              className={`star ${isActive ? "filled" : ""} ${readonly ? "readonly" : ""}`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => !readonly && setHover(starValue)}
              onMouseLeave={() => !readonly && setHover(0)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role={readonly ? "img" : "button"}
              tabIndex={readonly ? -1 : 0}
              aria-label={
                readonly
                  ? `Avaliação: ${rating} de ${totalStars} ${totalStars === 1 ? "estrela" : "estrelas"}`
                  : `Avaliar com ${starValue} ${starValue === 1 ? "estrela" : "estrelas"}`
              }
              title={
                readonly
                  ? `Avaliação: ${rating}/${totalStars}`
                  : `Clique para avaliar com ${starValue} ${starValue === 1 ? "estrela" : "estrelas"}`
              }
            >
              ★
            </span>
          )
        })}

        {rating > 0 && (
          <span className="rating-value ms-2 text-muted-custom">
            ({rating}/{totalStars})
          </span>
        )}
      </div>
    </>
  )
}

export default StarRating
