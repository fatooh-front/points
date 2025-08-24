import { useState, useEffect } from "react";

type TimeColumnProps = {
  start: number;
  end: number;
  setValue: (value: string) => void;
  value: string;
  exclude?: Array<number>;
  notShowExclude?: boolean;
};

const TimeColumn = ({
  start,
  end,
  setValue,
  value,
  exclude,
  notShowExclude,
}: TimeColumnProps) => {
  const [selectorMove, setSelectorMove] = useState<number>(+value ? +value : 0);

  const timeArray: (string | number)[] = [];
  for (let time = start; time <= end; time++) {
    if (notShowExclude) !exclude?.includes(time) && timeArray.push(time);
    else timeArray.push(time);
  }

  useEffect(() => {
    let prev = selectorMove;
    if (exclude?.includes(prev)) {
      while (exclude?.includes(prev)) {
        prev = prev + 1;
        setSelectorMove(prev);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setValue(
      selectorMove.toString().length === 1
        ? `0${selectorMove}`
        : selectorMove.toString()
    );
  }, [selectorMove, setValue]);

  const controlBottom = () => {
    let prev = selectorMove;
    if (prev !== end) {
      if (exclude?.includes(prev + 1)) {
        while (exclude?.includes(prev + 1)) {
          if (prev + 2 > end) {
            return setSelectorMove(start);
          }
          prev = prev + 1;
          setSelectorMove(prev + 1);
        }
      } else {
        return setSelectorMove(prev + 1);
      }
    } else {
      return setSelectorMove(start);
    }
  };

  const controlTop = () => {
    let prev = selectorMove;
    if (prev !== start) {
      if (exclude?.includes(prev - 1)) {
        while (exclude?.includes(prev - 1)) {
          if (prev - 2 < start) {
            return setSelectorMove(end);
          }
          prev = prev - 1;
          setSelectorMove(prev - 1);
        }
      } else {
        return setSelectorMove(prev - 1);
      }
    } else {
      let endnumber = end;
      if (exclude?.includes(end)) {
        while (exclude?.includes(endnumber - 1)) {
          endnumber = endnumber - 1;
          setSelectorMove(endnumber - 1);
        }
      } else {
        return setSelectorMove(end);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="cursor-pointer transition-opacity hover:opacity-50"
        onClick={controlTop}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9201 15.0499L13.4001 8.52989C12.6301 7.75989 11.3701 7.75989 10.6001 8.52989L4.08008 15.0499"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary"
          />
        </svg>
      </div>

      <div className="relative flex flex-col items-center h-10 w-16 overflow-hidden select-none">
        <div className="absolute top-w w-full h-10 rounded-lg" />
        <div
          className="flex flex-col items-center w-full leading-10 text-lg transition-transform pt-0"
          style={{
            transform: "translateY(0px)",
          }}
        >
          {timeArray
            .filter((time) => +time === selectorMove)
            .map((time) => (
              <div
                key={time}
                className={`z-10 text-primary opacity-100 transition-colors ${
                  exclude && exclude.includes(+time)
                    ? "opacity-20 pointer-events-none"
                    : ""
                }`}
              >
                <input
                  className=" w-full flex items-center text-center justify-center"
                  type="number"
                  name="time"
                  value={value}
                  onChange={(e) => {
                    start <= +e.target.value &&
                      +e.target.value <= end &&
                      e.target.value.length <= 2 &&
                      setValue(e.target.value);
                  }}
                  checked
                ></input>
                {time.toString().length === 1 ? `0${time}` : time}
              </div>
            ))}
        </div>
      </div>
      <div
        className="cursor-pointer transition-opacity hover:opacity-50"
        onClick={controlBottom}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary"
          />
        </svg>
      </div>
    </div>
  );
};

export default TimeColumn;
