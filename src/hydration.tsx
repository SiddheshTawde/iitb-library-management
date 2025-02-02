"use client";

import * as React from "react";
import { useBookList } from "./store";

const Hydration = () => {
  React.useEffect(() => {
    useBookList.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
