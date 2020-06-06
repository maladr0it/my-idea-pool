import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

// this should really be a SVG
import logoImg from "../assets/IdeaPool_icon@2x.png";
import { useAuth } from "../AuthContext";
import { FlexCol } from "./FlexCol";

export const Container = styled(FlexCol)`
  width: 200px;
  padding: 36px 0;
  text-align: center;
  background-color: var(--primary);
  align-items: center;
`;

const NavItem = styled(FlexCol)`
  align-items: center;
  padding: 0 36px;
`;

const HomeLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--onPrimary);
`;

const LogoutButton = styled.button`
  margin-top: 8px;
  font-size: 16px;
  border: none;
  color: rgba(42, 56, 66, 0.65);
  background-color: transparent;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.25);
`;

export const PageNav = () => {
  const auth = useAuth();

  return (
    <Container as="nav" gap="36px">
      <NavItem>
        <HomeLink to="/">
          <img
            src={logoImg}
            alt="My Idea Pool logo"
            css={`
              width: 64px;
            `}
          />
          <div
            css={`
              margin-top: 12px;
            `}
          >
            The Idea Pool
          </div>
        </HomeLink>
      </NavItem>
      {auth.user && (
        <>
          <div
            css={`
              border-top: 1px solid rgba(255, 255, 255, 0.25);
              width: calc(100% - 48px);
            `}
          />
          <NavItem>
            <AvatarContainer>
              <img
                src={auth.user.avatar_url}
                alt={auth.user.name}
                css={`
                  width: 100%;
                `}
              />
            </AvatarContainer>
            <div
              css={`
                margin-top: 8px;
                font-size: 20px;
                color: var(--onPrimary);
              `}
            >
              {auth.user.name}
            </div>
            <LogoutButton onClick={auth.signOut}>Log out</LogoutButton>
          </NavItem>
        </>
      )}
    </Container>
  );
};
