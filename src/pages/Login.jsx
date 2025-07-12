
import { use, useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
const handleLogin = (e) => {
  e.preventDefault();
  const form = e.target;
  const password = form.password.value;
  const email = form.email.value;

  signIn(email, password)
    .then(async (result) => {
      const loggedInUser = result.user;
      // Get Firebase ID token (JWT)
      const idToken = await loggedInUser.getIdToken();

      // Store the token in localStorage
      localStorage.setItem('access-token', idToken);

      // Now you can remove your patch call if you want
      navigate(location.state || '/');
      Swal.fire({
        text: "Login successful!",
        icon: 'success',
        confirmButtonText: 'close'
      });
      form.reset();
    })
    .catch(error => {
      setError(error.code);
      console.error("Login error:", error);
    });
};

const handleGoogleLogin = () => {
  signInWithGoogle()
    .then(async (result) => {
      const loggedInUser = result.user;
      // Get Firebase ID token (JWT)
      const idToken = await loggedInUser.getIdToken();

      localStorage.setItem('access-token', idToken);
      navigate(location.state || '/');
    })
    .catch(err => {
      console.error('Google login error:', err);
    });
};


  return (
    <>
      <Helmet>
        <title>Login | My App Store</title>
      </Helmet>
      <div className="bg-base-200 p-10 rounded-xl shadow-2xl">
        <div className="flex-col justify-center items-center ">
          <div className="text-center my-5">
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">

              <form onSubmit={handleLogin}>
                <div >
                  <fieldset className="fieldset">
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
                    </div>
                    <div>
                      <div className="link text-left link-hover">
                        <a href="/auth/forget" className="text-blue-600 hover:underline">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                    {error && <p className="text-red-400 text-xs">{error}</p>}
                    <button type="submit" className="btn btn-neutral mt-4">
                      Login
                    </button>

                  </fieldset>


                </div>
              </form>

              <span className="text-center">OR</span>

              <button onClick={handleGoogleLogin} className="btn"><FaGoogle /> Sign in with Google</button>


              <div className="text-center">
                Not registered?{" "}
                <Link className="underline" to={"/auth/register"}>
                  Register
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;