import { months } from "../constants";

export default function TimeRange({ timeRange, setTimeRange }) {
  // add date selector values
  let monthsOptions = [];
  for (let i = 0; i < months.length; i++) {
    monthsOptions.push(
      <option key={i} value={i}>
        {months[i]}
      </option>
    );
  }

  const yearsOptions = [];
  for (let i = 2023; i <= 2050; i++) {
    yearsOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function onChange(e) {
    const { value, id } = e.target;

    if (id === "from-select-month") {
      setTimeRange((prevState) => {
        return { ...prevState, fromSelectMonth: value };
      });
    }
    if (id === "from-select-year") {
      setTimeRange((prevState) => {
        return { ...prevState, fromSelectYear: value };
      });
    }
    if (id === "to-select-month") {
      setTimeRange((prevState) => {
        return { ...prevState, toSelectMonth: value };
      });
    }
    if (id === "to-select-year") {
      setTimeRange((prevState) => {
        return { ...prevState, toSelectYear: value };
      });
    }
  }

  return (
    <div
      id="time-range__container"
      className="rounded-lg border border-gray p-3 w-1/3 h-[125px] flex flex-col"
    >
      <h2 className="h4tag font-bold mb-3">Tracker Period</h2>
      <div id="time-range" className="flex justify-between">
        <fieldset
          id="select-from"
          className="flex flex-nowrap justify-start whitespace-nowrap "
        >
          <legend className="h5tag">From</legend>
          <select
            id="from-select-month"
            name="from-select-month"
            value={timeRange.fromSelectMonth}
            onChange={onChange}
            className="h5tag w-[70px] px-[10px] py-[5px] h-[40px] h5tag rounded-md mr-2 bg-lightgray"
          >
            {monthsOptions}
          </select>
          <select
            id="from-select-year"
            name="from-select-year"
            value={timeRange.fromSelectYear}
            onChange={onChange}
            className="h5tag w-[80px] px-[10px] py-[5px] h-[40px] h5tag rounded-md bg-lightgray"
          >
            {yearsOptions}
          </select>
        </fieldset>

        <fieldset
          id="select-to"
          className="flex flex-nowrap justify-start whitespace-nowrap"
        >
          <legend className="">To</legend>
          <select
            id="to-select-month"
            name="to-select-month"
            value={timeRange.toSelectMonth}
            onChange={onChange}
            className="h5tag w-[70px] px-[10px] py-[5px] h-[40px] h5tag rounded-md mr-2 bg-lightgray"
          >
            {monthsOptions}
          </select>
          <select
            id="to-select-year"
            name="to-select-year"
            value={timeRange.toSelectYear}
            onChange={onChange}
            className="h5tag w-[80px] px-[10px] py-[5px] h-[40px] h5tag rounded-md bg-lightgray"
          >
            {yearsOptions}
          </select>
        </fieldset>
      </div>
    </div>
  );
}
