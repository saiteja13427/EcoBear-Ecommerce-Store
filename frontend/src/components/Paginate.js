import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, keyword = "", page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          return (
            <LinkContainer
              key={x}
              to={
                isAdmin
                  ? `/admin/productlist/${x + 1}`
                  : keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
