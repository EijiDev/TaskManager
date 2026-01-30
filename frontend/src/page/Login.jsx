function Login() {
  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box p-10 rounded-[1.2rem] bg-base-100 shadow-2xl max-w-sm">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black uppercase tracking-tight">
            Task<span className="text-primary">ly</span>
          </h3>
        </div>

        <div className="space-y-6">
          <div className="form-control">
            <input
              type="email"
              placeholder="EMAIL"
              className="input bg-base-200 rounded-l border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:opacity-40"
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              placeholder="PASSWORD"
              className="input bg-base-200 rounded-l border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold placeholder:opacity-40"
            />
          </div>

          <button className="btn btn-primary w-full rounded-l uppercase font-black tracking-widest text-xs">
            Sign In
          </button>
        </div>

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