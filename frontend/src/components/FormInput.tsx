import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-md bg-input text-foreground placeholder-muted-foreground border ${
          error ? "border-red-500" : "border-border"
        } focus:outline-none focus:ring-2 focus:ring-ring transition`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
