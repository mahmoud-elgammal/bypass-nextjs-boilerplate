import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <h1>{"Page Not Found"}</h1>
      <p>{"The page you’re looking for doesn’t exist."}</p>
      <Link href="/">{"Back to Home"}</Link>
    </div>
  );
}
