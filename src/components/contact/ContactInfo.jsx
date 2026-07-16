import contact from "../../data/contact";
import { Mail, Phone, MapPin, Copy } from "lucide-react";
import toast from "react-hot-toast";

function ContactInfo() {
  const items = [
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contact.location,
    },
  ];

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Failed to copy ${label}`);
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className="rounded-xl bg-violet-600/20 p-3 text-violet-400">
              <Icon size={20} aria-hidden="true" />
            </div>

            <div>
              <p className="text-sm text-gray-400">
                {item.label}
              </p>

              {item.href ? (
             <button
  onClick={() => copy(item.value, item.label)}
  aria-label={`Copy ${item.label}`}
  className="flex items-center gap-2 text-left text-white transition hover:text-violet-400"
>
  {item.value}

  <Copy size={15} aria-hidden="true" />
</button>
              ) : (
                <p className="text-white">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactInfo;