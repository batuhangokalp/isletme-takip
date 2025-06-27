import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; // şifre tekrarı için eklendi
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = watch("password"); // şifreyi izle

  const onSubmit = (data: FormData) => {
    // burada gerçek kayıt işlemi yapılacak ama biz demo amaçlı login dispatch ediyoruz
    dispatch(login({ email: data.email }));
    navigate("/dashboard");
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Kayıt Ol
        </h2>

        {/* Ad Soyad */}
        <label
          className="input-label"
          htmlFor="name"
        >
          Ad Soyad
        </label>
        <input
          id="name"
          type="text"
          placeholder="Adınızı girin"
          className={`input-base ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          {...register("name", {
            required: "Ad soyad gerekli",
            minLength: { value: 3, message: "En az 3 karakter girin" },
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}

        {/* Email */}
        <label
          className="input-label"
          htmlFor="email"
        >
          E-posta
        </label>
        <input
          id="email"
          type="email"
          placeholder="E-posta adresinizi girin"
          className={`input-base ${
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
        <label
          className="input-label"
          htmlFor="password"
        >
          Şifre
        </label>
        <input
          id="password"
          type="password"
          placeholder="Şifrenizi girin"
          className={`input-base ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          {...register("password", {
            required: "Şifre gerekli",
            minLength: { value: 6, message: "Şifre en az 6 karakter olmalı" },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}

        {/* Şifre Tekrar */}
        <label
          className="input-label"
          htmlFor="confirmPassword"
        >
          Şifre Tekrar
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Şifrenizi tekrar girin"
          className={`input-base ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          {...register("confirmPassword", {
            required: "Şifre tekrarı gerekli",
            validate: (value) => value === password || "Şifreler eşleşmiyor",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Kayıt Ol Butonu */}
        <button type="submit" className="auth-button">
          Kayıt Ol
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
