import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (data.email === "admin@example.com" && data.password === "123456") {
      dispatch(login({ email: data.email }));
      navigate("/dashboard");
    } else {
      alert("E-posta veya şifre yanlış!");
    }
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Giriş Yap
        </h2>

        {/* Email */}
        <label className="input-label" htmlFor="email">
          E-posta
        </label>
        <input
          id="email"
          type="email"
          placeholder="E-posta adresinizi girin"
          className={`input-base
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
          {...register("email", {
            required: "E-posta gerekli",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Geçersiz e-posta formatı",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Şifre */}
        <label className="input-label" htmlFor="password">
          Şifre
        </label>
        <div className="relative">
          <input
            id="password"
            type={"password"}
            placeholder="Şifrenizi girin"
            className={`input-base
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
            {...register("password", {
              required: "Şifre gerekli",
              minLength: {
                value: 6,
                message: "Şifre en az 6 karakter olmalı",
              },
            })}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}

        {/* Giriş butonu */}
        <button type="submit" className="auth-button">
          Giriş Yap
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Henüz hesabınız yok mu?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Kayıt Ol
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
