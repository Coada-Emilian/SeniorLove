
  # ESLint Setup

  To configure ESLint in the project, you'll need to add specific settings to your editor's settings.json file. 

  Open the command palette <kbd>Ctrl</kbd> + <kbd>P</kbd>

  Search and open the json config file  ``Open User Settings (JSON)``

  Paste this into the file :


  ```json
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  ```