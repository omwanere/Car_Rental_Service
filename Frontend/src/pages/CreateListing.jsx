import "../Style/CreateListing.css";
import Navbar from "../components/Navbar";
import { types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCarList } from "../redux/state";

const CreateListing = () => {
  const [type, setType] = useState("");
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    city: "",
    province: "",
    country: "",
  });
  const [vehicleDetails, setVehicleDetails] = useState({
    model: "",
    make: "",
    year: 0,
    color: "",
    registrationNumber: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  console.log(user);
  const creatorId = user?._id;
  console.log("Creator ID:", creatorId);

  const navigate = useNavigate();

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({ ...formLocation, [name]: value });
  };

  const handleChangeVehicleDetails = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({ ...vehicleDetails, [name]: value });
  };

  const handleSelectAmenities = (facility) => {
    setAmenities((prev) =>
      prev.includes(facility)
        ? prev.filter((option) => option !== facility)
        : [...prev, facility]
    );
  };

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({ ...formDescription, [name]: value });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("model", vehicleDetails.model);
      listingForm.append("make", vehicleDetails.make);
      listingForm.append("year", vehicleDetails.year);
      listingForm.append("color", vehicleDetails.color);
      listingForm.append(
        "registrationNumber",
        vehicleDetails.registrationNumber
      );
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      const response = await fetch("http://localhost:8000/api/v1/cars/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        const newCarList = await fetch(
          `http://localhost:8000/api/v1/users/${creatorId}/cars`
        );
        const updatedCars = await newCarList.json();
        dispatch(setCarList({ carList: updatedCars }));
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish Your Car Rental</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h3>What type of car is it?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="create-listing_step2">
            <h2>Provide car and location details</h2>
            <hr />
            <h3>Where is your car located?</h3>
            <div className="location-fields">
              <input
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                value={formLocation.streetAddress}
                onChange={handleChangeLocation}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formLocation.city}
                onChange={handleChangeLocation}
                required
              />
              <input
                type="text"
                name="province"
                placeholder="Province"
                value={formLocation.province}
                onChange={handleChangeLocation}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formLocation.country}
                onChange={handleChangeLocation}
                required
              />
            </div>
            <h3>Provide car details</h3>
            <div className="vehicle-details">
              <input
                type="text"
                name="model"
                placeholder="Car Model"
                value={vehicleDetails.model}
                onChange={handleChangeVehicleDetails}
                required
              />
              <input
                type="text"
                name="make"
                placeholder="Car Make"
                value={vehicleDetails.make}
                onChange={handleChangeVehicleDetails}
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={vehicleDetails.year}
                onChange={handleChangeVehicleDetails}
                required
              />
              <input
                type="text"
                name="color"
                placeholder="Car Color"
                value={vehicleDetails.color}
                onChange={handleChangeVehicleDetails}
                required
              />
              <input
                type="text"
                name="registrationNumber"
                placeholder="Registration Number"
                value={vehicleDetails.registrationNumber}
                onChange={handleChangeVehicleDetails}
                required
              />
            </div>
            <h3>Select car amenities</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your car</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="uploaded photo"
                                  />
                                  <RemoveCircleOutline
                                    className="remove"
                                    onClick={() => handleRemovePhoto(index)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="create-listing_step3">
            <h2>Step 3: Write your listing description</h2>
            <hr />
            <input
              type="text"
              name="title"
              placeholder="Listing Title"
              value={formDescription.title}
              onChange={handleChangeDescription}
              required
            />
            <textarea
              name="description"
              placeholder="Describe your car"
              value={formDescription.description}
              onChange={handleChangeDescription}
              required
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price per day"
              value={formDescription.price}
              onChange={handleChangeDescription}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
