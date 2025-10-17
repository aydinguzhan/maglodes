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
  User,
} from "../../utils/types";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { loginAndRegisterSchema } from "../validationSchema/loginandRegister";
import Loader from "../../components/global/Loader/Loader";
import utils from "../../utils/utils";

type Props = {
  isSingUp: boolean;
  setIsSingUp: React.Dispatch<React.SetStateAction<boolean>>;
  onLogin: (token: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export default function SignInandUp({
  isSingUp,
  setIsSingUp,
  onLogin,
  setUser,
}: Props) {
  const formikRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = (await authService.login(payload)) as LoginResponse;
      if (res.success) {
        toast.success(res.message);
        setUser(res.data.user as User);
        onLogin(res.data.accessToken);
        navigate("/dashboard");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
    setIsLoading(false);
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    const { data, message, success } = (await authService.register(
      payload
    )) as RegisterResponse;
    if (success && message) {
      toast.success(message);
      navigate("/auth");
    } else toast.error(message);
    setIsLoading(false);
  };

  return (
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
      {({ values, setFieldValue, errors }) => {
        return (
          <Form>
            <div className="flex h-screen">
              <div className="w-full sm:w-1/2 sm:justify-center  flex flex-col items-start justify-baseline p-4 bg-white">
                <div>
                  <img
                    className="w-30 h-8"
                    style={{
                      borderWidth: 0,
                      backgroundImage: "url('/Logo.png')",
                    }}
                  />
                </div>

                <div className="w-4/4 h-full flex flex-col justify-center items-center">
                  <div className="w-3/4  text-start  flex  flex-col mb-8 gap-4">
                    <Text
                      color="black"
                      label={isSingUp ? "Create new account" : "Sign In"}
                      size="xxl"
                    />
                    <Text
                      color="gray"
                      label={
                        isSingUp
                          ? "Welcome back! Please enter your details"
                          : "Create new account"
                      }
                      size="sm"
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-center items-center">
                    <Input
                      id="fullName"
                      name="fullName"
                      value={values?.fullName}
                      onChange={(val: string) => setFieldValue("fullName", val)}
                      type="text"
                      label="FullName"
                      placeHolder="Full Name"
                      hidden={!isSingUp}
                      errorMessage={errors.fullName}
                    />

                    <Input
                      id="email"
                      name="email"
                      value={values?.email}
                      onChange={(val: string) => setFieldValue("email", val)}
                      type="email"
                      label="Email"
                      placeHolder="Email"
                      errorMessage={errors.email}
                    />
                    <Input
                      id="password"
                      name="password"
                      value={values?.password}
                      onChange={(val: string) => setFieldValue("password", val)}
                      type="password"
                      label="Password"
                      placeHolder="Password"
                      errorMessage={errors.password}
                    />

                    <Button
                      bgColor="lime"
                      label={isLoading ? <Loader /> : "Sign In"}
                      type="submit"
                      disabled={isLoading}
                    />
                    <Button
                      bgColor="white"
                      label={
                        <span className="flex justify-center items-center gap-4 text-gray-600">
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              backgroundImage: "url('/Google.png')",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                            className="h-screen w-1/2"
                          />
                          {isSingUp ? "Sign up " : "Sign in "}with google
                        </span>
                      }
                      onClick={() => {}}
                    />

                    <div className="">
                      <Text
                        color="gray"
                        label={
                          <span>
                            {isSingUp
                              ? "Already have an account ? "
                              : "Don’t have an account ? "}

                            <span
                              className="font-bold text-black pl-1 hover:cursor-pointer hover:shadow-2xl"
                              onClick={() =>
                                setIsSingUp((prev: boolean) => !prev)
                              }
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
              </div>

              <div
                className="w-0 sm:w-1/2  bg-cover bg-center hidden sm:block "
                style={{
                  backgroundImage: "url('/signin.png')",
                }}
              ></div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
