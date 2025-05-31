import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p className="footer-description">
            Polam is dedicated to empowering farmers with technology-driven
            solutions for a better, sustainable future. We’re here to support
            farmers with smart tools, fresh ideas, and a passion for growing
            together.
            <br />
            <br />
            Inspired by the struggles farmers faced during the COVID-19
            lockdown—where unsold produce and wasted effort became common—Polam
            offers a sustainable solution to bring fresh, local farm products
            directly to homes and vendors.
            <br />
            <br />
            With smartphones now part of daily life, Polam empowers farmers to
            manage and sell their products more easily, gain better profits, and
            prevent wastage. By simplifying the supply chain and supporting
            doorstep delivery, the app benefits not just farmers, but the entire
            community.
            <br />
            <br />
            This platform is not just for emergencies—it’s a long-term step
            toward agricultural development, food accessibility, and farmer
            well-being.
            <br />
            <br />
            <span className="footer-slogan">
              Empowering Farmers, Enriching Lives, Uplifting the Nation.
            </span>
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1 (326) 209-2805</li>
            <li>madhurijk21@polam.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2025 @Polam.com -All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
