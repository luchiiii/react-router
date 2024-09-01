import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to="#" className="btn btn-primary">
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
