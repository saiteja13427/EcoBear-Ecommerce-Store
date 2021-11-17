import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </>
  );
};

Meta.defaultProps = {
  title: "Welcome To EcoBear",
  description: "Best ecofriendly products at the best prices",
  keywords: "ecofriendly, bamboo, natural",
};
export default Meta;
