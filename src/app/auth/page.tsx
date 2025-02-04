import { redirect } from "next/navigation";

export default function HomePage() {
  // Perform the redirection
  redirect("/auth/login"); // Redirect to the login page

  return null; // This will never be rendered because of the redirect
}
