import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinners from './Spinners'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ff30a3ce59f4046bf184e534b26701e&page=${page}&pageSize=${props.pageSize}`;
        // setLoading(true)
        let data = await fetch(url);
        let ParseData = await data.json();
        console.log(ParseData);
        setArticles(ParseData.articles)
        setLoading(false)
        settotalResults(ParseData.totalResults);
    }

    useEffect(() => {

        updateNews();   // eslint-disable-next-line
    }, [])


    // const clickNext = async () => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ff30a3ce59f4046bf184e534b26701e&page=${page + 1}&pageSize=${props.pageSize}`;
    //     setLoading(true)
    //     let data = await fetch(url);
    //     let ParseData = await data.json();
    //     console.log(ParseData);
    //     setArticles(ParseData.articles)
    //     setLoading(false)
    //     setTotalResult(ParseData.totalResult);
    //     setPage(page + 1)
    // }

    // const clickPrev = async () => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ff30a3ce59f4046bf184e534b26701e&page=${page - 1}&pageSize=${props.pageSize}`;
    //     setLoading(true)
    //     let data = await fetch(url);
    //     let ParseData = await data.json();
    //     console.log(ParseData);
    //     setArticles(ParseData.articles)
    //     setLoading(false)
    //     setTotalResult(ParseData.totalResult);
    //     setPage(page - 1)
    // }
    const fetchMoreData = async() =>{
        // if(articles.length < totalResult){
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ff30a3ce59f4046bf184e534b26701e&page=${page + 1}&pageSize=${props.pageSize}`;
        // setLoading(true)
        let data = await fetch(url);
        let ParseData = await data.json();
        // console.log(ParseData);
        setArticles(articles.concat(ParseData.articles))
        settotalResults(ParseData.totalResults);
        // concat(articles)
        setPage(page + 1)
    // }
    // else
    // setLoading(false)
    
    }

    return (
        <>
            <h1 className="text-center mb-3">Todays... Top Headlines</h1>
            {loading && <Spinners />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinners />}
                >
                <div className="container my-2">
                <div className="row">{
                    articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title?.slice(0, 70)} description={element.description?.slice(0, 120)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                        </div>
                    })
                }
                </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between my-3">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={clickPrev}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResult / props.pageSize)} type="button" className="btn btn-dark" onClick={clickNext}> Next &rarr;</button>
            </div> */}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 12,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News