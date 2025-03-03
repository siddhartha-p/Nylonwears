function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? 'bi bi-star-fill'
              : rating >= 0.5
              ? 'bi bi-star-half'
              : 'bi bi-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'bi bi-star-fill'
              : rating >= 1.5
              ? 'bi bi-star-half'
              : 'bi bi-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'bi bi-star-fill'
              : rating >= 2.5
              ? 'bi bi-star-half'
              : 'bi bi-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'bi bi-star-fill'
              : rating >= 3.5
              ? 'bi bi-star-half'
              : 'bi bi-star'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'bi bi-star-fill'
              : rating >= 4.5
              ? 'bi bi-star-half'
              : 'bi bi-star'
          }
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <small>
          <span className="small text-white"> ({numReviews} reviews)</span>
        </small>
      )}
    </div>
  );
}

export default Rating;
