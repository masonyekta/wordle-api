import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = fs.readFileSync(readmePath, "utf-8");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-start max-w-xl">
        <h1 className="text-4xl font-bold">Wordle API</h1>
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl font-extrabold" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-bold" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-semibold" {...props} />
            ),
          }}
        >
          {readmeContent}
        </ReactMarkdown>
      </main>
    </div>
  );
}
