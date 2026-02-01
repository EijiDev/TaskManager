import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    
  }

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login Successful", response.data);

      // Store access token
      localStorage.setItem("accessToken", response.data.accessToken);

      navigate("/dashboard");

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login Failed");
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box p-10 rounded-[1.2rem] bg-base-100 shadow-2xl max-w-sm">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black uppercase tracking-tight">
            Task<span className="text-primary">ly</span>
          </h3>
        </div>

        <form onSubmit={handleLogIn} className="space-y-6">
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              className="input bg-base-200 rounded-l border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:opacity-40"
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="PASSWORD"
              className="input bg-base-200 rounded-l border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:opacity-40"
            />
          </div>

          {error && (
            <p className="text-error text-xs font-bold text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-l uppercase font-black tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
            Need an account? Sign Up
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop bg-base-900/10 backdrop-blur-sm">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Login;