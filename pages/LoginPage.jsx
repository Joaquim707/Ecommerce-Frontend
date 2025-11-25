// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Checkbox,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function LoginPage() {
//   const [step, setStep] = useState("phone"); // phone → otp → name → done
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [name, setName] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");

//   const [tempOtpToken, setTempOtpToken] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Where should we go after login?
//   // 1. If a "from" path was passed via state, use that
//   // 2. Else, go back one step in history
//   const redirectAfterLogin = () => {
//     const from = location.state?.from;

//     if (from && from !== "/login") {
//       navigate(from, { replace: true });
//     } else {
//       navigate(-1); // just go back
//     }
//   };

//   const handleRequestOtp = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       await axios.post("http://localhost:5000/api/auth/request-otp", { phone });
//       setMsg("OTP sent successfully!");
//       setStep("otp");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }

//     setLoading(false);
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         { phone, otp }
//       );

//       // NEW USER → ask for name
//       if (res.data.newUser) {
//         setTempOtpToken(res.data.tempToken); // temporary token for name update
//         setStep("name");
//         setLoading(false);
//         return;
//       }

//       // EXISTING USER → complete login
//       localStorage.setItem("token", res.data.token);
//       sessionStorage.setItem("token", res.data.token);
//       const userData = { name: res.data.name || "", phone };
//       localStorage.setItem("user", JSON.stringify(userData));

//       setMsg("Login successful!");
//       setStep("done");

//       // redirect back
//       redirectAfterLogin();
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//       setLoading(false);
//     }
//   };

//   const handleSubmitName = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/set-name",
//         { name },
//         {
//           headers: {
//             Authorization: `Bearer ${tempOtpToken}`,
//           },
//         }
//       );

//       // Final token after name saved
//       localStorage.setItem("token", res.data.token);
//       sessionStorage.setItem("token", res.data.token);
//       // ✅ Store user info
//       const userData = { name, phone };
//       localStorage.setItem("user", JSON.stringify(userData));
//       setMsg("Account created!");
//       setStep("done");

//       // redirect back
//       redirectAfterLogin();
//     } catch (err) {
//       setError("Error saving name");
//       setLoading(false);
//     }
//   };

//   // -----------------------------------------
//   const renderPhoneStep = () => (
//     <Box>
//       <Typography fontSize={20} fontWeight={700} mb={2}>
//         Login <span style={{ color: "#777" }}>or Signup</span>
//       </Typography>

//       {/* PHONE INPUT BOX */}
//       <Box
//         sx={{
//           border: "1px solid #d4d5d9",
//           borderRadius: 1,
//           display: "flex",
//           alignItems: "center",
//           px: 1.5,
//           height: "48px",
//           mb: 2,
//         }}
//       >
//         <Typography sx={{ mr: 1, fontSize: 14, color: "#555" }}>+91</Typography>
//         <TextField
//           variant="standard"
//           InputProps={{ disableUnderline: true }}
//           placeholder="Mobile Number*"
//           fullWidth
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//       </Box>

//       {error && <Typography color="error">{error}</Typography>}

//       {/* Terms */}
//       <Box sx={{ display: "flex", gap: 0, mb: 3, alignItems: "center" }}>
//         <Checkbox size="small" />
//         <Typography sx={{ fontSize: 14, color: "#535766" }}>
//           By continuing, you agree to{" "}
//           <Typography
//             component="span"
//             sx={{ fontSize: 14, color: "#FF3C6F", cursor: "pointer" }}
//           >
//             Terms of Use
//           </Typography>{" "}
//           &{" "}
//           <Typography
//             component="span"
//             sx={{ fontSize: 14, color: "#FF3C6F", cursor: "pointer" }}
//           >
//             Privacy Policy
//           </Typography>{" "}
//           and I am above 18 years old.
//         </Typography>
//       </Box>

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           backgroundColor: "#696e79",
//           height: "48px",
//           textTransform: "none",
//           fontWeight: 600,
//         }}
//         onClick={handleRequestOtp}
//         disabled={loading || phone.length < 10}
//       >
//         {loading ? <CircularProgress size={24} /> : "CONTINUE"}
//       </Button>

