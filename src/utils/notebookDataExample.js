const notebookDataExample = [
  {
    id: 1,
    title: "Data Structure",
    start: "2023-09-21",
    end: "2023-10-25",
    subNotebook: [
      {
        subId: 1,
        subtitle: "Ch5 Tree",
        subStart: "2023-09-10",
        subEnd: "2023-10-29",
        content: `A tree is a non-linear abstract data type with a hierarchy-based structure. It consists of nodes (where the data is stored) that are connected via links. The tree data structure stems from a single node called a root node and has subtrees connected to the root.`,
      },
      {
        subId: 2,
        subtitle: "Ch6 Graph",
        subStart: "2023-09-01",
        subEnd: "2023-09-22",
        content:
          "A graph is an abstract data type (ADT) that consists of a set of objects that are connected to each other via links. These objects are called vertices and the links are called edges.",
      },
    ],
  },
  {
    id: 2,
    title: "Algorithms",
    start: "2023-07-05",
    end: "2023-09-20",
    subNotebook: [
      {
        subId: 1,
        subtitle: "Dynamic Programming",
        subStart: "2023-07-21",
        subEnd: "2023-09-30",
        content: `Dynamic programming approach is similar to divide and conquer in breaking down the problem into smaller and yet smaller possible sub-problems. But unlike, divide and conquer, these sub-problems are not solved independently. Rather, results of these smaller sub-problems are remembered and used for similar or overlapping sub-problems.`,
      },
    ],
  },
];

export default notebookDataExample;
