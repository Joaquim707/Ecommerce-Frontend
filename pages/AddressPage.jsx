// // import React, { useState } from "react";

// // const AddressPage = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     mobileNumber: "",
// //     pinCode: "",
// //     houseNumber: "",
// //     address: "",
// //     locality: "",
// //     city: "",
// //     state: "",
// //     addressType: "Home",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [cartSummary] = useState({
// //     totalMRP: 11997,
// //     discount: 9240,
// //     platformFee: 0,
// //     totalAmount: 2757,
// //     itemsCount: 3,
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //     if (errors[name]) {
// //       setErrors({
// //         ...errors,
// //         [name]: "",
// //       });
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.name.trim()) newErrors.name = "Name is required";
// //     if (!formData.mobileNumber.trim()) {
// //       newErrors.mobileNumber = "Mobile number is required";
// //     } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
// //       newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
// //     }
// //     if (!formData.pinCode.trim()) {
// //       newErrors.pinCode = "Pin code is required";
// //     } else if (!/^\d{6}$/.test(formData.pinCode)) {
// //       newErrors.pinCode = "Please enter a valid 6-digit pin code";
// //     }
// //     if (!formData.houseNumber.trim())
// //       newErrors.houseNumber = "House number is required";
// //     if (!formData.address.trim()) newErrors.address = "Address is required";
// //     if (!formData.locality.trim()) newErrors.locality = "Locality is required";
// //     if (!formData.city.trim()) newErrors.city = "City is required";
// //     if (!formData.state.trim()) newErrors.state = "State is required";

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSave = async () => {
// //     if (validateForm()) {
// //       try {
// //         const token = localStorage.getItem("token");
// //         // Make API call to save address and create order
// //         console.log("Saving address:", formData);
// //         alert("Address saved successfully!");
// //         // Navigate to payment or confirmation page
// //       } catch (error) {
// //         console.error("Error saving address:", error);
// //         alert("Failed to save address. Please try again.");
// //       }
// //     }
// //   };

// //   const handleCancel = () => {
// //     window.location.href = "/cart";
// //   };

// //   return (
// //     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
// //       {/* Header */}
// //       <div
// //         style={{
// //           backgroundColor: "white",
// //           borderBottom: "1px solid #e0e0e0",
// //           padding: "16px 0",
// //           marginBottom: "24px",
// //         }}
// //       >
// //         <div
// //           style={{
// //             maxWidth: "1200px",
// //             margin: "0 auto",
// //             padding: "0 16px",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //           }}
// //         >
// //           <h1
// //             style={{
// //               fontSize: "32px",
// //               fontWeight: "bold",
// //               color: "#ff3f6c",
// //               margin: 0,
// //             }}
// //           >
// //             M
// //           </h1>
// //           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //             <svg
// //               style={{ width: "20px", height: "20px", color: "#4caf50" }}
// //               fill="currentColor"
// //               viewBox="0 0 20 20"
// //             >
// //               <path
// //                 fillRule="evenodd"
// //                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
// //                 clipRule="evenodd"
// //               />
// //             </svg>
// //             <span style={{ fontWeight: 600, fontSize: "12px" }}>
// //               100% SECURE
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Stepper */}
// //       <div
// //         style={{ maxWidth: "1200px", margin: "0 auto 24px", padding: "0 16px" }}
// //       >
// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "center",
// //             alignItems: "center",
// //             gap: "40px",
// //           }}
// //         >
// //           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //             <div
// //               style={{
// //                 width: "32px",
// //                 height: "32px",
// //                 borderRadius: "50%",
// //                 backgroundColor: "#ff3f6c",
// //                 color: "white",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontWeight: "600",
// //               }}
// //             >
// //               ✓
// //             </div>
// //             <span
// //               style={{ fontWeight: 600, fontSize: "14px", color: "#ff3f6c" }}
// //             >
// //               BAG
// //             </span>
// //           </div>
// //           <div
// //             style={{ width: "80px", height: "2px", backgroundColor: "#ff3f6c" }}
// //           ></div>
// //           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //             <div
// //               style={{
// //                 width: "32px",
// //                 height: "32px",
// //                 borderRadius: "50%",
// //                 backgroundColor: "#ff3f6c",
// //                 color: "white",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontWeight: "600",
// //               }}
// //             >
// //               2
// //             </div>
// //             <span
// //               style={{ fontWeight: 600, fontSize: "14px", color: "#ff3f6c" }}
// //             >
// //               ADDRESS
// //             </span>
// //           </div>
// //           <div
// //             style={{ width: "80px", height: "2px", backgroundColor: "#bdbdbd" }}
// //           ></div>
// //           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// //             <div
// //               style={{
// //                 width: "32px",
// //                 height: "32px",
// //                 borderRadius: "50%",
// //                 backgroundColor: "#bdbdbd",
// //                 color: "white",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 fontWeight: "600",
// //               }}
// //             >
// //               3
// //             </div>
// //             <span
// //               style={{ fontWeight: 600, fontSize: "14px", color: "#bdbdbd" }}
// //             >
// //               PAYMENT
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       <div
// //         style={{
// //           maxWidth: "1200px",
// //           margin: "0 auto",
// //           padding: "0 16px 120px",
// //         }}
// //       >
// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "1fr 400px",
// //             gap: "24px",
// //           }}
// //         >
// //           {/* Left Section - Form */}
// //           <div
// //             style={{
// //               backgroundColor: "white",
// //               padding: "24px",
// //               border: "1px solid #e0e0e0",
// //             }}
// //           >
// //             {/* Contact Details */}
// //             <h3
// //               style={{
// //                 fontWeight: 700,
// //                 fontSize: "14px",
// //                 marginBottom: "16px",
// //                 marginTop: 0,
// //               }}
// //             >
// //               CONTACT DETAILS
// //             </h3>

// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Name*"
// //               value={formData.name}
// //               onChange={handleChange}
// //               style={{
// //                 width: "100%",
// //                 padding: "12px",
// //                 marginBottom: "8px",
// //                 border: errors.name ? "1px solid #f44336" : "1px solid #e0e0e0",
// //                 borderRadius: "4px",
// //                 fontSize: "14px",
// //                 boxSizing: "border-box",
// //               }}
// //             />
// //             {errors.name && (
// //               <p
// //                 style={{
// //                   color: "#f44336",
// //                   fontSize: "12px",
// //                   margin: "0 0 16px 0",
// //                 }}
// //               >
// //                 {errors.name}
// //               </p>
// //             )}

// //             <input
// //               type="text"
// //               name="mobileNumber"
// //               placeholder="Mobile No*"
// //               value={formData.mobileNumber}
// //               onChange={handleChange}
// //               maxLength="10"
// //               style={{
// //                 width: "100%",
// //                 padding: "12px",
// //                 marginBottom: "8px",
// //                 border: errors.mobileNumber
// //                   ? "1px solid #f44336"
// //                   : "1px solid #e0e0e0",
// //                 borderRadius: "4px",
// //                 fontSize: "14px",
// //                 boxSizing: "border-box",
// //               }}
// //             />
// //             {errors.mobileNumber && (
// //               <p
// //                 style={{
// //                   color: "#f44336",
// //                   fontSize: "12px",
// //                   margin: "0 0 16px 0",
// //                 }}
// //               >
// //                 {errors.mobileNumber}
// //               </p>
// //             )}

// //             <hr
// //               style={{
// //                 border: "none",
// //                 borderTop: "1px solid #e0e0e0",
// //                 margin: "24px 0",
// //               }}
// //             />

// //             {/* Address */}
// //             <h3
// //               style={{
// //                 fontWeight: 700,
// //                 fontSize: "14px",
// //                 marginBottom: "16px",
// //                 marginTop: 0,
// //               }}
// //             >
// //               ADDRESS
// //             </h3>

// //             <input
// //               type="text"
// //               name="pinCode"
// //               placeholder="Pin Code*"
// //               value={formData.pinCode}
// //               onChange={handleChange}
// //               maxLength="6"
// //               style={{
// //                 width: "100%",
// //                 padding: "12px",
// //                 marginBottom: "8px",
// //                 border: errors.pinCode
// //                   ? "1px solid #f44336"
// //                   : "1px solid #e0e0e0",
// //                 borderRadius: "4px",
// //                 fontSize: "14px",
// //                 boxSizing: "border-box",
// //               }}
// //             />
// //             {errors.pinCode && (
// //               <p
// //                 style={{
// //                   color: "#f44336",
// //                   fontSize: "12px",
// //                   margin: "0 0 16px 0",
// //                 }}
// //               >
// //                 {errors.pinCode}
// //               </p>
// //             )}

// //             <input
// //               type="text"
// //               name="houseNumber"
// //               placeholder="House Number/Tower/Block*"
// //               value={formData.houseNumber}
// //               onChange={handleChange}
// //               style={{
// //                 width: "100%",
// //                 padding: "12px",
// //                 marginBottom: "4px",
// //                 border: errors.houseNumber
// //                   ? "1px solid #f44336"
// //                   : "1px solid #e0e0e0",
// //                 borderRadius: "4px",
// //                 fontSize: "14px",
// //                 boxSizing: "border-box",
// //               }}
// //             />
// //             {errors.houseNumber && (
// //               <p
// //                 style={{
// //                   color: "#f44336",
// //                   fontSize: "12px",
// //                   margin: "0 0 4px 0",
// //                 }}
// //               >
// //                 {errors.houseNumber}
// //               </p>
// //             )}
// //             <p
// //               style={{
// //                 fontSize: "11px",
// //                 color: "#ff9800",
// //                 margin: "0 0 16px 8px",
// //               }}
// //             >
// //               *House Number will allow a doorstep delivery
// //             </p>

// //             <input
// //               type="text"
// //               name="address"
// //               placeholder="Address (locality,building,street)**"
// //               value={formData.address}
// //               onChange={handleChange}
// //               style={{
// //                 width: "100%",
// //                 padding: "12px",
// //                 marginBottom: "4px",
// //                 border: errors.address
// //                   ? "1px solid #f44336"
// //                   : "1px solid #e0e0e0",
// //                 borderRadius: "4px",
// //                 fontSize: "14px",
// //                 boxSizing: "border-box",
// //               }}
// //             />
// //             {errors.address && (
// //               <p
// //                 style={{
// //                   color: "#f44336",
// //                   fontSize: "12px",
// //                   margin: "0 0 4px 0",
// //                 }}
// //               >
// //                 {errors.address}
// //               </p>
// //             )}
// //             <p
// //               style={{
// //                 fontSize: "11px",
// //                 color: "#ff9800",
// //                 margin: "0 0 16px 8px",
// //               }}
// //             >
// //               *Please update society/apartment details
// //             </p>

