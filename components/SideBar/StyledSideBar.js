import styled from "@emotion/styled";

export const StyledSideBar = styled.div`
  .active {
    background: #d4d4ce !important;

    text-decoration: none !important;

    li {
      background: #d4d4ce !important;
    }
  }

  .normalLink {
    color: #000;
    text-decoration: none;

    li {
      width: 90%;
      border-radius: 7px;
      margin: auto;
    }

    svg {
      color: #000;
    }
  }
`;
