import { months } from "../../../../assets/data/constants";

export default function TimeRange({ timeRange, setTimeRange }) {
  let monthsOptions = [];
  for (let i = 0; i < months.length; i++) {
    monthsOptions.push(
      <option key={i} value={String(i)}>
        {months[i]}
      </option>
    );
  }

  const yearsOptions = [];
  for (let i = 2023; i <= 2050; i++) {
    yearsOptions.push(
      <option key={i} value={String(i)}>
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
      className="rounded-lg border border-gray p-3 flex flex-col md:w-1/3"
    >
      <h2 className="h3tag font-bold mb-3 md:h4tag md:mb-8">Tracker Period</h2>
      <div
        id="time-range"
        className="flex flex-col lg:justify-between 2xl:flex-row 2xl:justify-start"
      >
        <fieldset
          id="select-from"
          className="flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center mb-3 2xl:mb-0 2xl:mr-8"
        >
          <div className="text-[1rem] mr-3 mb-1 md:h5tag">From</div>
          <div className="flex">
            <select
              id="from-select-month"
              name="from-select-month"
              value={timeRange.fromSelectMonth}
              onChange={onChange}
              className="h5tag text-center w-[50px] px-[10px] py-[5px] h-[30px] md:h-[40px] rounded-md mr-2 bg-lightgray appearance-none hover:border hover:border-colorText"
            >
              {monthsOptions}
            </select>
            <select
              id="from-select-year"
              name="from-select-year"
              value={timeRange.fromSelectYear}
              onChange={onChange}
              className="h5tag text-center w-[60px] px-[10px] py-[5px] h-[30px] md:h-[40px] rounded-md bg-lightgray appearance-none hover:border hover:border-colorText"
            >
              {yearsOptions}
            </select>
          </div>
        </fieldset>
        <fieldset
          id="select-to"
          className="flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center lg:mb-0"
        >
          <div className="text-[1rem] mr-3 mb-1 md:h5tag">To</div>
          <div className="flex">
            <select
              id="to-select-month"
              name="to-select-month"
              value={timeRange.toSelectMonth}
              onChange={onChange}
              className="h5tag text-center w-[50px] px-[10px] py-[5px] h-[30px] md:h-[40px] h5tag rounded-md mr-2 bg-lightgray  appearance-none hover:border hover:border-colorText"
            >
              {monthsOptions}
            </select>
            <select
              id="to-select-year"
              name="to-select-year"
              value={timeRange.toSelectYear}
              onChange={onChange}
              className="h5tag text-center w-[60px] px-[10px] py-[5px] h-[30px] md:h-[40px] h5tag rounded-md bg-lightgray appearance-none hover:border hover:border-colorText"
            >
              {yearsOptions}
            </select>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
