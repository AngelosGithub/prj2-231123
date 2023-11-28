import Slider from "react-slick";
import styled from "@emotion/styled";

export const Styled_Slide = styled(Slider)`
  .dots_custom {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    boder: 1px solid black;
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px;
    padding: 0;
  }

  .dots_custom li button {
    border: none;
    background: #d1d1d1;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    padding: 0;
  }

  .dots_custom li.slick-active button {
    background-color: #08c1ce;
  }
`;
