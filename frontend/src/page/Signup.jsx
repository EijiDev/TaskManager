import axios from "axios";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup Successfull", response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Signup Failed");
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="signup_modal" className="modal">
      <div className="modal-box p-10 rounded-[1.2rem] bg-base-100 shadow-2xl max-w-sm">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black uppercase tracking-tight">
            Task<span className="text-primary">ly</span>
          </h3>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="form-control">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="NAME"
              className="input bg-base-200 rounded-l border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:opacity-40"
            />
          </div>

          <div className="form-control">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              className="input w-full bg-base-200 rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:opacity-40"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById("signup_modal")?.close();
              document.getElementById("login_modal")?.showModal();
            }}
            className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
          >
            Already have an account? Log in
          </button>
        </div>
      </div>

      <form
        method="dialog"
        className="modal-backdrop bg-base-900/10 backdrop-blur-sm"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}

export default SignUp;
