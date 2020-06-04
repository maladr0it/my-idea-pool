import styled from "styled-components/macro";
import { Link as ReactRouterLink } from "react-router-dom";

export const Link = styled(ReactRouterLink)`
  font-weight: var(--fontWeight-bold);
  text-decoration: none;
  color: var(--primary);
`;
