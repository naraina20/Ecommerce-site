import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
          <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        
              <p>Download App for Android and IOS mobile phone</p>
              <img src={playStore} alt="playstore" />
              <img src={appStore} alt="appStore" />
          </div>
          
          <div className="midFooter">
            <h1>Urban-nest.</h1>
              <p>High Quality is our first priority</p>
              <p>Copyrights 2021 &copy; Urban-nest site</p>
          </div>

          <div className="rightFooter">
              <h4>Follow Us</h4>
              <a href="https://www.linkedin.com/in/naraina-dewasi-272b19201/" target="blank">LinkedIn</a>
              <a href="https://github.com/naraina20" target="blank">Github</a>
              <a href="https://www.instagram.com/___naraina20/" target="blank">Instagram</a>
          </div>
    </footer>
  )
}

export default Footer

