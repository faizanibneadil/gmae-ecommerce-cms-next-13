"use client";

import { memo } from "react";

const Error: React.FC<{}> = memo(() => {
  return <div>Something Went Wrong ...</div>;
});
Error.displayName = "Error";
export default Error;
