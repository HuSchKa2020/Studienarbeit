import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Toast() {
  const notify = () => {
    toast.success("Fehler erstellt.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 6000,
      closeOnClick: false,
      hideProgressBar: false,
    });
  };
  return (
    <div className="toast">
      <button onClick={notify}>Click</button>
    </div>
  );
}

export default Toast;

// import React, { useState, useEffect } from "react";
// import "./Toast.css";

// const Toast = () => {
//   const close = () => {};

//   return (
//     <>
//       <div className="notification-container bottom-right">
//         <div
//           className="notification toast"
//           style={{ backgroundColor: "green" }}
//         >
//           <button onClick={close}>X</button>
//           <div>
//             <p className="notification-title">Erfolgreich</p>
//             <p className="notification-message">
//               Der Fehler wurde hinzugefügt.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Toast;
