import React, { useContext } from "react";
import AuthContext from "./../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const PasswordResetModal = ({ modalRef }) => {
  const { handlePassResetEmail } = useContext(AuthContext);

  const handleNewPassReqForm = (e) => {
    e.preventDefault();
    // get data from form
    const form = e.target;
    const email = form.email.value;
    // const pass
    handlePassResetEmail(email)
      .then(() => {
        // Password reset email sent!
        toast("Password reset email sent!");

        // Close the modal after success
        modalRef.current.close();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
      });
  };
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box  overflow-hidden">
        <form onSubmit={(e)=>{e.preventDefault()
            modalRef.current.close();

        }
        } method="dialog ">
          
          <button  className="btn btn-md btn-circle btn-ghost border-2 border-teal-200 absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleNewPassReqForm} className="w-full mx-auto flex flex-col justify-center items-center ">
         
           <div>
           <h3 className="font-bold text-lg">Enter Email</h3>
            <input
              type="email"
              name="email"
              className="text w-full border-2 border-teal-500 p-2 my-2 rounded-md"
              placeholder="johndoe@gmail.com"
              required
            />
           </div>
          
         <div className="my-5">

          {/* <input type="submit" className="btn border-2 border-teal-300 rounded-lg" value={"Reset Password"}></input> */}
          <button  className="btn border-2 border-teal-300 rounded-lg">Reset Password</button>
         </div>
        </form>
        <p className="py-4 text-center text-red-300">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  );
};

export default PasswordResetModal;
