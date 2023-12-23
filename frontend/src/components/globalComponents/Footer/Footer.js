// In your CSS file or component
import '@fortawesome/fontawesome-free/css/all.css';
import './Footer.css';

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="footer" id="mainFooter">
      <div className="footerContent">
        <h2 className="footerTitle">Footer Y'all</h2>
        <p className="footerText">Stay connected and explore more content!</p>
        <div className="socialIcons">
          {/* Add social media icons or links here */}
          <a href="www.facebook.com" className="socialIcon">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="www.facebook.com" className="socialIcon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="www.facebook.com" className="socialIcon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footerBottom">
        <p className="copyrightText">&copy; {getCurrentYear()} Akresi Tech</p>
      </div>
    </footer>
  );
}
