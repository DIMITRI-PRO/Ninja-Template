import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Button name="language" onClick={() => handleChangeLanguage("en")}>
        Eng
      </Button>
      <Button name="language" onClick={() => handleChangeLanguage("fr")}>
        Fr
      </Button>
    </>
  );
};
