// import { useEffect, useState } from "react";
// import "../Style/List.css";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user?.user?.user);
//   const userId = user?._id;

//   const tripList = user?.tripList?.tripList;

//   console.log("Redux User State:", user);
//   console.log("Extracted userId:", userId);
//   console.log("Extracted tripList:", tripList);

//   const getTripList = async () => {
//     if (!userId) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/v1/users/${userId}/trips`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // ✅ Include authentication token if needed
//             Authorization: `Bearer ${user?.token || ""}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP Error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       dispatch(setTripList(data)); // ✅ Dispatch trips correctly
//     } catch (err) {
//       console.error("Fetch Trip List failed!", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId && tripList.length === 0) {
//       getTripList();
//     }
//   }, [userId]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//         {tripList.length === 0 ? (
//           <p>No trips found.</p>
//         ) : (
//           tripList.map((trip) => {
//             if (!trip.listingId) return null;
//             return (
//               <ListingCard
//                 key={trip.listingId._id}
//                 listingId={trip.listingId._id}
//                 creator={trip.listingId.creator}
//                 listingPhotosPaths={trip.listingId.photos || []}
//                 city={trip.listingId.location?.city || "Unknown City"}
//                 province={
//                   trip.listingId.location?.province || "Unknown Province"
//                 }
//                 country={trip.listingId.location?.country || "Unknown Country"}
//                 startDate={trip.startDate}
//                 endDate={trip.endDate}
//                 totalPrice={trip.totalPrice}
//                 booking={true}
//               />
//             );
//           })
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;

import { useEffect, useState, useMemo, useCallback } from "react";
import "../Style/List.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user?.user?._id);
  const tripList = useSelector((state) => state.user?.tripList);
  console.log("UserId: ", userId);
  // const user = useSelector((state) => state.user?.user?.user);
  // const userId = user?._id;
  // const tripList = useSelector((state) => state.user?.tripList);

  console.log(
    "Full Redux State:",
    useSelector((state) => state)
  );

  //console.log("Redux User State:", user);
  console.log("Extracted userId:", userId);
  console.log("Redux Trip List:", tripList);

  const getTripList = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${userId}/trips`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(setTripList(data));
    } catch (err) {
      console.error("Fetch Trip List failed!", err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      getTripList();
    }
  }, [userId]); // ✅ Removed tripList to prevent unwanted re-fetching

  const tripListData = useMemo(
    () => tripList.filter((trip) => trip.listingId),
    [tripList]
  );

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripListData.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          tripListData.map((trip) => (
            <ListingCard
              key={trip.listingId._id}
              listingId={trip.listingId._id}
              creator={trip.listingId.creator}
              listingPhotosPaths={trip.listingId.photos || []}
              city={trip.listingId.location?.city || "Unknown City"}
              province={trip.listingId.location?.province || "Unknown Province"}
              country={trip.listingId.location?.country || "Unknown Country"}
              startDate={trip.startDate}
              endDate={trip.endDate}
              totalPrice={trip.totalPrice}
              booking={true}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
