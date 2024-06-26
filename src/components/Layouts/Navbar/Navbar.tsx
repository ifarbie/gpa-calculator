import NavBrand from "./NavBrand";
import NavSocmeds from "./NavSocmeds";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-4 px-6 md:py-7 md:px-8 lg:px-12">
      <NavBrand />
      <NavSocmeds />
    </nav>
  );
};

export default Navbar;
