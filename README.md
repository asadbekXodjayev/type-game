# Typing Test

An elegant typing test tool built in React.

## Feature Requests / Issues / Bug Reports

Please open an issue in the repository.

## Current Features

#### 1. Typing Test (words, sentence)

  - words mode
    - Eng Hard: Random blogs Words data source
    - Eng Normal: Top 1000 most frequent used English words
    - CHN Pinyin Hard: Chinese top 1500 idioms
    - CHN Pinyin Normal: Chinese top 5000 words/char
    - support four tests duration 90s, 60s, 30s, 15s
    - + Numbers: add random numbers from 0-99 at the end of the regenerated word
    - + Symbols: add random symbols at the end of the regenerated words
  - Sentence mode
    - CHN: Random chinese short sentences
    - ENG: Random English short sentences
    - Support three sentences count setting: 5, 10, 15
  - Stats:
    - WPM
    - KPM
    - Accuracy
    - Error analysis (correct/error/missing/extra chars count)
    - Visualizations
  - Pacing Style (word pulse/ character caret):
    - Pulse mode: the active word will have an underline pulse, which helps improve the speed typing habit.
    - Caret mode: a pacing caret, advancing character by character, which aligns normal typing habit.

#### 2. Words Card (for English learners)

  - Vocabulary Source
    - GRE vocab
    - TOEFL
    - CET6
    - CET4
  - Multi Chapters Selection
  - Words Card Navigation UI
  - Recite Mode (word visibility off while phrase shown)

#### 3. Coffee Mode

 - free typing mode for test typing anything

#### 4. QWERTY Keyboard touch-typing trainer

 - A QWERTY keyboard layout UI populating random key for touch typing with stats

#### 5. Themes Collection

- Static Themes

  - Dark
  - Tokyo night
  - Piano
  - Aluminum
  - Terminal (matrix inspired)
  - Cyber (cyberpunk inspired)
  - Steam (steampunk inspired)
  - Light
  - Nintendo
  - Araki Nobuyoshi
  - Hero
  - Budapest
  - Cool Kid
  - EdgeRunner (cyberpunk 2077 edgerunners episodes inspired)

- Dynamic Themes (WebGL based, may degrade performance. experimental feature. Component Library used from [UV canvas](https://uvcanvas.com/))

  - Tranquiluxe,
  - Lumiflex,
  - Opulento,
  - Velustro

#### 6. LocalStorage persist for essential settings

  - Browser refresh will bring back to the localStorage stored settings

#### 7. Focus Mode

  - move header to footer.
  - hide the setting menu. leave only timer, wpm stats.

#### 8. Ultra Zen Mode

toggle to use the ultra zen mode when in words mode. The ultra zen mode can auto highlight and auto dim while you are typing.

#### 9. Typing Sound Effect

  - default: cherry blue switch
  - optional: keyboard (hard)
  - optional: typewriter (soft)

#### 10. [Tab] key to Fast redo/reset

  - [Tab] + [Space] for quickly redo
  - [Tab] + [Enter] / [Tab] + [Tab] for quickly reset
  - [Tab] + [Any Key] to exit the dialog

## For Devs

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### Pull Requests

Create a branch with a proper name, e.g. 'feat/your-cool-feature', create the pull request and add reviewers. Please include a description with details.
"# type-game" 
