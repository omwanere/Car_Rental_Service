import { useEffect, useState } from "react";
import "../Style/List.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?.user?._id);
  const reservationList = useSelector((state) => state.user?.reservationList);
  console.log("UserId: ", userId);
  console.log("Redux Reservation List:", reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      dispatch(setReservationList(data));
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) getReservationList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              key={listingId?._id}
              listingId={listingId?._id}
              creator={hostId?._id}
              listingPhotosPaths={listingId?.photos || []}
              city={listingId?.location?.city}
              province={listingId?.location?.province}
              country={listingId?.location?.country}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
