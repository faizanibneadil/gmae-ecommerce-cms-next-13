"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(`
  ===============GLOBAL ERROR=============
  ${error}
  ===============GLOBAL ERROR==============
  `);
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
