import QRCode from "qrcode";
import { QR_CONTACT_URL } from "@/lib/constants";

export async function generateContactQrDataUrl(): Promise<string> {
  return QRCode.toDataURL(QR_CONTACT_URL, {
    width: 160,
    margin: 1,
    color: { dark: "#0a2463FF", light: "#FFFFFFFF" },
    errorCorrectionLevel: "M",
  });
}
