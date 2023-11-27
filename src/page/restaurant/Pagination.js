import { Box, Button } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";

function PageButton({ pageNumber, variant, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/restaurantList/?" + params);
  }
  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

export function Pagination({ pageInfo }) {
  const pageNumbers = [];

  if (pageInfo != null) {
    for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
      pageNumbers.push(i);
    }
  }
  console.log(pageNumbers);
  return (
    <>
      <Box>
        {pageNumbers.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            variant={
              pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
            }
            pageNumber={pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}
      </Box>
    </>
  );
}
