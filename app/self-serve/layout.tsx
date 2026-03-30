import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Services | Blurrd Studio",
  description: "Pick your services and packages",
};

export default function SelfServeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