//       <Typography sx={{ fontSize: 14, color: "#535766", mt: 2 }}>
//         Have trouble logging in?{" "}
//         <Typography
//           component="span"
//           sx={{ fontSize: 14, color: "#FF3C6F", cursor: "pointer" }}
//         >
//           Get help
//         </Typography>
//       </Typography>
//     </Box>
//   );

//   // -----------------------------------------
//   const renderOtpStep = () => (
//     <Box>
//       <Typography fontSize={20} fontWeight={700} mb={2}>
//         Enter OTP
//       </Typography>

//       <Typography mb={2}>
//         OTP sent to <strong>{phone}</strong>
//       </Typography>

//       <Box
//         sx={{
//           border: "1px solid #d4d5d9",
//           borderRadius: 1,
//           px: 1.5,
//           height: "48px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <TextField
//           variant="standard"
//           InputProps={{ disableUnderline: true }}
//           placeholder="6-digit OTP"
//           fullWidth
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//       </Box>

//       {error && <Typography color="error">{error}</Typography>}

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           mt: 3,
//           backgroundColor: "#696e79",
//           height: "48px",
//           textTransform: "none",
//           fontWeight: 600,
//         }}
//         onClick={handleVerifyOtp}
//         disabled={loading || otp.length !== 6}
//       >
//         {loading ? <CircularProgress size={24} /> : "VERIFY OTP"}
//       </Button>
//     </Box>
//   );

//   // -----------------------------------------
//   const renderNameStep = () => (
//     <Box>
//       <Typography fontSize={20} fontWeight={700} mb={1}>
//         Welcome!
//       </Typography>
//       <Typography color="text.secondary" mb={2}>
//         Please enter your name to complete signup.
//       </Typography>

//       <TextField
//         fullWidth
//         label="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       {error && (
//         <Typography color="error" mt={1}>
//           {error}
//         </Typography>
//       )}

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           mt: 3,
//           backgroundColor: "#696e79",
//           height: "48px",
//           textTransform: "none",
//           fontWeight: 600,
//         }}
//         onClick={handleSubmitName}
//         disabled={loading || name.length < 3}
//       >
//         {loading ? <CircularProgress size={24} /> : "SAVE & CONTINUE"}
//       </Button>
//     </Box>
//   );

//   // -----------------------------------------
//   const renderSuccess = () => (
//     <Box>
//       <Typography fontSize={24} fontWeight="600" mb={2}>
//         🎉 Logged In!
//       </Typography>
//       <Typography>Your account is now active.</Typography>
//     </Box>
//   );

//   // -----------------------------------------
//   return (
//     <Box
//       sx={{
//         width: "1872px",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(to bottom right, #fde7f0, #fff6e9)",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           mt: 4,
//           width: "100%",
//           maxWidth: "420px",
//           minHeight: "100vh",
//           bgcolor: "#fff",
//           borderRadius: 2,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           overflow: "hidden",
//         }}
//       >
//         {/* Banner */}
//         <Box sx={{ width: "100%", height: "170px", overflow: "hidden" }}>
//           <img
//             src="/images/couponBanner.png"
//             alt="banner"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//         </Box>

//         <Box sx={{ p: 3 }}>
//           {step === "phone" && renderPhoneStep()}
//           {step === "otp" && renderOtpStep()}
//           {step === "name" && renderNameStep()}
//           {step === "done" && renderSuccess()}

