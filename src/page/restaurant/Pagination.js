import { Box, Button, Center } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  return (
    <Center marginTop={5}>
      <Box>
        {pageInfo.prevPageNumber > 0 && (
          <PageButton pageNumber={1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </PageButton>
        )}

        {pageInfo.prevPageNumber > 0 && (
          <PageButton pageNumber={pageInfo.prevPageNumber}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </PageButton>
        )}
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

        {pageInfo.nextPageNumber && (
          <PageButton pageNumber={pageInfo.nextPageNumber}>
            <FontAwesomeIcon icon={faChevronRight} />
          </PageButton>
        )}
        {pageInfo.nextPageNumber && (
          <PageButton pageNumber={pageInfo.lastPageNumber}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </PageButton>
        )}
      </Box>
    </Center>
  );
}
