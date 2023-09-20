import { useState } from "react";
import "./homeHead.scss";
import NewPayment from "../newPayment/NewPayment.jsx";
import { useTranslation } from "react-i18next";

const HomeHead = () => {

  const { t } = useTranslation();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="homeHead">
      <div className="hHeadContainer">
          <h3>{t("homeHead.h1")}</h3>
          <button onClick={() => setOpenForm(true)}>+</button>
      </div>

      {openForm && <NewPayment setOpenForm={setOpenForm} />}
    </div>
  );
};

export default HomeHead;
