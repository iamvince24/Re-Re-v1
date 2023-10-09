const notebookState = {
  notebookList: [
    {
      id: 1,
      title: "Data Structure",
      start: "2023-09-21",
      end: "2023-10-25",
      subNotebook: [
        {
          subId: 1,
          subtitle: "Ch5",
          subStart: "2023-09-10",
          subEnd: "2023-10-29",
          content: `# Tree Algorithm`,
        },
        {
          subId: 2,
          subtitle: "Ch6",
          subStart: "2023-09-01",
          subEnd: "2023-09-22",
          content: "Ch1",
        },
      ],
    },
    {
      id: 2,
      title: "Math",
      start: "2023-07-05",
      end: "2023-09-20",
      subNotebook: [
        {
          subId: 1,
          subtitle: "Ch2-1",
          subStart: "2023-07-21",
          subEnd: "2023-09-30",
          content: "",
        },
      ],
    },
  ],

  notebookDisplaying: { notebookId: 1, subNotebookId: 1 },

  toggleNoteTimeline: true,

  totaltasks: [
    // {
    //   id: 1,
    //   name: "Task 1",
    // },
    // {
    //   id: 2,
    //   name: "Task 2",
    // },
  ],

  totaltaskDurations: [
    // {
    //   id: 1,
    //   start: "2023-07-02",
    //   end: "2023-07-8",
    //   task: 1,
    // },
    // {
    //   id: 2,
    //   start: "2023-07-10",
    //   end: "2023-07-15",
    //   task: 2,
    // },
    // {
    //   id: 3,
    //   start: "2023-08-11",
    //   end: "2023-08-18",
    //   task: 4,
    // },
  ],

  loginstatus: false,
};

const notebookReducer = (state = notebookState, action) => {
  switch (action.type) {
    case "notebookList/addNotebook":
      return {
        ...state,
        notebookList: [...state.notebookList, action.payload],
      };

    case "notebookList/deleteNotebook":
      const updatedNotebookList = [...state.notebookList];
      updatedNotebookList.splice(action.payload, 1);
      // console.log(updatedNotebookList);
      return {
        ...state,
        notebookList: updatedNotebookList,
      };

    case "notebookList/addSubNotebook":
      const notebookList = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.id) {
          return {
            ...notebook,
            subNotebook: [
              ...notebook.subNotebook,
              {
                subId: action.payload.subNotebook[0].subId,
                subtitle: action.payload.subNotebook[0].subtitle,
                subStart: action.payload.subNotebook[0].subStart,
                subEnd: action.payload.subNotebook[0].subEnd,
                content: "",
              },
            ],
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: notebookList,
      };

    case "notebookList/deleteSubNotebook":
      const { notebookId, subId } = action.payload;
      const LL = state.notebookList.map((notebook) => {
        if (notebook.id === notebookId) {
          // console.log(notebook.id, subId);
          const updatedSubNotebook = notebook.subNotebook.filter(
            (subNote) => subNote.subId !== subId
          );
          // console.log(notebook);
          return {
            ...notebook,
            subNotebook: updatedSubNotebook,
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: LL,
      };

    case "notebookDisplaying/displayNumber":
      return {
        ...state,
        notebookDisplaying: action.payload,
      };

    case "notebookList/setNobebookContent":
      const setNobebookContentList = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.notebookId) {
          return {
            ...notebook,
            subNotebook: notebook.subNotebook.map((subNote) => {
              if (subNote.subId === action.payload.subNotebookId) {
                return {
                  ...subNote,
                  content: action.payload.content,
                };
              }
              return subNote;
            }),
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: setNobebookContentList,
      };

    case "notebookList/setNotebooktitle":
      const updatedNotebooktitle = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.id) {
          return {
            ...notebook,
            title: action.payload.title,
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: updatedNotebooktitle,
      };

    case "notebookList/setSubNobebookTitle":
      const LLLLLL = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.notebookId) {
          return {
            ...notebook,
            subNotebook: notebook.subNotebook.map((subNote) => {
              if (subNote.subId === action.payload.subNotebookId) {
                return {
                  ...subNote,
                  subtitle: action.payload.subtitle,
                };
              }
              return subNote;
            }),
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: LLLLLL,
      };

    // case "notebookList/setSubNobebookDoneTime":
    //   const subnotebookdonetimelist = state.notebookList.map((notebook) => {
    //     if (notebook.id === action.payload.notebookId) {
    //       return {
    //         ...notebook,
    //         subNotebook: notebook.subNotebook.map((subNote) => {
    //           if (subNote.subId === action.payload.subNotebookId) {
    //             return {
    //               ...subNote,
    //               subDoneTime: action.payload.subDoneTime,
    //             };
    //           }
    //           return subNote;
    //         }),
    //       };
    //     }
    //     return notebook;
    //   });
    //   return {
    //     ...state,
    //     notebookList: subnotebookdonetimelist,
    //   };

    case "notebookList/setNobebookStartAndEndTime":
      const subnotebookdonetimelist = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.notebookId) {
          return {
            ...notebook,
            subNotebook: notebook.subNotebook.map((subNote) => {
              if (subNote.subId === action.payload.subNotebookId) {
                if (action.payload.type === "start-date") {
                  return {
                    ...subNote,
                    subStart: action.payload.time,
                  };
                } else {
                  return {
                    ...subNote,
                    subEnd: action.payload.time,
                  };
                }
              }
              return subNote;
            }),
          };
        }
        return notebook;
      });
      // console.log(subnotebookdonetimelist);
      return {
        ...state,
        notebookList: subnotebookdonetimelist,
      };

    case "toggleNoteTimeline/toggleNoteTimelineAction":
      return {
        ...state,
        toggleNoteTimeline: action.payload,
      };

    case "totaltasks/addtotalnotebooks":
      // console.log(action.payload);
      return {
        ...state,
        totaltasks: action.payload,
      };

    case "totaltaskDurations/addTotalNotebooksDurations":
      // console.log(action.payload);
      return {
        ...state,
        totaltaskDurations: action.payload,
      };

    case "notebookList/setNotebookEndTime":
      // console.log(action.payload);
      const RE = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.notebookId) {
          return {
            ...notebook,
            end: action.payload.endtime,
          };
        }
        // console.log(notebook);
        return notebook;
      });
      // console.log(RE);
      return {
        ...state,
        notebookList: RE,
      };

    case "loginstatus/toggleloginstatus":
      console.log(action.payload);
      return {
        ...state,
        loginstatus: action.payload,
      };

    default:
      return state;
  }
};

export default notebookReducer;
