import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-float"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-white" />
  </a>
);

export default WhatsAppFloat;
