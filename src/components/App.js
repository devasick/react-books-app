import React from "react";
import Header from "./header/Header";
import SideNav from "./sidenav/SideNav";
import Footer from "./footer/Footer";
import BookList from "./books/BookList";

const App = () => (
  <React.Fragment>
    <Header />
    <SideNav />
    <BookList />
    <Footer />
  </React.Fragment>
);

export default App;
