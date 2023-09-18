import { useState } from "react";
import "./homeHead.scss";
import NewPayment from "../newPayment/NewPayment.jsx";

const HomeHead = () => {

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="homeHead">
      <div className="hHeadContainer">
          <h3>My Payments:</h3>
          <button onClick={() => setOpenForm(true)}>+</button>
      </div>

      {openForm && <NewPayment setOpenForm={setOpenForm} />}
    </div>
  );
};

export default HomeHead;
