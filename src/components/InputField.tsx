"use client";
const InputField = ({ ...rest }) => {
  return (
    <input
      className="w-full appearance-none rounded-2xl border py-2 px-3 leading-tight text-gray-700 shadow-md focus:ring-0 focus:outline focus:outline-cyan-500"
      {...rest}
    />
  );
};

export default InputField;
