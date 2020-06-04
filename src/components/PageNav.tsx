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
`;

const HomeLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--onPrimary);
`;

const LogoutButton = styled.button`
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
  background-color: var(--neutral);
`;

const Divider = () => {
  return (
    <div
      css={`
        width: 100%;
        padding: 0 24px;
      `}
    >
      <div
        css={`
          border-top: 1px solid var(--neutral);
        `}
      />
    </div>
  );
};

export const PageNav = () => {
  const auth = useAuth();

  return (
    <Container as="nav" gap="36px">
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
            padding: 0 36px;
          `}
        >
          The Idea Pool
        </div>
      </HomeLink>
      {auth.user && (
        <>
          <Divider />
          <FlexCol
            gap="8px"
            css={`
              align-items: center;
            `}
          >
            <AvatarContainer>
              <img
                src={auth.user.avatar_url}
                alt={auth.user.name}
                css={`
                  display: block;
                  width: 100%;
                `}
              />
            </AvatarContainer>
            <div
              css={`
                padding: 0 36px;
                font-size: 20px;
                color: var(--onPrimary);
              `}
            >
              {auth.user.name}
            </div>
            <LogoutButton onClick={auth.signOut}>Log out</LogoutButton>
          </FlexCol>
        </>
      )}
    </Container>
  );
};
