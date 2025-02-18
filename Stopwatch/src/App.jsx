import { useRef, useState } from "react";

function App() {
  const [time, settime] = useState(0);
  const [lapArr, setLapArr] = useState([]);
  const [isdisabled, setisdisabled] = useState(false);
  const stopwatchRef = useRef(0);
  const intervalRef = useRef(0);

  function handleStart() {
    const timer = new Date().getTime() - time;

    intervalRef.current = setInterval(() => {
      settime(new Date().getTime() - timer);
    }, 10);

    setisdisabled(true);
  }

  function timeFormat() {
    const ms = (time % 1000).toString().padStart(3, "0");
    const totalSeconds = Math.floor(time / 1000);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = (totalMinutes % 60).toString().padStart(2, "0");
    const hours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const xyz = `${minutes}:${seconds}:${ms}`;

    return xyz;
  }
  function handlePause() {
    clearInterval(intervalRef.current);
    setisdisabled(false);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    settime(0);
    setisdisabled(false);
    setLapArr([]);
  }

  function Lap() {
    {
    }
    setLapArr((prev) => [...prev, timeFormat()]);
    console.log(lapArr);
  }
  return (
    <>
      <div className="flex justify-center min-h-screen bg-[#628395] items-center">
        <div className="h-[300px] w-[300px] bg-amber-800 flex flex-col items-center">
          <span className="w-[200px]  text-3xl  mt-15 font-bold text-center p-2 text-[#FFD9CE] border-[2px]  rounded-2xl border-gray-500">
            {timeFormat()}
          </span>
          <div className="button mt-3">
            {isdisabled ? (
              <button className="bg-gray-400 mx-2 rounded-lg w-auto h-auto p-2">
                Start
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="bg-[#DB5461] mx-2 hover:bg-[#db5462d3] cursor-pointer text-gray-200 rounded-lg w-auto h-auto p-2 "
              >
                Start
              </button>
            )}
            {isdisabled ? (
              <button
                onClick={handlePause}
                className="bg-[#DB5461] mx-2 hover:bg-[#db5462d3] cursor-pointer rounded-lg w-auto h-auto p-2  "
              >
                Pause
              </button>
            ) : (
              <button className="bg-gray-400 mx-2 rounded-lg w-auto h-auto p-2 ">
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-[#DB5461]  mx-2 hover:bg-[#db5462d3] rounded-lg w-auto h-auto p-2 "
            >
              Reset
            </button>
            <button
              onClick={Lap}
              className="bg-[#DB5461] mx-2 hover:bg-[#db5462d3] rounded-lg w-auto h-auto p-2 "
            >
              Lap
            </button>
          </div>
          {lapArr.map((Lap, ind) => {
            return (
              <p className="mt-2 p-1 font-semibold text-gray-700" key={ind}>
                <span className="text-black">
                  Lap {ind + 1}
                  {}:
                </span>
                {Lap}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
