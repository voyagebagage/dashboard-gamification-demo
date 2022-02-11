import { Pagination } from "semantic-ui-react";
// import { useState } from "react";

export const PaginationShortCentered = ({
  maxPages,
  limit,
  from,
  targetPage,
  setTargetPage,
}) => {
  return (
    <div className="dFlex-center">
      <Pagination
        activePage={targetPage}
        defaultActivePage={1}
        boundaryRange={undefined}
        // ellipsisItem={null}
        // maxPages / 2 >= targetPage && maxPages % 2 === 0
        //   ? maxPages / 2
        //   : maxPages / 2 + 0.5
        firstItem={targetPage < 4 ? null : 1}
        lastItem={null}
        siblingRange={0}
        totalPages={maxPages}
        onPageChange={(event, pageInfo) => {
          setTargetPage(pageInfo.activePage);
          console.log("=========ON CHANGE===========");
          console.log(from, limit, targetPage, "from, limit, targetPage");
        }}
        // nextItem={next}
      />
    </div>
  );
};

export const PaginationLong = () => (
  <div className="dFlex-fEnd">
    <Pagination defaultActivePage={5} totalPages={10} />
  </div>
);
