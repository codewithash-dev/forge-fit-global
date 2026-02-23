import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | ForgeFit Global",
  description: "Log in to your ForgeFit account.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
