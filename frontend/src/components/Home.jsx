import React, { useState } from "react";
import {
  Navbar,
  NavigationLinks,
  NavLink,
  ButtonsContainer,
  LoginButton,
  HomeContainer,
  SchoolInfo,
  SchoolImage,
  Title,
  LoremTextContainer,
} from "../styles/styles";
import bg from "../assets/bg.jpg";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/choose-user");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="h-screen">
        <Navbar>
          <NavigationLinks>
            <NavLink href="#">About Us</NavLink>
            <NavLink href="#">Products</NavLink>
            <NavLink href="#">Contact Us</NavLink>
          </NavigationLinks>
          <ButtonsContainer>
            <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
            <LoginButton onClick={handleRegisterClick}>
              Register Student
            </LoginButton>
          </ButtonsContainer>
        </Navbar>
        <HomeContainer>
          <SchoolInfo>
            <Title>School Management System</Title>
            <LoremTextContainer>
              <p className="text-center">
                Empowering educators and students with seamless management
                solutions to enhance the learning experience.
              </p>
            </LoremTextContainer>
          </SchoolInfo>
          <SchoolImage src={bg} alt="pupils" />
        </HomeContainer>
      </div>
    </>
  );
};

export default Home;
