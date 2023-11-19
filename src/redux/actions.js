export const addNotebook = (newNotebookName, number, createTime) => {
  return {
    type: "notebookList/addNotebook",
    payload: {
      id: number,
      title: newNotebookName,
      start: createTime,
      end: createTime,
      subNotebook: [
        {
          subId: 0,
          subtitle: "Default SubNotebook",
          subStart: createTime,
          subEnd: createTime,
          content: "",
        },
      ],
    },
  };
};

export const deleteNotebook = (index) => {
  return {
    type: "notebookList/deleteNotebook",
    payload: index,
  };
};

export const setNotebooktitle = (id, title) => {
  return {
    type: "notebookList/setNotebooktitle",
    payload: {
      id: id,
      title: title,
    },
  };
};

export const addSubNotebook = (
  Id,
  newSubNotebookName,
  subId,
  subCreateTime
) => {
  return {
    type: "notebookList/addSubNotebook",
    payload: {
      id: Id,
      title: newSubNotebookName,
      subNotebook: [
        {
          subId: subId,
          subtitle: "Default SubNotebook",
          subStart: subCreateTime,
          subEnd: subCreateTime,
          content: "",
        },
      ],
    },
  };
};

export const deleteSubNotebook = (notebookId, subId) => {
  return {
    type: "notebookList/deleteSubNotebook",
    payload: {
      notebookId: notebookId,
      subId: subId,
    },
  };
};

export const displayNumber = (notebookId, subId) => {
  return {
    type: "notebookDisplaying/displayNumber",
    payload: {
      notebookId: notebookId,
      subNotebookId: subId,
    },
  };
};

export const setNobebookContent = (setnotebookId, setsubId, content) => {
  return {
    type: "notebookList/setNobebookContent",
    payload: {
      notebookId: setnotebookId,
      subNotebookId: setsubId,
      content: content,
    },
  };
};

export const setSubNobebookTitle = (notebookId, subId, subtitle) => {
  return {
    type: "notebookList/setSubNobebookTitle",
    payload: {
      notebookId: notebookId,
      subNotebookId: subId,
      subtitle: subtitle,
    },
  };
};

export const setNobebookStartAndEndTime = (
  notebookId,
  subId,
  subNotebookTimeType,
  time
) => {
  return {
    type: "notebookList/setNobebookStartAndEndTime",
    payload: {
      notebookId: notebookId,
      subNotebookId: subId,
      type: subNotebookTimeType,
      time: time,
    },
  };
};

export const toggleNoteTimelineAction = (boolean) => {
  return {
    type: "toggleNoteTimeline/toggleNoteTimelineAction",
    payload: boolean,
  };
};

export const addtotalnotebooks = (array) => {
  return {
    type: "totaltasks/addtotalnotebooks",
    payload: array,
  };
};

export const addTotalNotebooksDurations = (array) => {
  return {
    type: "totaltaskDurations/addTotalNotebooksDurations",
    payload: array,
  };
};

export const setNotebookEndTime = (notebookId, endtime) => {
  return {
    type: "notebookList/setNotebookEndTime",
    payload: {
      notebookId: notebookId,
      endtime: endtime,
    },
  };
};

export const toggleloginstatus = (boolean) => {
  return {
    type: "loginstatus/toggleloginstatus",
    payload: boolean,
  };
};