// //             <input
// //               type="text"
// //               name="locality"
// //               placeholder="Locality / Town*"
// //               value={formData.locality}
// //               onChange={handleChange}
// //               style={{
// //                 width: "100%",
// //                 padding: "12px",
// //                 marginBottom: "8px",
// //                 border: errors.locality
// //                   ? "1px solid #f44336"
// //                   : "1px solid #e0e0e0",
// //                 borderRadius: "4px",
// //                 fontSize: "14px",
// //                 boxSizing: "border-box",
// //               }}
// //             />
// //             {errors.locality && (
// //               <p
// //                 style={{
// //                   color: "#f44336",
// //                   fontSize: "12px",
// //                   margin: "0 0 16px 0",
// //                 }}
// //               >
// //                 {errors.locality}
// //               </p>
// //             )}

// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "1fr 1fr",
// //                 gap: "16px",
// //                 marginBottom: "16px",
// //               }}
// //             >
// //               <div>
// //                 <input
// //                   type="text"
// //                   name="city"
// //                   placeholder="City / District*"
// //                   value={formData.city}
// //                   onChange={handleChange}
// //                   style={{
// //                     width: "100%",
// //                     padding: "12px",
// //                     border: errors.city
// //                       ? "1px solid #f44336"
// //                       : "1px solid #e0e0e0",
// //                     borderRadius: "4px",
// //                     fontSize: "14px",
// //                     boxSizing: "border-box",
// //                   }}
// //                 />
// //                 {errors.city && (
// //                   <p
// //                     style={{
// //                       color: "#f44336",
// //                       fontSize: "12px",
// //                       margin: "4px 0 0 0",
// //                     }}
// //                   >
// //                     {errors.city}
// //                   </p>
// //                 )}
// //               </div>
// //               <div>
// //                 <input
// //                   type="text"
// //                   name="state"
// //                   placeholder="State*"
// //                   value={formData.state}
// //                   onChange={handleChange}
// //                   style={{
// //                     width: "100%",
// //                     padding: "12px",
// //                     border: errors.state
// //                       ? "1px solid #f44336"
// //                       : "1px solid #e0e0e0",
// //                     borderRadius: "4px",
// //                     fontSize: "14px",
// //                     boxSizing: "border-box",
// //                   }}
// //                 />
// //                 {errors.state && (
// //                   <p
// //                     style={{
// //                       color: "#f44336",
// //                       fontSize: "12px",
// //                       margin: "4px 0 0 0",
// //                     }}
// //                   >
// //                     {errors.state}
// //                   </p>
// //                 )}
// //               </div>
// //             </div>

// //             <hr
// //               style={{
// //                 border: "none",
// //                 borderTop: "1px solid #e0e0e0",
// //                 margin: "24px 0",
// //               }}
// //             />

// //             {/* Address Type */}
// //             <h3
// //               style={{
// //                 fontWeight: 700,
// //                 fontSize: "14px",
// //                 marginBottom: "16px",
// //                 marginTop: 0,
// //               }}
// //             >
// //               ADDRESS TYPE
// //             </h3>

// //             <div style={{ display: "flex", gap: "24px" }}>
// //               <label
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <input
// //                   type="radio"
// //                   name="addressType"
// //                   value="Home"
// //                   checked={formData.addressType === "Home"}
// //                   onChange={handleChange}
// //                   style={{
// //                     marginRight: "8px",
// //                     accentColor: "#ff3f6c",
// //                     width: "18px",
// //                     height: "18px",
// //                   }}
// //                 />
// //                 <span style={{ fontSize: "14px" }}>Home</span>
// //               </label>
// //               <label
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 <input
// //                   type="radio"
// //                   name="addressType"
// //                   value="Work"
// //                   checked={formData.addressType === "Work"}
// //                   onChange={handleChange}
// //                   style={{
// //                     marginRight: "8px",
// //                     accentColor: "#ff3f6c",
// //                     width: "18px",
// //                     height: "18px",
// //                   }}
// //                 />
// //                 <span style={{ fontSize: "14px" }}>Work</span>
// //               </label>
// //             </div>
// //           </div>

// //           {/* Right Section - Price Details */}
// //           <div
// //             style={{
// //               backgroundColor: "white",
// //               padding: "20px",
// //               border: "1px solid #e0e0e0",
// //               height: "fit-content",
// //               position: "sticky",
// //               top: "16px",
// //             }}
// //           >
// //             <h3
// //               style={{
// //                 fontWeight: 700,
// //                 fontSize: "12px",
// //                 color: "#757575",
// //                 marginBottom: "16px",
// //                 marginTop: 0,
// //               }}
// //             >
// //               PRICE DETAILS ({cartSummary.itemsCount} Items)
// //             </h3>

// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 marginBottom: "12px",
// //               }}
// //             >
// //               <span style={{ fontSize: "14px" }}>Total MRP</span>
// //               <span style={{ fontSize: "14px" }}>
// //                 ₹{cartSummary.totalMRP.toLocaleString()}
// //               </span>
// //             </div>

// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 marginBottom: "12px",
// //               }}
// //             >
// //               <span style={{ fontSize: "14px" }}>Discount on MRP</span>
// //               <span style={{ fontSize: "14px", color: "#4caf50" }}>
// //                 -₹{cartSummary.discount.toLocaleString()}
// //               </span>
// //             </div>

// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 marginBottom: "12px",
// //               }}
// //             >
// //               <div>
// //                 <span style={{ fontSize: "14px" }}>Platform Fee </span>
// //                 <span
// //                   style={{
// //                     fontSize: "12px",
// //                     color: "#ff3f6c",
// //                     cursor: "pointer",
// //                     fontWeight: 600,
// //                   }}
// //                 >
// //                   Know More
// //                 </span>
// //               </div>
// //               <span style={{ fontSize: "14px", color: "#4caf50" }}>FREE</span>
// //             </div>

// //             <hr
// //               style={{
// //                 border: "none",
// //                 borderTop: "1px solid #e0e0e0",
// //                 margin: "16px 0",
// //               }}
// //             />

// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 marginBottom: "16px",
// //               }}
// //             >
// //               <span style={{ fontWeight: 700, fontSize: "16px" }}>
// //                 Total Amount
// //               </span>
// //               <span style={{ fontWeight: 700, fontSize: "16px" }}>
// //                 ₹{cartSummary.totalAmount.toLocaleString()}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom Action Bar */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           bottom: 0,
// //           left: 0,
// //           right: 0,
// //           backgroundColor: "white",
// //           borderTop: "1px solid #e0e0e0",
// //           padding: "16px 0",
// //           zIndex: 1000,
// //           boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
// //         }}
// //       >
// //         <div
// //           style={{
// //             maxWidth: "1200px",
// //             margin: "0 auto",
// //             padding: "0 16px",
// //             display: "grid",
// //             gridTemplateColumns: "1fr 1fr",
// //             gap: "16px",
// //           }}
// //         >
// //           <button
// //             onClick={handleCancel}
// //             style={{
// //               padding: "12px",
// //               border: "1px solid #e0e0e0",
// //               backgroundColor: "white",
// //               color: "#424242",
// //               fontWeight: 600,
// //               fontSize: "16px",
// //               cursor: "pointer",
// //               borderRadius: "4px",
// //             }}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSave}
// //             style={{
// //               padding: "12px",
// //               border: "none",
// //               backgroundColor: "#ff3f6c",
// //               color: "white",
// //               fontWeight: 600,
// //               fontSize: "16px",
// //               cursor: "pointer",
// //               borderRadius: "4px",
// //             }}
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddressPage;

// import React, { useState, useEffect } from "react";

// const AddressPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNumber: "",
//     pinCode: "",
//     houseNumber: "",
//     address: "",
//     locality: "",
//     city: "",
//     state: "",
//     addressType: "Home",
//   });

//   const [errors, setErrors] = useState({});
//   const [cartSummary, setCartSummary] = useState({
//     totalMRP: 0,
//     discount: 0,
//     platformFee: 0,
//     totalAmount: 0,
//     itemsCount: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [cartItems, setCartItems] = useState([]);

//   // Fetch cart data on component mount
//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   const fetchCartData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:5000/api/cart/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to load cart");
//       }

//       const items = data.items || [];
//       setCartItems(items);

//       // Calculate totals from cart items
//       let totalMRP = 0;
//       let totalAmount = 0;
//       let itemsCount = 0;

//       items.forEach((item) => {
//         if (item.productId) {
//           const itemMRP =
//             (item.productId.mrp || item.productId.price) * item.quantity;
//           const itemPrice = item.productId.price * item.quantity;

//           totalMRP += itemMRP;
//           totalAmount += itemPrice;
//           itemsCount += item.quantity;
//         }
//       });

//       const discount = totalMRP - totalAmount;

