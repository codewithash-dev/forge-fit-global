import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership | ForgeFit Global",
  description:
    "Choose a ForgeFit Train or ForgeFit Pro membership. Unlock a world of workouts with expert trainers, stunning locations, and programs for every goal.",
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
