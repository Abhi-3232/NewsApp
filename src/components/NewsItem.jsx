import React from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, url,author, date} = props;
    return (
      <div className="card my-2" >
        <img src={!imageUrl?"https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={url} className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    );
}

export default NewsItem;