import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import "../Menupage.css"; // Import custom CSS for responsive styles
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode"; // Import QR code library
import ScrollAnimation from 'react-animate-on-scroll';

function Menupage() {
  const { id } = useParams();
  const [menu, setMenuData] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Fetch menu data and restaurant name
  const handleApi = async () => {
    try {
      const response = await axios.get(`https://menu-qr-server.vercel.app/home/${id}`);
      setRestaurantName(response.data.restaurantname);
      setMenuData(response.data.menulistdata);
    } catch (err) {
      console.log("fetching error", err);
    }
  };

  // Generate QR code for the restaurant URL
  const generateQrCode = async () => {
    try {
      const url = `https://menuqrweb.vercel.app/${id}`; // Replace with your menu page URL format
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (err) {
      console.error("QR code generation error:", err);
    }
  };

  useEffect(() => {
    handleApi();
    generateQrCode();
    document.title = restaurantName ? `${restaurantName} - Menu` : "Loading...";
  }, [restaurantName]);

  return (
    <div className="bg-red-400">
      <div className="items-center justify-center flex flex-col">
        <h1 className="text-4xl text-zinc-200 font-semibold mt-2">
          {restaurantName}
        </h1>
        <h1 className="text-zinc-200">Developed By Tathagata Nayak</h1>
      </div>
      <div style={{ backgroundColor: "red", height: 1 }}></div>
      <div className="flex">
        <div className="space-x-8 m-2 ml-4 text-zinc-200 font-semibold">
          <NavLink to={`/${id}/comments`}>Comments</NavLink>
        </div>
        <div className="space-x-8 m-2 ml-4 text-zinc-200 font-semibold">
          <a href={qrCodeUrl} download={`${restaurantName}-QR.png`}>
            Download QR
          </a>
        </div>
      </div>
      <div gap={3} className="p-4">
        <ScrollAnimation animateIn="fadeIn" delay={1}>
        {menu.map((item, index) => (
          <Cards dishname={item.dishname} price={item.price} key={index} />
        ))}
        </ScrollAnimation>
      </div>
    </div>
  );
}

export default Menupage;
