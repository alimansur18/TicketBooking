import { Link } from "react-router-dom"

const Movie = (props) => {

    const { id, title, image, language, rating } = props.data;

    return (
            <div className="col-sm-4" >
                <div className="card" style={{ width: '14rem', margin: '2rem' }}>
                    <Link to={"/movies/" + id + "/"}>
                        <div style={{ width: 'auto', height: '18rem', display: 'flex', justifyContent: 'center' }}>
                            <img src={image} className="card-img-top" alt={title} />
                        </div>
                    </Link>
                    <div className="card-body" style={{ display: 'inline-block' }}>
                        <h5 className="card-title">{title} </h5>
                        <h6 className="card-subtitle text-muted"> {rating}</h6>
                        <p className="card-text"> {language}</p>
                    </div>
                </div>
            </div>
    )
}

  export default Movie;
