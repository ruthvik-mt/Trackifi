// src/components/FormInput.tsx
interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const FormInput = ({ label, type, value, onChange, placeholder }: Props) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border p-2 rounded"
        required
      />
    </div>
  );
};

export default FormInput;
