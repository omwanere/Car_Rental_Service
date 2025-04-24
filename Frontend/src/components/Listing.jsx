import { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCarListings } from "../redux/state";
import "../Style/Listing.css";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const listings = useSelector((state) => state.carListings.carListings) || [];

  const getFeedListings = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/cars", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await response.json();
      dispatch(setCarListings({ listings: data }));
    } catch (error) {
      console.log("Fetch Listings Failed", error.message);
      dispatch(setCarListings({ listings: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              photos,
              location: { city, province, country },
              type,
              description: { price },
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creatorId={creator?._id} // Pass only the creator's _id for comparisons
                creatorName={`${creator?.FirstName} ${creator?.LastName}`} // Optional - if you want to show in UI
                listingPhotosPaths={photos}
                city={city}
                province={province}
                country={country}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
