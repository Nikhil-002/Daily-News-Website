import React from 'react'
import image from './no_image.jpg'

const NewsItem = (props) => {

    return (
        <div>
            <div className="card">
                <img src={props.imageUrl ? props.imageUrl : image} className="card-img-top" alt=" " />
                <div className="card-body">
                    <h5 className="card-title">{props.title}...</h5>
                    <p className="card-text">{props.description}...</p>
                    <p className="card-text"><small className="text-body-secondary">Updated {new Date(props.publishedAt).toDateString()} by {props.author}</small></p>
                    <a href={props.newsUrl} className="btn btn-sm btn-dark">Read more...</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem