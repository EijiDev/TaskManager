function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-2 border-t border-base-300">
      <aside className="flex flex-col items-center gap-4">
        <div className="text-sm font-medium opacity-60">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
          <p className="mt-1">Built for teams that value speed.</p>
        </div>
      </aside>
    </footer>
  );
}

export default Footer;