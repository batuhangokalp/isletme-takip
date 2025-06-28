import React from "react";
import RegisterForm from "../../components/Auth/Register/RegisterForm";
import RightSide from "../../components/Auth/RightSide";

const Register = () => {
  return (
    <div className="flex min-h-screen">
      <RegisterForm />
      <RightSide />
    </div>
  );
};

export default Register;
