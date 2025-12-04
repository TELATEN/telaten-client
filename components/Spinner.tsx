export default function Spinner() {
  return (
    <div className="flex gap-1">
      <div
        className="h-1.5 w-1.5 dark:bg-white bg-black/80 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="h-1.5 w-1.5 dark:bg-white bg-black/80 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="h-1.5 w-1.5 dark:bg-white bg-black/80 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}
