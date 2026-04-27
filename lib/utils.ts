import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, currency?: string): string => {
  const formattedAmount = (amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: currency ?? "GHS",
    minimumFractionDigits: 2,
  });
  return formattedAmount.replace(/\.00$/, "");
};

export const capitalize = (text: string): string => {
  const articles = new Set(["the", "an", "a", "some"]);
  return text
    .split(" ")
    .map((word, index) => {
      if (index === 0 || !articles.has(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    })
    .join(" ");
};

export const capitalizeFirstLetter = (word: string | null | undefined): string => {
  if (!word || typeof word !== "string" || word.trim() === "") return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const truncateString = (str: string, num: number): string => {
  if (str.length > num) return str.slice(0, num) + "...";
  return str;
};

export const readableDate = (rawDate: string): string =>
  rawDate
    ? new Date(rawDate.replace(" ", "T")).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

export const openInNewTab = (url: string) => {
  if (globalThis.window && url) return globalThis.window.open(url, "_blank", "noreferrer");
};

export function numberWithCommas(x: any): string {
  if (!x) return "";
  return x.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",");
}
