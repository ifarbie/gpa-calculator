import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIcons = [faXTwitter, faInstagram, faFacebook];

const Navbar = () => {
  return (
    <nav className="flex justify-between py-4 px-6 md:py-7 md:px-8 lg:px-12">
      <div className="flex justify-center items-center gap-3">
        <img width="48" height="48" src="https://img.icons8.com/dusk/64/gpa-calculator.png" alt="gpa-calculator"/>
        <span className="text-lg block text-[#0d2451] font-semibold tracking-wider">GPA Calculator</span>
      </div>
      <div className="flex gap-2 items-center">
        {socialIcons.map((icon) => (
          <FontAwesomeIcon icon={icon} className="cursor-pointer hover:text-[#1896ec]" />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
