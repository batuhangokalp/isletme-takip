import React from "react";
import RightSide from "../../components/Auth/RightSide";
import LoginForm from "../../components/Auth/Login/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      <LoginForm />
      <RightSide />
    </div>
  );
}
