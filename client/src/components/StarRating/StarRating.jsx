import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const ratingStyle = {
  display: "flex",
  gap: "4px",
};

export default function StarRating({
  maxRating = 5,
  color = "#f42b56",
  size = 42,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
  editRating = false,
  showRating = true,
}) {
  const textStyle = {
    color: `#2e2e2e`,
  };

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleClick(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={ratingStyle}>
        {Array.from({ length: maxRating }).map((_, index) => {
          return (
            <Star
              key={index}
              onClick={editRating && handleClick}
              onHoverIn={
                editRating ? () => setTempRating(index + 1) : undefined
              }
              onHoverOut={editRating ? () => setTempRating(0) : undefined}
              rating={index + 1}
              full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      {showRating && (
        <span style={textStyle}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </span>
      )}
    </div>
  );
}

export function Star({
  onClick,
  rating,
  full,
  onHoverIn,
  onHoverOut,
  color,
  size,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      style={starStyle}
      role="button"
      onClick={() => onClick(rating)}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
