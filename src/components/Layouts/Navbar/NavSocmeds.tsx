import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIcons = [faXTwitter, faInstagram, faFacebook];

const NavSocmeds = () => {
  return (
    <div className="flex gap-2 items-center">
      {socialIcons.map((icon, i) => (
        <FontAwesomeIcon key={i} icon={icon} className="cursor-pointer hover:text-[#1896ec]" />
      ))}
    </div>
  );
};

export default NavSocmeds;
