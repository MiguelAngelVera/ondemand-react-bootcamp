import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
export default function HomeButton() {
  return (
    <>
      <Link
        to="/ondemand-react-bootcamp/products"
        style={{ textDecoration: "none" }}
      >
        <button className="App-button">View all Products</button>
      </Link>
    </>
  );
}
