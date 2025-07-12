import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [nameError, setError] = useState("");
const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const email = form.email.value;
    const photo = form.photo.value;

    // Name validation
    if (name.length < 5) {
        setError("Name should be more than 5 characters");
        return;
    }

    // Password validation
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;

    if (!uppercase || !lowercase || !minLength) {
        setError(
            "Password must be at least 6 characters and include both uppercase and lowercase letters."
        );
        return;
    }

    setError("");

    // Proceed with user creation
    createUser(email, password)
        .then((result) => {
            const userProfile = {
                name,
                email,
                photo,
                creationTime: result.user?.metadata?.creationTime,
                lastSignInTime: result.user?.metadata?.lastSignInTime,
            };

            updateUserProfile(name, photo)
                .then(() => {
                    fetch('https://hobby-hub-server-iota.vercel.app/users', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userProfile),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.insertedId) {
                                Swal.fire({
                                    text: "User registered successfully!",
                                    icon: "success",
                                    confirmButtonText: "Close",
                                }).then(() => {
                                    navigate('/');
                                });
                            }
                        });
                })
                .catch((err) => console.error("Profile update failed:", err));
        })
        .catch((error) => {
            console.error("User creation failed:", error);
            Swal.fire({
                text: error.message,
                icon: "error",
                confirmButtonText: "Close",
            });
        });
};

    return (
        <>
            <Helmet>
                <title>Register | My App Store</title>
            </Helmet>
            <div className="bg-base-200 p-10 rounded-xl shadow-2xl">
                <div className="flex-col justify-center items-center ">
                    <div className="text-center my-5">
                        <h1 className="text-2xl font-bold">Register</h1>
                    </div>
                    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">

                            <form onSubmit={handleRegister}>
                                <div >
                                    <fieldset className="fieldset">
                                        <label className="label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="input"
                                            placeholder="Full Name"
                                            required
                                        />
                                        {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
                                        <label className="label">Photo URL</label>
                                        <input
                                            type="text"
                                            name="photo"
                                            className="input"
                                            placeholder="Photo URL"
                                        />
                                        <label className="label">Email</label>
                                        <input

                                            type="email"
                                            name="email"
                                            className="input"
                                            placeholder="Email"
                                            required
                                        />
                                        <div className="relative text-left">
                                            <label className="label">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="input"
                                                placeholder="Password"
                                                required
                                            />
                                            {/* {!show && <span onClick={()=>setShow((prev) => !prev)} className="absolute right-7 z-50 cursor-pointer bottom-3"><FaEye size={18}/></span>}
              {show && <span onClick={()=>setShow((prev) => !prev)} className="absolute right-7 z-50 cursor-pointer bottom-3"><FaEyeSlash size={18}/></span>} */}
                                        </div>

                                        <button type="submit" className="btn btn-neutral mt-4">
                                            Register
                                        </button>

                                    </fieldset>


                                </div>
                            </form>

                            <div className="text-center">
                                Already have an account?{" "}
                                <Link className="underline" to={"/auth/login"}>
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Register;