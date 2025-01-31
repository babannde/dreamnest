import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";
import { server } from "../server";
import axios from "axios";
// import { toast } from "react-toastify";

const RegisterPage = () => {
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
 

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //     [name]: name === "profileImage" ? files[0] : value,
  //   });
  // };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(password === confirmPassword || confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // try {
    //   const register_form = new FormData()

    //   for (var key in formData) {
    //     register_form.append(key, formData[key])
    //   }

    //   const response = await fetch(`${server}/auth/register`, {
    //     method: "POST",
    //     body: register_form
    //   })

    //   if (response.ok) {
    //     navigate("/login")
    //   }
    // } catch (err) {
    //   console.log("Registration failed", err.message)
    // }

    axios
      .post(`${server}/auth/register`, { firstName, lastName, password, confirmPassword, email, avatar })
      .then((res) => {
        // toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAvatar();
        if (res.ok) {
          navigate("/login")
        }
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
        console.log("Registration failed", error.message)
      });
      
  }

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="avatar"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {avatar ? (
            <img
              src={avatar}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          ): (
            ""
            // <RxAvatar className="h-8 w-8" />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
