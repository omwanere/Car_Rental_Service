import "../Style/List.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { setWishList } from "../redux/state"; // Make sure this action exists

const WishList = () => {
  const dispatch = useDispatch();

  // Get userId from Redux (or localStorage if needed)
  const userId =
    useSelector((state) => state.user?._id) || localStorage.getItem("userId");

  const wishList = useSelector((state) => state.user?.wishList || []);

  useEffect(() => {
    const fetchWishList = async () => {
      const token = localStorage.getItem("token");

      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/users/${userId}/wishlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      dispatch(setWishList(data.wishList)); // Assuming `data` contains `{ wishList: [...] }`
    };

    fetchWishList();
  }, [dispatch, userId]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList.map((listing) => (
          <ListingCard
            key={listing._id}
            listingId={listing._id}
            creator={listing.creator}
            listingPhotosPaths={listing.photos || []}
            city={listing.location?.city}
            province={listing.location?.province}
            country={listing.location?.country}
            type={listing.type}
            price={listing.description?.price}
            booking={false}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
