import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import axios from "axios";
import "../Style/ListingDetails.css";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [Carlistings, setCarListings] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/cars/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setCarListings(data);
    } catch (error) {
      console.log("Fetch Listing Details Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(Carlistings);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)) || 1;

  const customerId = useSelector((state) => state.user?.user?._id);
  console.log("customerId", customerId);

  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   try {
  //     const bookingForm = {
  //       customerId,
  //       listingId,
  //       hostId: Carlistings?.creator?._id,
  //       startDate: dateRange[0].startDate.toDateString(),
  //       endDate: dateRange[0].endDate.toDateString(),
  //       totalPrice: Carlistings?.description?.price * dayCount,
  //     };

  //     const response = await fetch(
  //       "http://localhost:8000/api/v1/booking/booking",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(bookingForm),
  //       }
  //     );
  //     console.log("response", response);
  //     if (response.ok) {
  //       navigate(`/${customerId}/trips`);
  //     }
  //   } catch (error) {
  //     console.log("Submit Booking Failed.", error.message);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      if (!customerId) {
        alert("Please log in to book a car.");
        return;
      }

      const totalPrice = Carlistings?.description?.price * dayCount;

      if (!totalPrice || totalPrice <= 0) {
        alert("Invalid booking price. Please check your selected dates.");
        return;
      }

      // Step 1: Fetch Razorpay API Key
      const {
        data: { key },
      } = await axios.get("http://localhost:8000/api/getkey");

      // Step 2: Create Razorpay Order
      const {
        data: { order },
      } = await axios.post("http://localhost:8000/api/v1/payment/checkout", {
        amount: totalPrice,
      });

      // Step 3: Configure Razorpay Payment
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Car Rentals",
        description: `Booking for ${Carlistings?.description?.title}`,
        //image: "https://your-logo-url.com/logo.png",
        order_id: order.id,
        handler: async function (response) {
          // Step 4: Verify Payment on Backend
          const verifyResponse = await axios.post(
            "http://localhost:8000/api/v1/payment/paymentverification",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true } // Important for CORS!
          );

          if (verifyResponse.data.success) {
            // Step 5: Proceed with Booking if Payment is Successful
            const bookingForm = {
              customerId,
              listingId,
              hostId: Carlistings?.creator?._id,
              startDate: dateRange[0].startDate.toDateString(),
              endDate: dateRange[0].endDate.toDateString(),
              totalPrice: totalPrice,
            };

            const bookingResponse = await fetch(
              "http://localhost:8000/api/v1/booking/booking",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingForm),
              }
            );

            if (bookingResponse.ok) {
              alert("Booking Successful!");
              navigate(`/${customerId}/trips`);
            } else {
              alert("Booking Failed. Please contact support.");
            }
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: { address: "Car Rental Service" },
        theme: { color: "#121212" },
      };

      // Step 6: Open Razorpay Payment Window
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("Payment & Booking Failed", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <body>
        <div class="page-wrapper">
          <div class="listing-details">
            <div className="title">
              <h1>{Carlistings?.description?.title}</h1>
            </div>

            <div className="photos">
              {Carlistings?.photos?.map((item, index) => {
                const fixedPath = item.replace(/\\/g, "/"); // Convert backslashes to slashes
                const imageUrl = `http://localhost:8000/${fixedPath.replace(
                  "public/",
                  ""
                )}`;
                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`listing photo ${index + 1}`}
                  />
                );
              })}
            </div>

            <h2>
              {Carlistings?.type} in {Carlistings?.location?.city},{" "}
              {Carlistings?.location?.province},{" "}
              {Carlistings?.location?.country}
            </h2>

            <p>
              {Carlistings?.vehicleDetails?.make}{" "}
              {Carlistings?.vehicleDetails?.model} -{" "}
              {Carlistings?.vehicleDetails?.year} -{" "}
              {Carlistings?.vehicleDetails?.color}
            </p>
            <hr />

            <div className="profile">
              <h3>
                Hosted by{" "}
                {Carlistings?.creator
                  ? `${Carlistings.creator.FirstName} ${Carlistings.creator.LastName}`
                  : "Unknown Host"}
              </h3>
            </div>
            <hr />

            <h3>Description</h3>
            <p>{Carlistings?.description?.description}</p>
            <hr />

            {Carlistings?.highlight && (
              <>
                <h3>{Carlistings.highlight}</h3>
                <p>{Carlistings?.highlightDesc}</p>
                <hr />
              </>
            )}

            <div className="booking">
              <div>
                <h2>What this car offers?</h2>
                <div className="amenities">
                  {Carlistings?.amenities?.map((item, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {
                          facilities.find((facility) => facility.name === item)
                            ?.icon
                        }
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2>How long do you want to rent?</h2>
                <div className="date-range-calendar">
                  <DateRange
                    ranges={dateRange}
                    onChange={handleSelect}
                    minDate={new Date()}
                  />
                  {dayCount > 1 ? (
                    <h2>
                      ₹{Carlistings?.description?.price} x {dayCount} days
                    </h2>
                  ) : (
                    <h2>
                      ₹{Carlistings?.description?.price} x {dayCount} day
                    </h2>
                  )}

                  <h2>
                    Total price: ₹{Carlistings?.description?.price * dayCount}
                  </h2>
                  <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                  <p>End Date: {dateRange[0].endDate.toDateString()}</p>

                  <div className="button-wrapper">
                    <button
                      className="button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      BOOKING
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>

      <Footer />
    </>
  );
};

export default ListingDetails;
