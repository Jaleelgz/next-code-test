import styled from "@emotion/styled";

export const StyledHomeLayout = styled.div`
  * {
    box-sizing: border-box;
  }

  .navBarParent {
    position: sticky;
    top: 0px;
    left: 0px;
    z-index: 55px !important;
  }

  .layoutBody {
    display: flex;

    & .leftSideParent {
      position: sticky;
      top: 64px;
      left: 0px;
      height: calc(100vh - 64px);
      background-color: "#fff";
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      overflow-y: auto;
      min-width: 200px;
      z-index: 20px !important;

      @media screen and (max-width: 899px) {
        min-width: 170px;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      & > div {
        display: flex;
        flex-direction: column;
        gap: 20px !important;
      }
    }

    & .rightSideParent {
      width: 100%;
      overflow: auto;
    }
  }

  & .footerParent {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: cadetblue !important;
    padding: 20px 30px;
    margin: auto;
  }
`;
