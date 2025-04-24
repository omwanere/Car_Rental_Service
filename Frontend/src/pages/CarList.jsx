// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import { useEffect, useState } from "react";
// import { setCarList } from "../redux/state";
// import Loader from "../components/Loader";
// import Footer from "../components/Footer";
// import "../Style/List.css";

// const CarList = () => {
//   const [loading, setLoading] = useState(true);
//   const carList = useSelector((state) => state.user?.user?.carList || []);

//   const dispatch = useDispatch();
//   const getCarListings = async () => {
//     if (!user?.user?._id) return;
//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/v1/users/${user.user._id}/cars`,
//         {
//           method: "GET",
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data);
//       dispatch(setCarList({ carList: data }));
//     } catch (error) {
//       console.log("Fetch all cars failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.user?._id) getCarListings();
//   }, [user?.user?._id]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Car List</h1>
//       <div className="list">
//         {carList?.map(
//           ({
//             _id,
//             creator,
//             photos,
//             location: { city, province, country },
//             type,
//             description: { price },
//             booking = false,
//           }) => (
//             <ListingCard
//               key={_id}
//               listingId={_id}
//               creator={creator}
//               listingPhotosPaths={photos || []}
//               city={city}
//               province={province}
//               country={country}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default CarList;

import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setCarList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "../Style/List.css";

const CarList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user);
  console.log("User from Redux before rendering:", user);
  const carList = useSelector((state) => state.user?.carList?.carList || []);
  const userId = user?.user?._id;
  console.log("User ID from Redux before rendering:", userId);
  //const carList = useSelector((state) => state.user?.carList);
  console.log("Type of carList:", typeof carList);
  console.log("CarList actual data:", carList);

  const getCarListings = async () => {
    if (!userId) {
      console.log("No user ID found, skipping API call.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/${userId}/cars`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Cars from API:", data); // ✅ Log API response

      dispatch(setCarList({ carList: data }));
    } catch (error) {
      console.log("Fetch all cars failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fix: Correct useEffect dependencies
  useEffect(() => {
    if (userId) getCarListings(userId);
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Car List</h1>
      <div className="list">
        {carList?.map(
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
              creator={creator}
              listingPhotosPaths={photos || []}
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
      <Footer />
    </>
  );
};

export default CarList;
