import React from "react";
import "./aboutSection.css";
import {Button,Typography,Avatar  } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/naraina-dewasi-272b19201/";
  };
  return (
    
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dsyp9koqb/image/upload/v1661080277/avatars/ib8obzomlakjnex5nphc.jpg"
              alt="Founder"
            />
            <Typography>Naraina Dewasi</Typography>
            <Button onClick={visitLinkedin} color="primary">
              Visit LinkedIn
            </Button>
            <span>
              This is a sample wesbite made by Naraina. Only with the
              purpose to learn MERN Stack and for my portfolio
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Contacts</Typography>
            <a
              href="https://www.linkedin.com/in/naraina-dewasi-272b19201/"
              target="blank"
            >
              <LinkedInIcon className="instagramSvgIcon"/>
            </a>

            <a href="https://www.instagram.com/___naraina20/" target="blank">
              <InstagramIcon className= "youtubeSvgIcon"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
