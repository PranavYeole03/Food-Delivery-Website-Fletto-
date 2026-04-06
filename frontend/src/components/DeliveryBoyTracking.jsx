// import React from "react";
// import scooter from "../assets/scooter.png";
// import home from "../assets/home.png";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   Marker,
//   Polyline,
//   Popup,
//   TileLayer,
// } from "react-leaflet";

// /* ================= ICONS ================= */
// const deliveryBoyIcon = new L.Icon({
//   iconUrl: scooter,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// const customerIcon = new L.Icon({
//   iconUrl: home,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

// /* ================= COMPONENT ================= */
// const DeliveryBoyTracking = ({ data }) => {
//   // 🛑 SAFETY CHECK (MOST IMPORTANT FIX)
//   if (
//     !data ||
//     !data.deliveryBoyLocation ||
//     !data.customerLocation ||
//     data.deliveryBoyLocation.lat == null ||
//     data.deliveryBoyLocation.lon == null ||
//     data.customerLocation.lat == null ||
//     data.customerLocation.lon == null
//   ) {
//     return (
//       <div className="w-full h-64 mt-3 rounded-xl flex items-center justify-center bg-gray-100 text-gray-500">
//         Loading map…
//       </div>
//     );
//   }

//   const { lat: deliveryBoyLat, lon: deliveryBoyLon } =
//     data.deliveryBoyLocation;
//   const { lat: customerLat, lon: customerLon } = data.customerLocation;

//   const path = [
//     [deliveryBoyLat, deliveryBoyLon],
//     [customerLat, customerLon],
//   ];

//   const center = [deliveryBoyLat, deliveryBoyLon];

//   return (
//     <div className="w-full h-64 mt-3 rounded-xl overflow-hidden shadow-md">
//       <MapContainer
//         className="w-full h-full"
//         center={center}
//         zoom={16}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
//           <Popup>Delivery Partner</Popup>
//         </Marker>

//         <Marker position={[customerLat, customerLon]} icon={customerIcon}>
//           <Popup>Customer</Popup>
//         </Marker>

//         <Polyline positions={path} color="#2563eb" weight={4} />
//       </MapContainer>
//     </div>
//   );
// };

// export default DeliveryBoyTracking;

import React, { useEffect } from "react";
import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

/* ICONS */
const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/* AUTO FIX MAP */
const FixMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 16);
    setTimeout(() => {
      map.invalidateSize(); // 🔥 IMPORTANT FIX
    }, 200);
  }, [lat, lon]);

  return null;
};

const DeliveryBoyTracking = ({ data }) => {
  if (
    !data ||
    !data.deliveryBoyLocation ||
    !data.customerLocation
  ) {
    return (
      <div className="w-full h-64 rounded-xl flex items-center justify-center bg-gray-100">
        Loading map...
      </div>
    );
  }

  const deliveryBoyLat = data.deliveryBoyLocation.lat;
  const deliveryBoyLon = data.deliveryBoyLocation.lon;

  const customerLat = data.customerLocation.lat;
  const customerLon = data.customerLocation.lon;

  if (
    deliveryBoyLat == null ||
    deliveryBoyLon == null ||
    customerLat == null ||
    customerLon == null
  ) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
        Location not available
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow">
      <MapContainer
        center={[deliveryBoyLat, deliveryBoyLon]}
        zoom={16}
        className="w-full h-full"
      >
        <FixMap lat={deliveryBoyLat} lon={deliveryBoyLon} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
          <Popup>Delivery Boy</Popup>
        </Marker>

        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>Customer</Popup>
        </Marker>

        <Polyline
          positions={[
            [deliveryBoyLat, deliveryBoyLon],
            [customerLat, customerLon],
          ]}
          color="#2563eb"
        />
      </MapContainer>
    </div>
  );
};

export default DeliveryBoyTracking;