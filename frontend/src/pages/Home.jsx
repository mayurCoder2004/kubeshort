import { useState } from "react";

import { urlAPI } from "../api";

function Home() {

  const [url, setUrl] = useState("");

  const [shortUrl, setShortUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const generateShortUrl = async () => {

    if (!url) return;

    try {

      setLoading(true);

      const res = await urlAPI.post("/shorten", {
        url,
      });

      setShortUrl(res.data.shortUrl);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-[90vh]">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          KubeShort
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            className="border p-3 rounded-lg outline-none"
          />

          <button
            onClick={generateShortUrl}
            className="bg-black text-white p-3 rounded-lg hover:opacity-90"
          >
            {
              loading
                ? "Generating..."
                : "Generate Short URL"
            }
          </button>

          {
            shortUrl && (
              <div className="bg-gray-100 p-4 rounded-lg">

                <p className="font-semibold">
                  Short URL:
                </p>

                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-blue-600 break-all"
                >
                  {shortUrl}
                </a>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Home;