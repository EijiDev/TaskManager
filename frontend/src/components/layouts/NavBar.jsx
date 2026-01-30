function NavBar() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="navbar bg-base-100/70 backdrop-blur-md shadow-xl rounded-full px-6 border border-white/10">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl font-black uppercase tracking-tighter hover:bg-transparent">
            Taskly
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold gap-2">
            <li><a href="#" className="rounded-full hover:bg-primary hover:text-white transition-all">Home</a></li>
            {/* Added href="#about" to link to the section below */}
            <li><a href="#about" className="rounded-full hover:bg-primary hover:text-white transition-all">About</a></li>
            <li><a href="#contact" className="rounded-full hover:bg-primary hover:text-white transition-all">Contact</a></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <button 
            onClick={() => document.getElementById('login_modal').showModal()}
            className="btn btn-ghost btn-sm hidden sm:inline-flex rounded-full px-6 font-bold cursor-pointer"
          >
            Login
          </button>
          
          <button className="btn btn-primary btn-sm rounded-full px-8 shadow-md hover:shadow-lg transition-all cursor-pointer">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;