//       setCartSummary({
//         totalMRP,
//         discount,
//         platformFee: 0,
//         totalAmount,
//         itemsCount,
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       alert("Failed to load cart data");
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.mobileNumber.trim()) {
//       newErrors.mobileNumber = "Mobile number is required";
//     } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
//       newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
//     }
//     if (!formData.pinCode.trim()) {
//       newErrors.pinCode = "Pin code is required";
//     } else if (!/^\d{6}$/.test(formData.pinCode)) {
//       newErrors.pinCode = "Please enter a valid 6-digit pin code";
//     }
//     if (!formData.houseNumber.trim())
//       newErrors.houseNumber = "House number is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.locality.trim()) newErrors.locality = "Locality is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.state.trim()) newErrors.state = "State is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async () => {
//     if (validateForm()) {
//       try {
//         const token = localStorage.getItem("token");

//         // First, save the address
//         const addressResponse = await fetch(
//           "http://localhost:5000/api/address/add",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(formData),
//           }
//         );

//         const addressData = await addressResponse.json();

//         if (!addressResponse.ok) {
//           throw new Error(addressData.message || "Failed to save address");
//         }

//         // Store the address and cart summary for order creation
//         localStorage.setItem("selectedAddressId", addressData.address._id);
//         localStorage.setItem("orderCartSummary", JSON.stringify(cartSummary));

//         alert("Address saved successfully!");
//         // Navigate to payment or create order directly
//         window.location.href = "/payment";
//       } catch (error) {
//         console.error("Error saving address:", error);
//         alert(error.message || "Failed to save address. Please try again.");
//       }
//     }
//   };

//   const handleCancel = () => {
//     window.location.href = "/bag";
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//       {loading ? (
//         <div
//           style={{
//             minHeight: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div style={{ textAlign: "center" }}>
//             <div
//               style={{
//                 border: "4px solid #f3f3f3",
//                 borderTop: "4px solid #ff3f6c",
//                 borderRadius: "50%",
//                 width: "60px",
//                 height: "60px",
//                 animation: "spin 1s linear infinite",
//                 margin: "0 auto",
//               }}
//             ></div>
//             <p style={{ marginTop: "16px", color: "#757575" }}>
//               Loading cart details...
//             </p>
//           </div>
//         </div>
//       ) : cartItems.length === 0 ? (
//         <div
//           style={{
//             minHeight: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div style={{ textAlign: "center" }}>
//             <h2 style={{ marginBottom: "16px" }}>Your cart is empty</h2>
//             <p style={{ color: "#757575", marginBottom: "24px" }}>
//               Please add items to your cart before proceeding to checkout
//             </p>
//             <button
//               onClick={() => (window.location.href = "/")}
//               style={{
//                 padding: "12px 24px",
//                 border: "none",
//                 backgroundColor: "#ff3f6c",
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: "16px",
//                 cursor: "pointer",
//                 borderRadius: "4px",
//               }}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Header */}
//           <div
//             style={{
//               backgroundColor: "white",
//               borderBottom: "1px solid #e0e0e0",
//               padding: "16px 0",
//               marginBottom: "24px",
//             }}
//           >
//             <div
//               style={{
//                 maxWidth: "1200px",
//                 margin: "0 auto",
//                 padding: "0 16px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "32px",
//                   fontWeight: "bold",
//                   color: "#ff3f6c",
//                   margin: 0,
//                 }}
//               >
//                 M
//               </h1>
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "8px" }}
//               >
//                 <svg
//                   style={{ width: "20px", height: "20px", color: "#4caf50" }}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span style={{ fontWeight: 600, fontSize: "12px" }}>
//                   100% SECURE
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Stepper */}
//           <div
//             style={{
//               maxWidth: "1200px",
//               margin: "0 auto 24px",
//               padding: "0 16px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "40px",
//               }}
//             >
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "8px" }}
//               >
//                 <div
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "50%",
//                     backgroundColor: "#ff3f6c",
//                     color: "white",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   ✓
//                 </div>
//                 <span
//                   style={{
//                     fontWeight: 600,
//                     fontSize: "14px",
//                     color: "#ff3f6c",
//                   }}
//                 >
//                   BAG
//                 </span>
//               </div>
//               <div
//                 style={{
//                   width: "80px",
//                   height: "2px",
//                   backgroundColor: "#ff3f6c",
//                 }}
//               ></div>
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "8px" }}
//               >
//                 <div
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "50%",
//                     backgroundColor: "#ff3f6c",
//                     color: "white",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   2
//                 </div>
//                 <span
//                   style={{
//                     fontWeight: 600,
//                     fontSize: "14px",
//                     color: "#ff3f6c",
//                   }}
//                 >
//                   ADDRESS
//                 </span>
//               </div>
//               <div
//                 style={{
//                   width: "80px",
//                   height: "2px",
//                   backgroundColor: "#bdbdbd",
//                 }}
//               ></div>
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "8px" }}
//               >
//                 <div
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "50%",
//                     backgroundColor: "#bdbdbd",
//                     color: "white",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "600",
//                   }}
//                 >
//                   3
//                 </div>
//                 <span
//                   style={{
//                     fontWeight: 600,
//                     fontSize: "14px",
//                     color: "#bdbdbd",
//                   }}
//                 >
//                   PAYMENT
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div
//             style={{
//               maxWidth: "1200px",
//               margin: "0 auto",
//               padding: "0 16px 120px",
//             }}
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 400px",
//                 gap: "24px",
//               }}
//             >
//               {/* Left Section - Form */}
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   padding: "24px",
//                   border: "1px solid #e0e0e0",
//                 }}
//               >
//                 {/* Contact Details */}
//                 <h3
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "14px",
//                     marginBottom: "16px",
//                     marginTop: 0,
//                   }}
//                 >
//                   CONTACT DETAILS
//                 </h3>

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name*"
//                   value={formData.name}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "8px",
//                     border: errors.name
//                       ? "1px solid #f44336"
//                       : "1px solid #e0e0e0",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 {errors.name && (
//                   <p
//                     style={{
//                       color: "#f44336",
//                       fontSize: "12px",
//                       margin: "0 0 16px 0",
//                     }}
//                   >
//                     {errors.name}
//                   </p>
//                 )}

//                 <input
//                   type="text"
//                   name="mobileNumber"
//                   placeholder="Mobile No*"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   maxLength="10"
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "8px",
//                     border: errors.mobileNumber
//                       ? "1px solid #f44336"
//                       : "1px solid #e0e0e0",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 {errors.mobileNumber && (
//                   <p
//                     style={{
//                       color: "#f44336",
//                       fontSize: "12px",
//                       margin: "0 0 16px 0",
//                     }}
//                   >
//                     {errors.mobileNumber}
//                   </p>
//                 )}

//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #e0e0e0",
//                     margin: "24px 0",
//                   }}
//                 />

//                 {/* Address */}
//                 <h3
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "14px",
//                     marginBottom: "16px",
//                     marginTop: 0,
//                   }}
//                 >
//                   ADDRESS
//                 </h3>

