import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

import LoadingOverlay from 'react-loading-overlay';
import LanguageContext from "./languageContext";
import PageContent from "./pageContent";

export const ContextSpinner = React.createContext();
const ProviderSpinner = ContextSpinner.Provider;

const CheckLoggedIn = (props) => {
  if (!props.isLoggedIn) {
    return <Redirect from="/" to="/login" />;
  }
  return '';
};

const TheLayout = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    darkMode && "c-dark-theme"
  );

  //let language = React.useContext(LanguageContext);
  const [currLanguage, setCurrLanguage] = useState("ID");
  const [currFlag, setCurrFlag] = useState("cif-Id");
  const [spinner, setSpinner] = useState(false);
  LoadingOverlay.propTypes = undefined;

  useEffect(() => {
    if (window.sessionStorage.getItem("language")) {
      setCurrLanguage(window.sessionStorage.getItem("language"));
      if (window.sessionStorage.getItem("language") === "ID") {
        setCurrFlag("cif-Id");
      } else {
        setCurrFlag("cif-Us");
      }
    }
  }, []);

  function languageChange(flag, language) {
    setCurrFlag(flag);
    setCurrLanguage(language);
    window.sessionStorage.setItem("language", language);
  }

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  return (
    <>
      <LanguageContext.Provider
        value={{
          pageLanguage: currLanguage,
          pageContent: PageContent,
        }}
      >
        <CheckLoggedIn isLoggedIn={isLoggedIn} />
        <div className={classes}>
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader 
              currFlag={currFlag}
              currLanguage={currLanguage}
              languageChange={languageChange}
            />
            <div className="c-body">
              <ProviderSpinner
                value={{setSpinner}}
              > 
                <LoadingOverlay
                  active={spinner}
                  spinner
                  text= {window.sessionStorage.getItem("language") === "ID" ? "proses sedang berjalan" : "loading in progress"}
                 // text= {language.pageContent[language.pageLanguage].loadingMessage}
                >
                  <TheContent />
                </LoadingOverlay>
             </ProviderSpinner>
            </div>
            <TheFooter />
          </div>
        </div>
      </LanguageContext.Provider>
    </>
  );
};

export default TheLayout;
