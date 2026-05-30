import { useState } from "react";

import { analyticsAPI } from "../api";

function Analytics() {

  const [shortCode, setShortCode] = useState("");

  const [clicks, setClicks] = useState(null);

  const [loading, setLoading] = useState(false);

  const getAnalytics = async () => {

    if (!shortCode) return;

    try {

      setLoading(true);

      const res = await analyticsAPI.get(
        `/analytics/${shortCode}`
      );

      setClicks(res.data.clicks);

    } catch (error) {

      console.log(error);

      setClicks(null);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="flex justify-center items-center min-h-[90vh]">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center mb-8">
          Analytics
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter Short Code"
            value={shortCode}
            onChange={(e) =>
              setShortCode(e.target.value)
            }
            className="border p-3 rounded-lg outline-none"
          />

          <button
            onClick={getAnalytics}
            className="bg-black text-white p-3 rounded-lg hover:opacity-90"
          >
            {
              loading
                ? "Loading..."
                : "Get Analytics"
            }
          </button>

          {
            clicks !== null && (
              <div className="bg-gray-100 p-4 rounded-lg">

                <p className="text-xl font-semibold">
                  Total Clicks
                </p>

                <h2 className="text-5xl font-bold mt-2">
                  {clicks}
                </h2>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Analytics;