//                 <input
//                   type="text"
//                   name="pinCode"
//                   placeholder="Pin Code*"
//                   value={formData.pinCode}
//                   onChange={handleChange}
//                   maxLength="6"
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "8px",
//                     border: errors.pinCode
//                       ? "1px solid #f44336"
//                       : "1px solid #e0e0e0",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 {errors.pinCode && (
//                   <p
//                     style={{
//                       color: "#f44336",
//                       fontSize: "12px",
//                       margin: "0 0 16px 0",
//                     }}
//                   >
//                     {errors.pinCode}
//                   </p>
//                 )}

//                 <input
//                   type="text"
//                   name="houseNumber"
//                   placeholder="House Number/Tower/Block*"
//                   value={formData.houseNumber}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "4px",
//                     border: errors.houseNumber
//                       ? "1px solid #f44336"
//                       : "1px solid #e0e0e0",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 {errors.houseNumber && (
//                   <p
//                     style={{
//                       color: "#f44336",
//                       fontSize: "12px",
//                       margin: "0 0 4px 0",
//                     }}
//                   >
//                     {errors.houseNumber}
//                   </p>
//                 )}
//                 <p
//                   style={{
//                     fontSize: "11px",
//                     color: "#ff9800",
//                     margin: "0 0 16px 8px",
//                   }}
//                 >
//                   *House Number will allow a doorstep delivery
//                 </p>

//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address (locality,building,street)**"
//                   value={formData.address}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "4px",
//                     border: errors.address
//                       ? "1px solid #f44336"
//                       : "1px solid #e0e0e0",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 {errors.address && (
//                   <p
//                     style={{
//                       color: "#f44336",
//                       fontSize: "12px",
//                       margin: "0 0 4px 0",
//                     }}
//                   >
//                     {errors.address}
//                   </p>
//                 )}
//                 <p
//                   style={{
//                     fontSize: "11px",
//                     color: "#ff9800",
//                     margin: "0 0 16px 8px",
//                   }}
//                 >
//                   *Please update society/apartment details
//                 </p>

//                 <input
//                   type="text"
//                   name="locality"
//                   placeholder="Locality / Town*"
//                   value={formData.locality}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     marginBottom: "8px",
//                     border: errors.locality
//                       ? "1px solid #f44336"
//                       : "1px solid #e0e0e0",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     boxSizing: "border-box",
//                   }}
//                 />
//                 {errors.locality && (
//                   <p
//                     style={{
//                       color: "#f44336",
//                       fontSize: "12px",
//                       margin: "0 0 16px 0",
//                     }}
//                   >
//                     {errors.locality}
//                   </p>
//                 )}

//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: "16px",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   <div>
//                     <input
//                       type="text"
//                       name="city"
//                       placeholder="City / District*"
//                       value={formData.city}
//                       onChange={handleChange}
//                       style={{
//                         width: "100%",
//                         padding: "12px",
//                         border: errors.city
//                           ? "1px solid #f44336"
//                           : "1px solid #e0e0e0",
//                         borderRadius: "4px",
//                         fontSize: "14px",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                     {errors.city && (
//                       <p
//                         style={{
//                           color: "#f44336",
//                           fontSize: "12px",
//                           margin: "4px 0 0 0",
//                         }}
//                       >
//                         {errors.city}
//                       </p>
//                     )}
//                   </div>
//                   <div>
//                     <input
//                       type="text"
//                       name="state"
//                       placeholder="State*"
//                       value={formData.state}
//                       onChange={handleChange}
//                       style={{
//                         width: "100%",
//                         padding: "12px",
//                         border: errors.state
//                           ? "1px solid #f44336"
//                           : "1px solid #e0e0e0",
//                         borderRadius: "4px",
//                         fontSize: "14px",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                     {errors.state && (
//                       <p
//                         style={{
//                           color: "#f44336",
//                           fontSize: "12px",
//                           margin: "4px 0 0 0",
//                         }}
//                       >
//                         {errors.state}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #e0e0e0",
//                     margin: "24px 0",
//                   }}
//                 />

//                 {/* Address Type */}
//                 <h3
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "14px",
//                     marginBottom: "16px",
//                     marginTop: 0,
//                   }}
//                 >
//                   ADDRESS TYPE
//                 </h3>

//                 <div style={{ display: "flex", gap: "24px" }}>
//                   <label
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <input
//                       type="radio"
//                       name="addressType"
//                       value="Home"
//                       checked={formData.addressType === "Home"}
//                       onChange={handleChange}
//                       style={{
//                         marginRight: "8px",
//                         accentColor: "#ff3f6c",
//                         width: "18px",
//                         height: "18px",
//                       }}
//                     />
//                     <span style={{ fontSize: "14px" }}>Home</span>
//                   </label>
//                   <label
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <input
//                       type="radio"
//                       name="addressType"
//                       value="Work"
//                       checked={formData.addressType === "Work"}
//                       onChange={handleChange}
//                       style={{
//                         marginRight: "8px",
//                         accentColor: "#ff3f6c",
//                         width: "18px",
//                         height: "18px",
//                       }}
//                     />
//                     <span style={{ fontSize: "14px" }}>Work</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Right Section - Price Details */}
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   padding: "20px",
//                   border: "1px solid #e0e0e0",
//                   height: "fit-content",
//                   position: "sticky",
//                   top: "16px",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontWeight: 700,
//                     fontSize: "12px",
//                     color: "#757575",
//                     marginBottom: "16px",
//                     marginTop: 0,
//                   }}
//                 >
//                   PRICE DETAILS ({cartSummary.itemsCount} Items)
//                 </h3>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   <span style={{ fontSize: "14px" }}>Total MRP</span>
//                   <span style={{ fontSize: "14px" }}>
//                     ₹{cartSummary.totalMRP.toLocaleString()}
//                   </span>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   <span style={{ fontSize: "14px" }}>Discount on MRP</span>
//                   <span style={{ fontSize: "14px", color: "#4caf50" }}>
//                     -₹{cartSummary.discount.toLocaleString()}
//                   </span>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   <div>
//                     <span style={{ fontSize: "14px" }}>Platform Fee </span>
//                     <span
//                       style={{
//                         fontSize: "12px",
//                         color: "#ff3f6c",
//                         cursor: "pointer",
//                         fontWeight: 600,
//                       }}
//                     >
//                       Know More
//                     </span>
//                   </div>
//                   <span style={{ fontSize: "14px", color: "#4caf50" }}>
//                     FREE
//                   </span>
//                 </div>

