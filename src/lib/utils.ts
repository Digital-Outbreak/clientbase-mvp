import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = async (err: any) => {
  console.log("ShritCodeError: ", err);
  const errorMessage =
    err.message || String(err) || "An unexpected error occurred";

  toast.error(errorMessage, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const showToast = (message: string) => {
  toast(message, {
    icon: "🚀",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const showWIPToast = () => {
  toast("🚧🚧 Work In Progress", {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};
