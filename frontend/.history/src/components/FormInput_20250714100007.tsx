// // src/components/FormInput.tsx
// interface Props {
//   label: string;
//   type: string;
//   value: string;
//   onChange: (val: string) => void;
//   placeholder?: string;
// }

// const FormInput = ({ label, type, value, onChange, placeholder }: Props) => {
//   return (
//     <div className="mb-4">
//       <label className="block font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full border p-2 rounded"
//         required
//       />
//     </div>
//   );
// };

// export default FormInput;

import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full p-2 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