//                 <hr
//                   style={{
//                     border: "none",
//                     borderTop: "1px solid #e0e0e0",
//                     margin: "16px 0",
//                   }}
//                 />

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   <span style={{ fontWeight: 700, fontSize: "16px" }}>
//                     Total Amount
//                   </span>
//                   <span style={{ fontWeight: 700, fontSize: "16px" }}>
//                     ₹{cartSummary.totalAmount.toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bottom Action Bar */}
//           <div
//             style={{
//               position: "fixed",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               backgroundColor: "white",
//               borderTop: "1px solid #e0e0e0",
//               padding: "16px 0",
//               zIndex: 1000,
//               boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
//             }}
//           >
//             <div
//               style={{
//                 maxWidth: "1200px",
//                 margin: "0 auto",
//                 padding: "0 16px",
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "16px",
//               }}
//             >
//               <button
//                 onClick={handleCancel}
//                 style={{
//                   padding: "12px",
//                   border: "1px solid #e0e0e0",
//                   backgroundColor: "white",
//                   color: "#424242",
//                   fontWeight: 600,
//                   fontSize: "16px",
//                   cursor: "pointer",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 style={{
//                   padding: "12px",
//                   border: "none",
//                   backgroundColor: "#ff3f6c",
//                   color: "white",
//                   fontWeight: 600,
//                   fontSize: "16px",
//                   cursor: "pointer",
//                   borderRadius: "4px",
//                 }}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </>
//       )}

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AddressPage;

import React, { useState, useEffect } from "react";

const AddressPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    houseNumber: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    addressType: "Home",
  });

  const [errors, setErrors] = useState({});
  const [cartSummary, setCartSummary] = useState({
    totalMRP: 0,
    discount: 0,
    platformFee: 0,
    totalAmount: 0,
    itemsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load cart");
      }

      const items = data.items || [];
      setCartItems(items);

      // Calculate totals from cart items
      let totalMRP = 0;
      let totalAmount = 0;
      let itemsCount = 0;

      items.forEach((item) => {
        if (item.productId) {
          const itemMRP =
            (item.productId.mrp || item.productId.price) * item.quantity;
          const itemPrice = item.productId.price * item.quantity;

          totalMRP += itemMRP;
          totalAmount += itemPrice;
          itemsCount += item.quantity;
        }
      });

      const discount = totalMRP - totalAmount;

      setCartSummary({
        totalMRP,
        discount,
        platformFee: 0,
        totalAmount,
        itemsCount,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Failed to load cart data");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "Pin code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit pin code";
    }
    if (!formData.houseNumber.trim())
      newErrors.houseNumber = "House number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.locality.trim()) newErrors.locality = "Locality is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");

        // First, save the address
        const addressResponse = await fetch(
          "http://localhost:5000/api/user/address/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const addressData = await addressResponse.json();

        if (!addressResponse.ok) {
          throw new Error(addressData.message || "Failed to save address");
        }

        // Store the address and cart summary for order creation
        localStorage.setItem("selectedAddressId", addressData.address._id);
        localStorage.setItem("orderCartSummary", JSON.stringify(cartSummary));

        alert("Address saved successfully!");
        // Navigate to payment or create order directly
        window.location.href = "/payment";
      } catch (error) {
        console.error("Error saving address:", error);
        alert(error.message || "Failed to save address. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    window.location.href = "/bag";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {loading ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #ff3f6c",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
            <p style={{ marginTop: "16px", color: "#757575" }}>
              Loading cart details...
            </p>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "16px" }}>Your cart is empty</h2>
            <p style={{ color: "#757575", marginBottom: "24px" }}>
              Please add items to your cart before proceeding to checkout
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "12px 24px",
                border: "none",
                backgroundColor: "#ff3f6c",
                color: "white",
                fontWeight: 600,
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div
            style={{
              backgroundColor: "white",
              borderBottom: "1px solid #e0e0e0",
              padding: "16px 0",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#ff3f6c",
                  margin: 0,
                }}
              >
                M
              </h1>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg
                  style={{ width: "20px", height: "20px", color: "#4caf50" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span style={{ fontWeight: 600, fontSize: "12px" }}>
                  100% SECURE
                </span>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto 24px",
              padding: "0 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#ff3f6c",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#ff3f6c",
                  }}
                >
                  BAG
                </span>
              </div>
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: "#ff3f6c",
                }}
              ></div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#ff3f6c",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  2
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#ff3f6c",
                  }}
                >
                  ADDRESS
                </span>
              </div>
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: "#bdbdbd",
                }}
              ></div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#bdbdbd",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  3
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#bdbdbd",
                  }}
                >
                  PAYMENT
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 16px 120px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 400px",
                gap: "24px",
              }}
            >
              {/* Left Section - Form */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "24px",
                  border: "1px solid #e0e0e0",
                }}
              >
                {/* Contact Details */}
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "16px",
                    marginTop: 0,
                  }}
                >
                  CONTACT DETAILS
                </h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "8px",
                    border: errors.name
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.name && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "0 0 16px 0",
                    }}
                  >
                    {errors.name}
                  </p>
                )}

                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile No*"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  maxLength="10"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "8px",
                    border: errors.mobileNumber
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.mobileNumber && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "0 0 16px 0",
                    }}
                  >
                    {errors.mobileNumber}
                  </p>
                )}

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                    margin: "24px 0",
                  }}
                />

                {/* Address */}
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "16px",
                    marginTop: 0,
                  }}
                >
                  ADDRESS
                </h3>

                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code*"
                  value={formData.pinCode}
                  onChange={handleChange}
                  maxLength="6"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "8px",
                    border: errors.pinCode
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.pinCode && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "0 0 16px 0",
                    }}
                  >
                    {errors.pinCode}
                  </p>
                )}

                <input
                  type="text"
                  name="houseNumber"
                  placeholder="House Number/Tower/Block*"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "4px",
                    border: errors.houseNumber
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.houseNumber && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {errors.houseNumber}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "11px",
                    color: "#ff9800",
                    margin: "0 0 16px 8px",
                  }}
                >
                  *House Number will allow a doorstep delivery
                </p>

                <input
                  type="text"
                  name="address"
                  placeholder="Address (locality,building,street)**"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "4px",
                    border: errors.address
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.address && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {errors.address}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "11px",
                    color: "#ff9800",
                    margin: "0 0 16px 8px",
                  }}
                >
                  *Please update society/apartment details
                </p>

                <input
                  type="text"
                  name="locality"
                  placeholder="Locality / Town*"
                  value={formData.locality}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "8px",
                    border: errors.locality
                      ? "1px solid #f44336"
                      : "1px solid #e0e0e0",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.locality && (
                  <p
                    style={{
                      color: "#f44336",
                      fontSize: "12px",
                      margin: "0 0 16px 0",
                    }}
                  >
                    {errors.locality}
                  </p>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="City / District*"
                      value={formData.city}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: errors.city
                          ? "1px solid #f44336"
                          : "1px solid #e0e0e0",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                    {errors.city && (
                      <p
                        style={{
                          color: "#f44336",
                          fontSize: "12px",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      placeholder="State*"
                      value={formData.state}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: errors.state
                          ? "1px solid #f44336"
                          : "1px solid #e0e0e0",
                        borderRadius: "4px",
                        fontSize: "14px",
                        boxSizing: "border-box",
                      }}
                    />
                    {errors.state && (
                      <p
                        style={{
                          color: "#f44336",
                          fontSize: "12px",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                    margin: "24px 0",
                  }}
                />

                {/* Address Type */}
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "16px",
                    marginTop: 0,
                  }}
                >
                  ADDRESS TYPE
                </h3>

                <div style={{ display: "flex", gap: "24px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value="Home"
                      checked={formData.addressType === "Home"}
                      onChange={handleChange}
                      style={{
                        marginRight: "8px",
                        accentColor: "#ff3f6c",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                    <span style={{ fontSize: "14px" }}>Home</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value="Work"
                      checked={formData.addressType === "Work"}
                      onChange={handleChange}
                      style={{
                        marginRight: "8px",
                        accentColor: "#ff3f6c",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                    <span style={{ fontSize: "14px" }}>Work</span>
                  </label>
                </div>
              </div>

              {/* Right Section - Price Details */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  border: "1px solid #e0e0e0",
                  height: "fit-content",
                  position: "sticky",
                  top: "16px",
                }}
              >
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#757575",
                    marginBottom: "16px",
                    marginTop: 0,
                  }}
                >
                  PRICE DETAILS ({cartSummary.itemsCount} Items)
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Total MRP</span>
                  <span style={{ fontSize: "14px" }}>
                    ₹{cartSummary.totalMRP.toLocaleString()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Discount on MRP</span>
                  <span style={{ fontSize: "14px", color: "#4caf50" }}>
                    -₹{cartSummary.discount.toLocaleString()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "14px" }}>Platform Fee </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#ff3f6c",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Know More
                    </span>
                  </div>
                  <span style={{ fontSize: "14px", color: "#4caf50" }}>
                    FREE
                  </span>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                    margin: "16px 0",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "16px" }}>
                    Total Amount
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "16px" }}>
                    ₹{cartSummary.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderTop: "1px solid #e0e0e0",
              padding: "16px 0",
              zIndex: 1000,
              boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  padding: "12px",
                  border: "1px solid #e0e0e0",
                  backgroundColor: "white",
                  color: "#424242",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: "12px",
                  border: "none",
                  backgroundColor: "#ff3f6c",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AddressPage;
