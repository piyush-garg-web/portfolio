import { Download, Send } from "lucide-react";

import Button from "../common/Button";
import contact from "../../data/contact";

function ContactCTA() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        href={contact.resume}
        target="_blank"
        className="gap-2"
      >
        <Download size={18} />
        Download Resume
      </Button>

      <Button
        href={`mailto:${contact.email}`}
        variant="secondary"
        className="gap-2"
      >
        <Send size={18} />
        Let's Connect
      </Button>
    </div>
  );
}

export default ContactCTA;