//           {msg && (
//             <Typography color="primary" mt={2} textAlign="center">
//               {msg}
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Checkbox,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function LoginPage() {
//   const [step, setStep] = useState("phone"); // phone → otp → name → done
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [name, setName] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");

//   const [tempOtpToken, setTempOtpToken] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   // 🚀 If user already logged in → redirect

//   // Where should we go after login?
//   const redirectAfterLogin = () => {
//     const from = location.state?.from;

//     if (from && from !== "/login") {
//       navigate(from, { replace: true });
//     } else {
//       navigate("/"); // go home instead of back
//     }
//   };

//   const handleRequestOtp = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       await axios.post("http://localhost:5000/api/auth/request-otp", { phone });
//       setMsg("OTP sent successfully!");
//       setStep("otp");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }

//     setLoading(false);
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         { phone, otp }
//       );

//       // NEW USER → ask for name
//       if (res.data.newUser) {
//         setTempOtpToken(res.data.tempToken);
//         setStep("name");
//         setLoading(false);
//         return;
//       }

//       // EXISTING USER → save login data
//       localStorage.setItem("token", res.data.token);

//       const userData = { name: res.data.name || "", phone };
//       localStorage.setItem("user", JSON.stringify(userData));

//       setMsg("Login successful!");
//       setStep("done");

//       redirectAfterLogin();
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//       setLoading(false);
//     }
//   };

//   const handleSubmitName = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/set-name",
//         { name },
//         {
//           headers: {
//             Authorization: `Bearer ${tempOtpToken}`,
//           },
//         }
//       );

//       // Final token after name saved
//       localStorage.setItem("token", res.data.token);

//       const userData = { name, phone };
//       localStorage.setItem("user", JSON.stringify(userData));

//       setMsg("Account created!");
//       setStep("done");

//       redirectAfterLogin();
//     } catch (err) {
//       setError("Error saving name");
//       setLoading(false);
//     }
//   };

//   // -----------------------------------------------------------
//   const renderPhoneStep = () => (
//     <Box>
//       <Typography fontSize={20} fontWeight={700} mb={2}>
//         Login <span style={{ color: "#777" }}>or Signup</span>
//       </Typography>

//       <Box
//         sx={{
//           border: "1px solid #d4d5d9",
//           borderRadius: 1,
//           display: "flex",
//           alignItems: "center",
//           px: 1.5,
//           height: "48px",
//           mb: 2,
//         }}
//       >
//         <Typography sx={{ mr: 1, fontSize: 14, color: "#555" }}>+91</Typography>
//         <TextField
//           variant="standard"
//           InputProps={{ disableUnderline: true }}
//           placeholder="Mobile Number*"
//           fullWidth
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//       </Box>

//       {error && <Typography color="error">{error}</Typography>}

//       <Box sx={{ display: "flex", gap: 0, mb: 3, alignItems: "center" }}>
//         <Checkbox size="small" />
//         <Typography sx={{ fontSize: 14, color: "#535766" }}>
//           By continuing, you agree to{" "}
//           <Typography
//             component="span"
//             sx={{ fontSize: 14, color: "#FF3C6F", cursor: "pointer" }}
//           >
//             Terms of Use
//           </Typography>{" "}
//           &{" "}
//           <Typography
//             component="span"
//             sx={{ fontSize: 14, color: "#FF3C6F", cursor: "pointer" }}
//           >
//             Privacy Policy
//           </Typography>{" "}
//           and I am above 18 years old.
//         </Typography>
//       </Box>

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           backgroundColor: "#696e79",
//           height: "48px",
//           textTransform: "none",
//           fontWeight: 600,
//         }}
//         onClick={handleRequestOtp}
//         disabled={loading || phone.length < 10}
//       >
//         {loading ? <CircularProgress size={24} /> : "CONTINUE"}
//       </Button>
//     </Box>
//   );

//   // -----------------------------------------------------------
//   const renderOtpStep = () => (
//     <Box>
//       <Typography fontSize={20} fontWeight={700} mb={2}>
//         Enter OTP
//       </Typography>

//       <Typography mb={2}>
//         OTP sent to <strong>{phone}</strong>
//       </Typography>

//       <Box
//         sx={{
//           border: "1px solid #d4d5d9",
//           borderRadius: 1,
//           px: 1.5,
//           height: "48px",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <TextField
//           variant="standard"
//           InputProps={{ disableUnderline: true }}
//           placeholder="6-digit OTP"
//           fullWidth
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//       </Box>

//       {error && <Typography color="error">{error}</Typography>}

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           mt: 3,
//           backgroundColor: "#696e79",
//           height: "48px",
//           textTransform: "none",
//           fontWeight: 600,
//         }}
//         onClick={handleVerifyOtp}
//         disabled={loading || otp.length !== 6}
//       >
//         {loading ? <CircularProgress size={24} /> : "VERIFY OTP"}
//       </Button>
//     </Box>
//   );

//   // -----------------------------------------------------------
//   const renderNameStep = () => (
//     <Box>
//       <Typography fontSize={20} fontWeight={700} mb={1}>
//         Welcome!
//       </Typography>
//       <Typography color="text.secondary" mb={2}>
//         Please enter your name to complete signup.
//       </Typography>

//       <TextField
//         fullWidth
//         label="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       {error && (
//         <Typography color="error" mt={1}>
//           {error}
//         </Typography>
//       )}

//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           mt: 3,
//           backgroundColor: "#696e79",
//           height: "48px",
//           textTransform: "none",
//           fontWeight: 600,
//         }}
//         onClick={handleSubmitName}
//         disabled={loading || name.length < 3}
//       >
//         {loading ? <CircularProgress size={24} /> : "SAVE & CONTINUE"}
//       </Button>
//     </Box>
//   );

//   // -----------------------------------------------------------
//   const renderSuccess = () => (
//     <Box>
//       <Typography fontSize={24} fontWeight="600" mb={2}>
//         🎉 Logged In!
//       </Typography>
//       <Typography>Your account is now active.</Typography>
//     </Box>
//   );

//   // -----------------------------------------------------------
//   return (
//     <Box
//       sx={{
//         width: { xs: "100%", lg: "1872px" },
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(to bottom right, #fde7f0, #fff6e9)",
//         p: 2,
//       }}
//     >
//       <Box
//         sx={{
//           mt: 4,
//           width: "100%",
//           maxWidth: "420px",
//           minHeight: "100vh",
//           bgcolor: "#fff",
//           borderRadius: 2,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ width: "100%", height: "170px", overflow: "hidden" }}>
//           <img
//             src="/images/couponBanner.png"
//             alt="banner"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//         </Box>

//         <Box sx={{ p: 3 }}>
//           {step === "phone" && renderPhoneStep()}
//           {step === "otp" && renderOtpStep()}
//           {step === "name" && renderNameStep()}
//           {step === "done" && renderSuccess()}

//           {msg && (
//             <Typography color="primary" mt={2} textAlign="center">
//               {msg}
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../src/context/userContext";

export default function LoginPage() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [tempOtpToken, setTempOtpToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ⬇️ GET CONTEXT FUNCTIONS
  const { updateUser } = useContext(UserContext);

  const redirectAfterLogin = () => {
    const from = location.state?.from;
    if (from && from !== "/login") navigate(from, { replace: true });
    else navigate("/");
  };

  // 1️⃣ REQUEST OTP
  const handleRequestOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/request-otp", { phone });
      setMsg("OTP sent successfully!");
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  // 2️⃣ VERIFY OTP
  // const handleVerifyOtp = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/verify-otp",
  //       { phone, otp }
  //     );

  //     // NEW USER → ask for name
  //     if (res.data.newUser) {
  //       setTempOtpToken(res.data.tempToken);
  //       setStep("name");
  //       setLoading(false);
  //       return;
  //     }

  //     // EXISTING USER → SAVE USER
  //     localStorage.setItem("token", res.data.token);

  //     const userData = { name: res.data.name, phone };

  //     // ⬅️ STORE IN CONTEXT + LOCALSTORAGE
  //     updateUser(userData);

  //     setMsg("Login successful!");
  //     setStep("done");
  //     redirectAfterLogin();
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Invalid OTP");
  //   }

  //   setLoading(false);
  // };
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { phone, otp }
      );

      // NEW USER → ask for name
      if (res.data.newUser) {
        setTempOtpToken(res.data.tempToken);
        setStep("name");
        setLoading(false);
        return;
      }

      // EXISTING USER → SAVE USER TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ Grab full user object from backend: { name, phone }
      const userData = res.data.user;

      // Save in user context
      updateUser(userData);

      // Save in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      setMsg("Login successful!");
      setStep("done");
      redirectAfterLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }

    setLoading(false);
  };

  // 3️⃣ SUBMIT NAME FOR NEW USERS
  const handleSubmitName = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/set-name",
        { name },
        {
          headers: { Authorization: `Bearer ${tempOtpToken}` },
        }
      );

      localStorage.setItem("token", res.data.token);

      const userData = { name, phone };

      // ⬅️ STORE IN CONTEXT + LOCALSTORAGE
      updateUser(userData);

      setMsg("Account created!");
      setStep("done");
      redirectAfterLogin();
    } catch (err) {
      setError("Error saving name");
    }

    setLoading(false);
  };

  // UI RENDERING
  const renderPhoneStep = () => (
    <Box>
      <Typography fontSize={20} fontWeight={700} mb={2}>
        Login <span style={{ color: "#777" }}>or Signup</span>
      </Typography>

      <Box
        sx={{
          border: "1px solid #d4d5d9",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          px: 1.5,
          height: "48px",
          mb: 2,
        }}
      >
        <Typography sx={{ mr: 1, fontSize: 14, color: "#555" }}>+91</Typography>
        <TextField
          variant="standard"
          InputProps={{ disableUnderline: true }}
          placeholder="Mobile Number*"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ display: "flex", gap: 0, mb: 3, alignItems: "center" }}>
        <Checkbox size="small" />
        <Typography sx={{ fontSize: 14, color: "#535766" }}>
          By continuing, you agree to{" "}
          <Typography component="span" sx={{ color: "#FF3C6F" }}>
            Terms of Use
          </Typography>{" "}
          &{" "}
          <Typography component="span" sx={{ color: "#FF3C6F" }}>
            Privacy Policy
          </Typography>{" "}
          and I am above 18 years old.
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#696e79",
          height: "48px",
          textTransform: "none",
          fontWeight: 600,
        }}
        onClick={handleRequestOtp}
        disabled={loading || phone.length < 10}
      >
        {loading ? <CircularProgress size={24} /> : "CONTINUE"}
      </Button>
    </Box>
  );

  const renderOtpStep = () => (
    <Box>
      <Typography fontSize={20} fontWeight={700} mb={2}>
        Enter OTP
      </Typography>

      <Typography mb={2}>
        OTP sent to <strong>{phone}</strong>
      </Typography>

      <Box
        sx={{
          border: "1px solid #d4d5d9",
          borderRadius: 1,
          px: 1.5,
          height: "48px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          variant="standard"
          InputProps={{ disableUnderline: true }}
          placeholder="6-digit OTP"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#696e79",
          height: "48px",
          textTransform: "none",
          fontWeight: 600,
        }}
        onClick={handleVerifyOtp}
        disabled={loading || otp.length !== 6}
      >
        {loading ? <CircularProgress size={24} /> : "VERIFY OTP"}
      </Button>
    </Box>
  );

  const renderNameStep = () => (
    <Box>
      <Typography fontSize={20} fontWeight={700} mb={1}>
        Welcome!
      </Typography>
      <Typography color="text.secondary" mb={2}>
        Please enter your name to complete signup.
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#696e79",
          height: "48px",
          textTransform: "none",
          fontWeight: 600,
        }}
        onClick={handleSubmitName}
        disabled={loading || name.length < 3}
      >
        {loading ? <CircularProgress size={24} /> : "SAVE & CONTINUE"}
      </Button>
    </Box>
  );

  const renderSuccess = () => (
    <Box>
      <Typography fontSize={24} fontWeight="600" mb={2}>
        🎉 Logged In!
      </Typography>
      <Typography>Your account is now active.</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "1872px" },
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #fde7f0, #fff6e9)",
        p: 2,
      }}
    >
      <Box
        sx={{
          mt: 4,
          width: "100%",
          maxWidth: "420px",
          minHeight: "100vh",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", height: "170px" }}>
          <img
            src="/images/couponBanner.png"
            alt="banner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ p: 3 }}>
          {step === "phone" && renderPhoneStep()}
          {step === "otp" && renderOtpStep()}
          {step === "name" && renderNameStep()}
          {step === "done" && renderSuccess()}

          {msg && (
            <Typography color="primary" mt={2} textAlign="center">
              {msg}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
