import React, { useState } from "react";
import Input from "../../components/global/Inputs/Input";
import Button from "../../components/global/Buttons/Button";
import Text from "../../components/global/Text/Text";

export default function SignInandUp() {
  const [isSingUp, setIsSingUp] = useState<boolean>(false);
  return (
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
              onChange={() => {}}
              type="text"
              label="FullName"
              placeHolder="Full Name"
              hidden={!isSingUp}
            />
            <Input
              id="email"
              onChange={() => {}}
              type="email"
              label="Email"
              placeHolder="Email"
            />
            <Input
              id="password"
              onChange={() => {}}
              type="password"
              label="Password"
              placeHolder="Password"
            />

            <Button bgColor="lime" label="Sign In" onClick={() => {}} />
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
                      onClick={() => setIsSingUp(!isSingUp)}
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
  );
}
