import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import GridOverlay from "./GridOverlay";
import MeshGradientBG from "./MeshGradientBG";

const Layout = () => {
  const location = useLocation();

  // Subdued mode for detail/blog pages
  const isSubdued = location.pathname.startsWith("/work/") || location.pathname === "/blog";

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <MeshGradientBG subdued={isSubdued} />
      <GridOverlay subdued={isSubdued} />
      <div className="relative z-10">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
