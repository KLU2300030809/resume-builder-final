import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Linkedin,
  Github,
} from "lucide-react";
import {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const PersonalInfoForm = forwardRef(
  ({ data, onChange }, ref) => {
    const [showSaved, setShowSaved] = useState(false);

    const submitForm = () => {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    };

    useImperativeHandle(ref, () => ({
      submitForm,
    }));

    const fields = useMemo(
      () => [
        { key: "full_name", label: "Full Name", icon: User, required: true },
        { key: "email", label: "Email", icon: Mail, required: true },
        { key: "phone", label: "Phone Number", icon: Phone },
        { key: "location", label: "Location", icon: MapPin },
        {
          key: "profession",
          label: "Profession",
          icon: Briefcase,
          required: true,
        },
        {
          key: "linkedin",
          label: "LinkedIn Profile",
          icon: Linkedin,
          required: true,
        },
        {
          key: "github",
          label: "GitHub Profile",
          icon: Github,
          required: true,
        },
      ],
      []
    );

    return (
      <div className="relative space-y-6">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.key}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Icon className="size-4 text-indigo-500" />
                {field.label}
                {field.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>

              <input
                value={data[field.key] || ""}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          );
        })}

        {showSaved && (
          <div className="absolute -top-4 right-0 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow">
            ✅ Saved successfully
          </div>
        )}
      </div>
    );
  }
);

export default PersonalInfoForm;