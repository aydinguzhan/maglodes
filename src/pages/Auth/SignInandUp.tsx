import React, { useRef, useState } from "react";
import Input from "../../components/global/Inputs/Input";
import Button from "../../components/global/Buttons/Button";
import Text from "../../components/global/Text/Text";
import authService from "../../services/api/auth";
import { useNavigate } from "react-router-dom";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../../utils/types";
import { ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import { loginAndRegisterSchema } from "../validationSchema/loginandRegister";
import Loader from "../../components/global/Loader/Loader";
import { useAuthStore } from "../../stores/useAuthStore";
import utils from "../../utils/utils";
import Spinner from "../../components/global/Loader/Spinner";
import { AxiosError } from "axios";

type Props = {
  isSingUp: boolean;
  setIsSingUp: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignInandUp({ isSingUp, setIsSingUp }: Props) {
  const formikRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = (await authService.login(payload)) as LoginResponse;
      if (res.success && res.data) {
        utils.toastMessageSuccess(res.message);

        setTimeout(() => {
          setIsLoading(false);
          setAuth(res.data.accessToken, res.data.user);
        }, 1000);
      }
    } catch (err: any) {
      utils.toastMessageError(err);
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const { message, success } = (await authService.register(
        payload
      )) as RegisterResponse;
      if (success) {
        utils.toastMessageSuccess(message);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (err: any) {
      utils.toastMessageError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
        }}
        innerRef={formikRef}
        validationSchema={loginAndRegisterSchema(isSingUp)}
        onSubmit={(values: RegisterPayload) => {
          if (isSingUp) return register(values);
          const loginPayload: LoginPayload = {
            email: values.email,
            password: values.password,
          };
          login(loginPayload);
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <div className="flex h-screen">
              {/* Sol kısım */}
              <div className="w-full sm:w-1/2 flex flex-col items-start justify-center p-4 bg-white">
                {/* Logo */}
                <div className="mb-6">
                  <img
                    className="w-30 h-8"
                    style={{
                      borderWidth: 0,
                      backgroundImage: "url('/Logo.png')",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>

                <div className="w-3/4 flex flex-col mb-8 gap-4">
                  <Text
                    color="black"
                    label={isSingUp ? "Create new account" : "Sign In"}
                    size="xxl"
                  />
                  <Text
                    color="gray"
                    label={
                      isSingUp
                        ? "Welcome! Please enter your details below"
                        : "Enter your credentials to continue"
                    }
                    size="sm"
                  />
                </div>

                {/* Form alanları */}
                <div className="w-3/4 flex flex-col gap-4">
                  {isSingUp && (
                    <Input
                      id="fullName"
                      name="fullName"
                      value={values.fullName}
                      onChange={(val: string) => setFieldValue("fullName", val)}
                      type="text"
                      label="Full Name"
                      placeHolder="John Doe"
                      errorMessage={errors.fullName}
                      disabled={isLoading}
                    />
                  )}

                  <Input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={(val: string) => setFieldValue("email", val)}
                    type="email"
                    label="Email"
                    placeHolder="user@example.com"
                    errorMessage={errors.email}
                    disabled={isLoading}
                  />

                  <Input
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={(val: string) => setFieldValue("password", val)}
                    type="password"
                    label="Password"
                    placeHolder="••••••••"
                    errorMessage={errors.password}
                    disabled={isLoading}
                  />

                  {/* Giriş / Kayıt butonu */}
                  <Button
                    bgColor="lime"
                    label={
                      isLoading ? <Spinner /> : isSingUp ? "Sign Up" : "Sign In"
                    }
                    type="submit"
                    disabled={isLoading}
                  />

                  {/* Google Button (dummy) */}
                  <Button
                    bgColor="white"
                    label={
                      <span className="flex justify-center items-center gap-3 text-gray-600">
                        <img
                          src="/Google.png"
                          alt="google"
                          className="w-5 h-5"
                        />
                        {isSingUp ? "Sign up" : "Sign in"} with Google
                      </span>
                    }
                    onClick={() =>
                      utils.toastMessageSuccess("Google auth coming soon")
                    }
                    disabled={isLoading}
                  />

                  <div className="text-center mt-4">
                    <Text
                      color="gray"
                      label={
                        <span>
                          {isSingUp
                            ? "Already have an account?"
                            : "Don’t have an account?"}
                          <span
                            className="font-bold text-black pl-1 hover:cursor-pointer hover:underline"
                            onClick={() => setIsSingUp((prev) => !prev)}
                          >
                            {isSingUp ? "Sign in" : "Sign up"}
                          </span>
                        </span>
                      }
                      size="sm"
                    />
                  </div>
                </div>
              </div>

              <div
                className="hidden sm:block w-1/2 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/signin.png')",
                }}
              ></div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
