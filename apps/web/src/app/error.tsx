"use client";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => reset()}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
