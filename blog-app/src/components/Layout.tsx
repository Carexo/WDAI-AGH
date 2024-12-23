import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <nav className="h-14 bg-gray-100 flex items-center justify-center shadow-md">
        <Link to="/blog">
          <h1 className="text-3xl">BLOG</h1>
        </Link>
      </nav>
      <main className="flex-grow flex flex-col items-center mt-8">
        <Outlet />
      </main>
      <footer className="flex justify-center p-1.5">
        <small>&copy; Copyright 2025</small>
      </footer>
    </>
  );
};

export default Layout;
