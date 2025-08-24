import { useState, useEffect } from "react";
import TimeColumn from "./timeColumn";

type TimeitProps = {
  onChange?: (hour: string, minute: string) => any;
  defaultValue?: string;
  minuteExclude?: Array<number>;
  hourExclude?: Array<number>;
  notShowExclude?: boolean;
  hourValue?: string;
  minuteValue?: string;
};

const Timeit = ({
  onChange,
  defaultValue,
  minuteExclude,
  hourExclude,
  notShowExclude,
  hourValue,
  minuteValue,
}: TimeitProps) => {
  const [hour, setHour] = useState(
    defaultValue ? defaultValue.split(":")[0] : "00"
  );
  const [minute, setMinute] = useState(
    defaultValue ? defaultValue.split(":")[1] : "00"
  );

  useEffect(() => {
    onChange && onChange(hour, minute);
  }, [hour, minute]);

  return (
    <div className="flex flex-row ltr space-x-2">
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={59}
        value={minuteValue || minute}
        setValue={setMinute}
        exclude={minuteExclude}
      />
      <p className=" my-auto text-2xl">:</p>
      <TimeColumn
        notShowExclude={notShowExclude}
        start={0}
        end={23}
        value={hourValue || hour}
        setValue={setHour}
        exclude={hourExclude}
      />
    </div>
  );
};

export default Timeit;
