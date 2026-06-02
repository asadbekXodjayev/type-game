import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "styled-components";
import { defaultTheme, themesOptions } from "./style/theme";
import { GlobalStyles } from "./style/global";
import TypeBox from "./components/features/TypeBox/TypeBox";
import Logo from "./components/common/Logo";
import FooterMenu from "./components/common/FooterMenu";
import {
  GAME_MODE,
  GAME_MODE_DEFAULT,
  GAME_MODE_SENTENCE,
} from "./constants/Constants";
import useLocalPersistState from "./hooks/useLocalPersistState";
import {
  SOUND_MODE,
  soundOptions,
  DEFAULT_SOUND_TYPE,
  DEFAULT_SOUND_TYPE_KEY,
} from "./components/features/sound/sound";
import DynamicBackground from "./components/common/DynamicBackground";

// Code-split the secondary modes so they aren't in the initial bundle. Only
// TypeBox (the default word mode) loads eagerly.
const SentenceBox = lazy(() =>
  import("./components/features/SentenceBox/SentenceBox")
);
const FreeTypingBox = lazy(() => import("./components/features/FreeTypingBox"));
const DefaultKeyboard = lazy(() =>
  import("./components/features/Keyboard/DefaultKeyboard")
);
const WordsCard = lazy(() =>
  import("./components/features/WordsCard/WordsCard")
);
const MusicPlayerSnackbar = lazy(() =>
  import("./components/features/MusicPlayer/MusicPlayerSnackbar")
);

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stickyTheme = window.localStorage.getItem("theme");
      if (stickyTheme !== null) {
        const localTheme = JSON.parse(stickyTheme);
        // Always prefer the upstream theme definition (it may have been updated
        // since it was persisted). Guard against a stored label that no longer
        // exists, which previously threw and white-screened the app on load.
        const match = themesOptions.find((e) => e.label === localTheme.label);
        return match ? match.value : defaultTheme;
      }
    } catch (e) {
      // Corrupt localStorage value — fall back to the default theme.
    }
    return defaultTheme;
  });

  // local persist game mode setting
  const [soundMode, setSoundMode] = useLocalPersistState(false, SOUND_MODE);

  const [soundType, setSoundType] = useLocalPersistState(
    DEFAULT_SOUND_TYPE,
    DEFAULT_SOUND_TYPE_KEY
  );

  // local persist game mode setting
  const [gameMode, setGameMode] = useLocalPersistState(
    GAME_MODE_DEFAULT,
    GAME_MODE
  );

  const handleGameModeChange = (currGameMode) => {
    setGameMode(currGameMode);
  };

  // localStorage persist focusedMode setting
  const [isFocusedMode, setIsFocusedMode] = useState(
    localStorage.getItem("focused-mode") === "true"
  );

  // musicMode setting
  const [isMusicMode, setIsMusicMode] = useState(false);

  // ultraZenMode setting
  const [isUltraZenMode, setIsUltraZenMode] = useState(
    localStorage.getItem("ultra-zen-mode") === "true"
  );

  // coffeeMode setting
  const [isCoffeeMode, setIsCoffeeMode] = useState(false);

  // trainer mode setting
  const [isTrainerMode, setIsTrainerMode] = useState(false);

  // words card mode
  const [isWordsCardMode, setIsWordsCardMode] = useLocalPersistState(
    false,
    "IsInWordsCardMode"
  );

  const isWordGameMode =
    gameMode === GAME_MODE_DEFAULT &&
    !isCoffeeMode &&
    !isTrainerMode &&
    !isWordsCardMode;
  const isSentenceGameMode =
    gameMode === GAME_MODE_SENTENCE &&
    !isCoffeeMode &&
    !isTrainerMode &&
    !isWordsCardMode;

  const handleThemeChange = (e) => {
    window.localStorage.setItem("theme", JSON.stringify(e.value));
    setTheme(e.value);
  };

  const handleSoundTypeChange = (e) => {
    setSoundType(e.label);
  };

  const toggleFocusedMode = () => {
    setIsFocusedMode(!isFocusedMode);
  };

  const toggleSoundMode = () => {
    setSoundMode(!soundMode);
  };

  const toggleMusicMode = () => {
    setIsMusicMode(!isMusicMode);
  };

  const toggleUltraZenMode = () => {
    setIsUltraZenMode(!isUltraZenMode);
  };

  const toggleCoffeeMode = () => {
    setIsCoffeeMode(!isCoffeeMode);
    setIsTrainerMode(false);
    setIsWordsCardMode(false);
  };

  const toggleTrainerMode = () => {
    setIsTrainerMode(!isTrainerMode);
    setIsCoffeeMode(false);
    setIsWordsCardMode(false);
  };

  const toggleWordsCardMode = () => {
    setIsTrainerMode(false);
    setIsCoffeeMode(false);
    setIsWordsCardMode(!isWordsCardMode);
  };

  useEffect(() => {
    localStorage.setItem("focused-mode", isFocusedMode);
  }, [isFocusedMode]);

  useEffect(() => {
    localStorage.setItem("ultra-zen-mode", isUltraZenMode);
  }, [isUltraZenMode]);

  const textInputRef = useRef(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
  };

  const textAreaRef = useRef(null);
  const focusTextArea = () => {
    textAreaRef.current && textAreaRef.current.focus();
  };

  const sentenceInputRef = useRef(null);
  const focusSentenceInput = () => {
    sentenceInputRef.current && sentenceInputRef.current.focus();
  };

  useEffect(() => {
    if (isWordGameMode) {
      focusTextInput();
      return;
    }
    if (isSentenceGameMode) {
      focusSentenceInput();
      return;
    }
    if (isCoffeeMode) {
      focusTextArea();
      return;
    }
    return;
  }, [
    theme,
    isFocusedMode,
    isMusicMode,
    isCoffeeMode,
    isWordGameMode,
    isSentenceGameMode,
    soundMode,
    soundType,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <MotionConfig reducedMotion="user">
        <DynamicBackground theme={theme}></DynamicBackground>
        <div className="canvas">
          <GlobalStyles />
          <Logo isFocusedMode={isFocusedMode} isMusicMode={isMusicMode}></Logo>
          <Suspense fallback={<div className="suspense-fallback" />}>
            {isWordGameMode && (
              <TypeBox
                isUltraZenMode={isUltraZenMode}
                textInputRef={textInputRef}
                isFocusedMode={isFocusedMode}
                soundMode={soundMode}
                theme={theme}
                soundType={soundType}
                key="type-box"
                handleInputFocus={() => focusTextInput()}
              ></TypeBox>
            )}
            {isSentenceGameMode && (
              <SentenceBox
                sentenceInputRef={sentenceInputRef}
                isFocusedMode={isFocusedMode}
                soundMode={soundMode}
                soundType={soundType}
                key="sentence-box"
                handleInputFocus={() => focusSentenceInput()}
              ></SentenceBox>
            )}
            {isCoffeeMode && !isTrainerMode && !isWordsCardMode && (
              <FreeTypingBox
                textAreaRef={textAreaRef}
                soundMode={soundMode}
                soundType={soundType}
              />
            )}
            {isTrainerMode && !isCoffeeMode && !isWordsCardMode && (
              <DefaultKeyboard
                soundMode={soundMode}
                soundType={soundType}
              ></DefaultKeyboard>
            )}
            {isWordsCardMode && !isCoffeeMode && !isTrainerMode && (
              <WordsCard soundMode={soundMode} soundType={soundType}></WordsCard>
            )}
          </Suspense>
          <div className="bottomBar">
            <FooterMenu
              isWordGameMode={isWordGameMode}
              themesOptions={themesOptions}
              theme={theme}
              soundMode={soundMode}
              toggleSoundMode={toggleSoundMode}
              soundOptions={soundOptions}
              soundType={soundType}
              toggleUltraZenMode={toggleUltraZenMode}
              handleSoundTypeChange={handleSoundTypeChange}
              handleThemeChange={handleThemeChange}
              toggleFocusedMode={toggleFocusedMode}
              toggleMusicMode={toggleMusicMode}
              toggleCoffeeMode={toggleCoffeeMode}
              isCoffeeMode={isCoffeeMode}
              isMusicMode={isMusicMode}
              isUltraZenMode={isUltraZenMode}
              isFocusedMode={isFocusedMode}
              gameMode={gameMode}
              handleGameModeChange={handleGameModeChange}
              isTrainerMode={isTrainerMode}
              toggleTrainerMode={toggleTrainerMode}
              isWordsCardMode={isWordsCardMode}
              toggleWordsCardMode={toggleWordsCardMode}
            ></FooterMenu>
          </div>
          <Suspense fallback={null}>
            <MusicPlayerSnackbar
              isMusicMode={isMusicMode}
              isFocusedMode={isFocusedMode}
              onMouseLeave={() => focusTextInput()}
            ></MusicPlayerSnackbar>
          </Suspense>
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
