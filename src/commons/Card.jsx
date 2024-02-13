const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src={
              data.email
                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                : data.poster_path
                ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                : "https://ih1.redbubble.net/image.4786164722.8625/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            }
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          {data.email ? (
            <p style={{ whiteSpace: "pre-line" }} className="title is-size-6">
              {data.name} {data.lastname}
            </p>
          ) : (
            <p style={{ whiteSpace: "pre-line" }} className="title is-size-6">
              {data.title ? data.title : data.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
