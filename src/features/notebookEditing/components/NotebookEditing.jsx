import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import { setNobebookContent } from "../../../redux/actions";
import { setNobebookStartAndEndTime } from "../../../redux/actions";

function NotebookEditer() {
  // 從 Store 取出的資料
  const notebookList = useSelector((state) => state.notebookList);
  const displayNumberList = useSelector((state) => state.notebookDisplaying);

  // dispatch 設置
  const dispatch = useDispatch();

  // 編輯跟展示 note
  const [displayNotebook, setDisplayNotebook] = useState(false);
  function displayToggle() {
    setDisplayNotebook(!displayNotebook);
  }

  //設定 子筆記 title
  const [subnotebooktitle, setSubNotebooktitle] = useState(null);

  // 呈現 創建筆記的時間
  const [subnotebookCreateTime, setSubNotebookCreateTime] = useState(null);

  // 編輯 note
  const [markdownText, setMarkdownText] = useState(null);

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
    dispatch(
      setNobebookContent(
        displayNumberList.notebookId,
        displayNumberList.subNotebookId,
        e.target.value
      )
    );
  };

  const handlePaste = (e) => {
    if (e.clipboardData && e.clipboardData.getData("text/plain")) {
      const pastedText = e.clipboardData.getData("text/plain");
      setMarkdownText(pastedText);
    }
  };

  const [task, setTask] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function onChange(e) {
    const { value, id } = e.target;

    if (id === "select-task") {
      setTask(value);
    }
    if (id === "start-date") {
      setStartDate(value);
      dispatch(
        setNobebookStartAndEndTime(
          displayNumberList.notebookId,
          displayNumberList.subNotebookId,
          "start-date",
          value
        )
      );
    }
    if (id === "end-date") {
      setEndDate(value);
      dispatch(
        setNobebookStartAndEndTime(
          displayNumberList.notebookId,
          displayNumberList.subNotebookId,
          "end-date",
          value
        )
      );
    }
  }

  // 利用 useEffect 來監聽變動的資料
  useEffect(() => {
    if (notebookList.length === 0) {
      setSubNotebooktitle(null);
      setSubNotebookCreateTime(null);
      setMarkdownText(null);
      setStartDate("2023-07-01");
      setEndDate("2023-07-01");
    } else {
      // 監聽變動的子筆記標題
      setSubNotebooktitle(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].subtitle
      );

      // 監聽變動的子筆記創建時間
      setSubNotebookCreateTime(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].subStart
      );

      // 監聽變動的子筆記內容
      setMarkdownText(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].content
      );
      setStartDate(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].subStart
      );
      setEndDate(
        notebookList[displayNumberList.notebookId - 1].subNotebook[
          displayNumberList.subNotebookId - 1
        ].subEnd
      );
    }
  }, [
    displayNumberList.notebookId,
    displayNumberList.subNotebookId,
    notebookList,
  ]);

  return (
    <Fragment>
      <div className="md:col-span-7 lg:col-span-8 bg-bgGray bg-opacity-20 rounded-xl md:p-4 border-gray border-[1px] md:border-0">
        <div className="rounded-md md:border-[1px] md:border-gray p-3 h-full w-full flex flex-col">
          <div className="flex flex-col md:justify-between px-2 w-full mt-2 mb-4">
            <div className="flex flex-col ">
              <div className="h2tag md:h1tag font-extrabold mb-3">
                {subnotebooktitle}
              </div>
              <div className="text-sm font-medium mt-[10px] w-108 ">
                {notebookList.length === 0 ? null : (
                  <fieldset
                    id="date"
                    className="mr-8 flex flex-wrap md:flex-nowrap"
                  >
                    <div className="fieldset-container mr-8 mb-4 md:mb-0">
                      <label
                        htmlFor="start-date"
                        className="h5tag mr-2 whitespace-nowrap"
                      >
                        Start date:
                      </label>
                      <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        value={startDate}
                        min="2022-01-01"
                        max="2050-12-31"
                        onChange={onChange}
                        className="w-[125px] px-[10px] py-[5px] h-[30px] md:h-[40px] h5tag rounded-md bg-lightgray"
                      />
                    </div>
                    <div className="fieldset-container mr-8">
                      <label
                        htmlFor="end-date"
                        className="h5tag mr-2 whitespace-nowrap"
                      >
                        End date:
                      </label>
                      <input
                        type="date"
                        id="end-date"
                        name="end-date"
                        value={endDate}
                        min="2022-01-01"
                        max="2050-12-31"
                        onChange={onChange}
                        className="w-[125px] px-[10px] py-[5px] h-[30px] md:h-[40px] h5tag rounded-md bg-lightgray"
                      />
                    </div>
                  </fieldset>
                )}
              </div>
            </div>
            <div className="flex items-end ">
              {displayNotebook ? (
                <button
                  className="btn w-[125px] bg-lightgray px-4 mt-[30px] h-[30px] md:h-[40px]"
                  onClick={displayToggle}
                >
                  Display Note
                </button>
              ) : (
                <button
                  className="btn w-[125px] bg-lightgray px-4 mt-[30px] h-[30px] md:h-[40px]"
                  onClick={displayToggle}
                >
                  Editing Note
                </button>
              )}
            </div>
          </div>
          <hr className="border-b-[0.1px] mt-[10px] lg:mb-5 border-gray" />
          <article className="px-2 pb-2 h-full">
            {displayNotebook ? (
              <textarea
                placeholder="貼上或輸入Markdown內容"
                value={markdownText}
                onChange={handleInputChange}
                onPaste={handlePaste}
                className="h-full w-full bg-lightgray bg-opacity-95 rounded-md resize-none p-4 md:pt-6 focus:outline-none"
              />
            ) : (
              <div className="prose flex justify-center items-center mx-auto">
                <ReactMarkdown className="p-0 md:p-4 md:pt-6 rounded-md w-[1500px] ">
                  {markdownText}
                </ReactMarkdown>
              </div>
            )}
          </article>
        </div>
      </div>
    </Fragment>
  );
}

export default NotebookEditer;
