### Re-Re is a tool for Recording and Reviewing your learning

## Overview

Re-Re is a note-taking application that can be used to record and review the learning process. In addition to supporting note editing in Markdown format, the notes also have a visual Gantt chart timeline function, which can provide a better understanding of one's learning process.

![1.png](https://res.craft.do/user/full/6e51b78d-bb10-9598-78bc-b1dd033f3f34/doc/C875A9ED-14DF-49BB-B9A7-4E92E6D8A3B4/87785976-978C-4440-BB53-CE666E4C062A_2/Zj4W5U8o3XwTPha80eUIghtxsYEonE09Q2x6zwSCA7kz/1.png)

![2.png](https://res.craft.do/user/full/6e51b78d-bb10-9598-78bc-b1dd033f3f34/doc/C875A9ED-14DF-49BB-B9A7-4E92E6D8A3B4/43D31A72-2A5C-433A-A0B3-1AB0A2AF0CDB_2/gXERxQK20UJi8uyNcfxlFbLffAxC3eGR5IPX44ZRksQz/2.png)

## Live [Demo](https://re-re-l34k.vercel.app)

## Build with

#### Front-End

- React / React Router
- Redux
- Tailwind CSS
- Firebase

#### Library

- [react-markdown](https://github.com/remarkjs/react-markdown#react-markdown) - React component to render markdown.
- [gantt-chart-nextjs-starter](https://github.com/ritza-co/gantt-chart-nextjs-starter) - A Gantt chart with React using Next.js

## Key feature

#### Basic

- The main functions can be switched between note editing and Gantt chart functions through the button in the upper left corner of the screen.

![AnimatedImage.gif](https://res.craft.do/user/full/6e51b78d-bb10-9598-78bc-b1dd033f3f34/doc/C875A9ED-14DF-49BB-B9A7-4E92E6D8A3B4/5BA2E0B9-A8C2-45AB-AC3F-FFA5A676C646_2/yALXUyZWN4nwKAtcU5JfMuGenkMLgtrRD1MEQaKxdccz/AnimatedImage.gif)

- In the left column, you can add a notebook by clicking the plus button on the right side of "Adding Notebook", and you can also add sub-notebooks by clicking the button on the right side of each notebook.

![AnimatedImage.gif](https://res.craft.do/user/full/6e51b78d-bb10-9598-78bc-b1dd033f3f34/doc/C875A9ED-14DF-49BB-B9A7-4E92E6D8A3B4/DA84246B-7138-4D48-86CF-8333BCDA3A82_2/vyQ2CvQVXtFeExqsxrHt4ggezVj69xSK7mCAJ0YCawgz/AnimatedImage.gif)

- #### Note editing interface
  - Click on a sub-notebook in the left column, and the content of that note will be displayed in the right column.
  - Set your own completion time through the time options below the title.
  - Switch to editing mode through the edit button, and in this mode, you can use markdown format to achieve richer content hierarchy.

![AnimatedImage.gif](https://res.craft.do/user/full/6e51b78d-bb10-9598-78bc-b1dd033f3f34/doc/C875A9ED-14DF-49BB-B9A7-4E92E6D8A3B4/269999D4-2D9F-4F5B-99A3-65EB8E7E48E1_2/ouNdetEH9y39B5wjXa1sSLWNuj8lyPSmQpVtLCf7xvYz/AnimatedImage.gif)

#### Gantt Chart Interface

- By clicking on the sub-notebooks in the left column, the Adjust Task Duration section at the top of the screen will display the time for that note, and you can also set the time through the options here.
- The Tracker Period section in the upper right of the screen can adjust the time range for viewing.
- The Gantt Chart section below will display the time spent on each notebook, which can be used to track one's learning process.

![AnimatedImage.gif](https://res.craft.do/user/full/6e51b78d-bb10-9598-78bc-b1dd033f3f34/doc/C875A9ED-14DF-49BB-B9A7-4E92E6D8A3B4/13513691-3E94-4E9A-8FCE-2611564C26F7_2/iYRxFwtmzjDbveTJjr7Fi9sZoitsyU2c2fP9WFaXzHIz/AnimatedImage.gif)

### Other feature

- You can quickly log in through email or Google account.

### Future feature

- Rich text editor
- Add spaced repetition function for specific notes.
- In addition to intervals, the timeline of the Gantt chart can also have markers.

## File structure

```javascript
-- public
-- src
  |__ assets
  |__ components
    |__ button
  |__ features
    |__ ganttchart
      |__ grid
        |__ feartures
      |__ guild
      |__ settings
        |__ feartures
    |__ notebookEditing
      |__ notebookEditing
    |__ notebookGuildeline
      |__ guild
      |__ notbooklist
    |__ helpers
    |__ redux
    |__ routes
      |__ application
      |__ home
        |__ footer
      |__ login
      |__ navigation
      |__ signup
  |__ utils
```

## License

Copyright Notice and Statement: currently not offering any license. Permission only to view and download.
