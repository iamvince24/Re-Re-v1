const notebookState = {
  notebookList: [
    // {
    //   id: 1,
    //   title: "Data Structure",
    //   start: "2023-09-21",
    //   end: "2023-10-25",
    //   subNotebook: [
    //     {
    //       subId: 1,
    //       subtitle: "Ch5 Tree",
    //       subStart: "2023-09-10",
    //       subEnd: "2023-10-29",
    //       content: `A tree is a non-linear abstract data type with a hierarchy-based structure. It consists of nodes (where the data is stored) that are connected via links. The tree data structure stems from a single node called a root node and has subtrees connected to the root.`,
    //     },
    //     {
    //       subId: 2,
    //       subtitle: "Ch6 Graph",
    //       subStart: "2023-09-01",
    //       subEnd: "2023-09-22",
    //       content:
    //         "A graph is an abstract data type (ADT) that consists of a set of objects that are connected to each other via links. These objects are called vertices and the links are called edges.",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   title: "Algorithms",
    //   start: "2023-07-05",
    //   end: "2023-09-20",
    //   subNotebook: [
    //     {
    //       subId: 1,
    //       subtitle: "Dynamic Programming",
    //       subStart: "2023-07-21",
    //       subEnd: "2023-09-30",
    //       content: `Dynamic programming approach is similar to divide and conquer in breaking down the problem into smaller and yet smaller possible sub-problems. But unlike, divide and conquer, these sub-problems are not solved independently. Rather, results of these smaller sub-problems are remembered and used for similar or overlapping sub-problems.`,
    //     },
    //   ],
    // },
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
  ],

  loginstatus: false,
};

const notebookReducer = (state = notebookState, action) => {
  switch (action.type) {
    case "notebookList/fetchNotebookList":
      return {
        ...state,
        notebookList: action.payload,
      };

    case "notebookList/updateNotebookList":
      const updatedNotebook = action.payload;
      const ff = state.notebookList.map((notebook) =>
        notebook.id === updatedNotebook.id ? updatedNotebook : notebook
      );
      return {
        ...state,
        notebookList: ff,
      };

    case "notebookList/addNotebook":
      return {
        ...state,
        notebookList: [...state.notebookList, action.payload],
      };

    case "notebookList/deleteNotebook":
      const updatedNotebookList = [...state.notebookList];
      updatedNotebookList.splice(action.payload, 1);
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
      const newdeleteSubNotebook = state.notebookList.map((notebook) => {
        if (notebook.id === notebookId) {
          const updatedSubNotebook = notebook.subNotebook.filter(
            (subNote) => subNote.subId !== subId
          );
          return {
            ...notebook,
            subNotebook: updatedSubNotebook,
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: newdeleteSubNotebook,
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
      const newsetSubNobebookTitle = state.notebookList.map((notebook) => {
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
        notebookList: newsetSubNobebookTitle,
      };

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
      return {
        ...state,
        totaltasks: action.payload,
      };

    case "totaltaskDurations/addTotalNotebooksDurations":
      return {
        ...state,
        totaltaskDurations: action.payload,
      };

    case "notebookList/setNotebookEndTime":
      const newsetNotebookEndTime = state.notebookList.map((notebook) => {
        if (notebook.id === action.payload.notebookId) {
          return {
            ...notebook,
            end: action.payload.endtime,
          };
        }
        return notebook;
      });
      return {
        ...state,
        notebookList: newsetNotebookEndTime,
      };

    case "loginstatus/toggleloginstatus":
      return {
        ...state,
        loginstatus: action.payload,
      };

    default:
      return state;
  }
};

export default notebookReducer;
