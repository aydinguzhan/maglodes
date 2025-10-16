import React from "react";
import Input from "../../components/global/Inputs/Input";
import Button from "../../components/global/Buttons/Button";
import Text from "../../components/global/Text/Text";
export default function SignIn() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col items-start justify-baseline p-4 bg-white">
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
          <Text color="black" label={"Sign In"} size="xxl" />
          <Text
            color="gray"
            label={"Welcome back! Please enter your details"}
            size="xl"
          />
          <div className="w-3/4 flex flex-col justify-center items-center">
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
                  Sign in with google
                </span>
              }
              onClick={() => {}}
            />

            <div className="">
              <Text
                color="gray"
                label={
                  <span>
                    Don’t have an account ?
                    <span className="font-bold text-black pl-1 hover:cursor-pointer hover:shadow-">
                      Sign up
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
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/signin.png')",
        }}
      ></div>
    </div>
  );
}
