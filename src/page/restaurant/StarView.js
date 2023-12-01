import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ImStarFull } from "react-icons/im";

import { FaStar } from "react-icons/fa6";
import styled from "@emotion/styled";

export function StarView() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(3);

  const array = [0, 1, 2, 3, 4];
  // TODO: 별점 데이터 전달 받아서  출력 해주는 컴포넌트
  useEffect(() => {
    sendReview();
  }, [clicked]);
  console.log(clicked);
  const sendReview = () => {
    let score = clicked.filter(Boolean).length;

    console.log(score);
  };

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  return (
    <Stars>
      {array.map((el, idx) => {
        return (
          <FaStar
            key={idx}
            size={"50"}
            onClick={() => handleStarClick(el)}
            className={clicked[el] && "yellowStar"}
          />
        );
      })}
    </Stars>
  );
}
//
const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
