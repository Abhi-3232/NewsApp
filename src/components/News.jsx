import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const updateNews = async ()=> {

    props.useProgress(10);
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
    )
      .then((response) => {
        return (setLoading(true), response.json());
      }, props.useProgress(40))
      .then((data) => {
        setArticles(data.articles)
        setTotalResults(data.totalResults)
        setLoading(false) 
      },props.useProgress(70));
      props.useProgress(100)
  }

  useEffect(()=>{
    document.title = `NewsMonkey | ${props.category}`;
    updateNews();
    // eslint-disable-next-line
  },[])

  const fetchMoreData = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c792cd1af2ff456fbc380d8965181fda&page=${page+1}&pagesize=${props.pageSize}`,setPage(page + 1)
      )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
      });
  };

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

    return (
      <div className="container">
        <h3 className="text-center" style={{marginTop:"90px"}}> Top {capitalizeFirstLetter(props.category)} News</h3>
        {loading && <Loader/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loader />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 60) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 95)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      url={element.url}
                      author={!element.authore ? element.author : "Unknown"}
                      date={element.publishedAt ? element.publishedAt : ""}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
