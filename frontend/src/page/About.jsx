function About() {
  return (
    <section className="py-24 bg-base-100 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-sm uppercase tracking-widest text-primary font-black mb-2">
            Features
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase">
            Everything you need, <br /> nothing you don't.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[2rem] bg-base-200 border border-base-300 transition-all hover:shadow-md">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <path d="M9 12h6"/><path d="M9 16h6"/>
              </svg>
            </div>
            <h4 className="text-xl font-black uppercase mb-2">Fast Task Creation</h4>
            <p className="opacity-70">
              Create, edit, and manage tasks quickly with a simple, responsive interface.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-base-200 border border-base-300 transition-all hover:shadow-md">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
                <path d="M12 7v3"/><path d="M12 14v3"/><path d="M14 12h3"/><path d="M7 12h3"/>
              </svg>
            </div>
            <h4 className="text-xl font-black uppercase mb-2">User-Focus</h4>
            <p className="opacity-70">
              Each user has a dedicated workspace to manage their own tasks without distractions.
            </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-base-200 border border-base-300 transition-all hover:shadow-md">
            <div className="text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5"/>
                <path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>
                <path d="m16 19 2 2 4-4"/>
              </svg>
            </div>
            <h4 className="text-xl font-black uppercase mb-2">Progress Visibility</h4>
            <p className="opacity-70">
              Track task status and completion in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;