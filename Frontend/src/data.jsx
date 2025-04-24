import {
  FaCar,
  FaTruckPickup,
  FaMotorcycle,
  FaBus,
  FaCaravan,
  FaCarSide,
  FaTrailer,
  FaSnowplow,
} from "react-icons/fa";
import {
  GiElectric,
  GiSteeringWheel,
  GiGearStick,
  GiCarWheel,
  GiSpeedometer,
  GiFuelTank,
} from "react-icons/gi";
import { BiSolidTimeFive, BiWifi } from "react-icons/bi";
import {
  MdOutlineAir,
  MdGpsFixed,
  MdOutlineSecurity,
  MdPets,
} from "react-icons/md";
export const types = [
  {
    name: "Self-drive",
    description: "Drive the car yourself with flexible options.",
    icon: <GiSteeringWheel />,
  },
  {
    name: "Chauffeur-driven",
    description: "Relax while a professional driver handles the trip.",
    icon: <MdGpsFixed />,
  },
  {
    name: "Shared ride",
    description: "Share a vehicle with other passengers to reduce costs.",
    icon: <FaBus />,
  },
];

export const facilities = [
  {
    name: "Air Conditioning",
    icon: <MdOutlineAir />,
  },
  {
    name: "GPS Navigation",
    icon: <MdGpsFixed />,
  },
  {
    name: "Automatic Transmission",
    icon: <GiGearStick />,
  },
  {
    name: "Manual Transmission",
    icon: <GiSteeringWheel />,
  },
  {
    name: "Cruise Control",
    icon: <GiSpeedometer />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Child Seat",
    icon: <FaCarSide />,
  },
  {
    name: "Pet Friendly",
    icon: <MdPets />,
  },
  {
    name: "Security System",
    icon: <MdOutlineSecurity />,
  },
  {
    name: "Fuel Efficiency",
    icon: <GiFuelTank />,
  },
  {
    name: "Free Cancellation",
    icon: <BiSolidTimeFive />,
  },
  {
    name: "Bluetooth Connectivity",
    icon: <BiWifi />,
  },
  {
    name: "Parking Sensors",
    icon: <GiCarWheel />,
  },
  {
    name: "Heated Seats",
    icon: <FaCarSide />,
  },
  {
    name: "Panoramic Roof",
    icon: <FaCarSide />,
  },
  {
    name: "Luggage Rack",
    icon: <FaTrailer />,
  },
  {
    name: "Hands-Free Trunk",
    icon: <FaCarSide />,
  },
  {
    name: "Adaptive Headlights",
    icon: <GiCarWheel />,
  },
  {
    name: "Keyless Entry",
    icon: <GiCarWheel />,
  },
  {
    name: "Backup Camera",
    icon: <GiCarWheel />,
  },
  {
    name: "Tow Package",
    icon: <FaTruckPickup />,
  },
  {
    name: "Hybrid Engine",
    icon: <GiElectric />,
  },
  {
    name: "Rain Sensing Wipers",
    icon: <GiSpeedometer />,
  },
];
