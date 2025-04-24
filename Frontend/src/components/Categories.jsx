import "../Style/Categories.css";
import { Link } from "react-router-dom";
import rentalCarImage from "../assets/pexels-tdcat-70912.jpg";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Our Rental Cars</h1>
      <p>
        Browse our selection of rental cars suited for every journey. Whether
        you need an economy car, a spacious SUV, or a luxury ride, we have
        something for you.
      </p>

      <div className="categories_list">
        <Link to="/cars" className="category-link">
          <div className="category">
            <img src={rentalCarImage} alt="Rental Cars" />
            {""}
            <div className="overlay"></div>
            <div className="category_text">
              <p>View All Cars</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
