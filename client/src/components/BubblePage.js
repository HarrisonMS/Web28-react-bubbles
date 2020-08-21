import React, { useState, useEffect } from "react";

import { fetchApi } from './fetchApi'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    fetchApi()
    .then((res) => {
      setColorList(res.data)
    })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles data-testid='bubbles' colors={colorList} />
    </>
  );
};

export default BubblePage;
