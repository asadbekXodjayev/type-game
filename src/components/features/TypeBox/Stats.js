import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { CHAR_TOOLTIP_TITLE } from "../../../constants/Constants";
import { overlayReveal } from "../../../style/motion";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipChart,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import { red } from "@mui/material/colors";

const Stats = ({
  status,
  wpm,
  countDown,
  countDownConstant,
  statsCharCount,
  language,
  rawKeyStrokes,
  wpmKeyStrokes,
  theme,
  renderResetButton,
  setIncorrectCharsCount,
  incorrectCharsCount,
}) => {
  const roundedWpm = Math.round(wpm);

  // Raw WPM is trivial arithmetic; compute it inline rather than spawning a
  // Web Worker on every keystroke/tick (which created and discarded a worker
  // each time — wasteful and a source of leaks).
  const rawWpmElapsedSeconds = Math.max(countDownConstant - countDown, 1);
  const roundedRawWpm = Math.round(
    (rawKeyStrokes / 5 / rawWpmElapsedSeconds) * 60.0
  );

  const initialTypingTestHistory = [
    {
      wpm: 0,
      rawWpm: 0,
      time: 0,
      error: 0,
    },
  ];

  const [typingTestHistory, setTypingTestHistory] = useState(
    initialTypingTestHistory
  );

  const accuracy = Math.round(statsCharCount[0]);

  const data = typingTestHistory.map((history) => ({
    wpm: history.wpm,
    rawWpm: history.rawWpm,
    time: history.time,
    error: history.error,
  }));

  useEffect(() => {
    if (status === "started") {
      setTypingTestHistory(initialTypingTestHistory);
    }
  }, [status]);

  useEffect(() => {
    if (status === "started" && countDown < countDownConstant) {
      // Decide the chart sampling cadence based on the test length, then push a
      // history point. Inlined (was a per-tick Web Worker doing this tiny switch).
      let shouldRecord;
      let increment;
      switch (countDownConstant) {
        case 90:
        case 60:
        case 30:
          shouldRecord = countDown % 5 === 0;
          increment = 5;
          break;
        default:
          shouldRecord = true;
          increment = 1;
      }

      if (shouldRecord) {
        setTypingTestHistory((prevTypingTestHistory) => [
          ...prevTypingTestHistory,
          {
            wpm: roundedWpm,
            rawWpm: roundedRawWpm,
            time: prevTypingTestHistory.length * increment,
            error: incorrectCharsCount,
          },
        ]);
        setIncorrectCharsCount(0);
      }
    }
  }, [countDown]);

  const getFormattedLanguageLanguageName = (value) => {
    switch (value) {
      case "ENGLISH_MODE":
        return "eng";
      case "CHINESE_MODE":
        return "chn";
      default:
        return "eng";
    }
  };

  const renderCharStats = () => (
    <Tooltip
      title={
        <span style={{ whiteSpace: "pre-line" }}>{CHAR_TOOLTIP_TITLE}</span>
      }
    >
      <div>
        <p className="stats-title">Characters</p>
        <h2 className="stats-value">
          <span className="correct-char-stats">{statsCharCount[1]}</span>/
          <span className="incorrect-char-stats">{statsCharCount[2]}</span>/
          <span className="missing-char-stats">{statsCharCount[3]}</span>/
          <span className="correct-char-stats">{statsCharCount[4]}</span>/
          <span className="incorrect-char-stats">{statsCharCount[5]}</span>
        </h2>
      </div>
    </Tooltip>
  );

  const renderIndicator = (color) => (
    <span
      style={{ backgroundColor: color, height: "12px", width: "24px" }}
    ></span>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const payloadData = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            paddingInline: "8px",
            paddingBlock: "2px",
          }}
        >
          <p className="label" style={{ fontSize: "12px", fontWeight: "bold" }}>
            {`Time: ${label} s`}
          </p>
          <p className="desc tooltip">
            {renderIndicator(red[400])}
            {`Errors: ${payloadData.error}`}
          </p>
          <p className="desc tooltip">
            {renderIndicator(theme.textTypeBox)}
            {`Raw WPM: ${payloadData.rawWpm}`}
          </p>
          <p className="desc tooltip">
            {renderIndicator(theme.text)}
            {`WPM: ${payloadData.wpm}`}
          </p>
        </div>
      );
    }

    return null;
  };

  const renderAccuracy = () => (
    <div style={{ marginTop: "16px" }}>
      <h2 className="primary-stats-title">ACC</h2>
      <h1 className="primary-stats-value">{accuracy}%</h1>
    </div>
  );

  const renderRawKpm = () => (
    <div>
      <p className="stats-title">KPM</p>
      <h2 className="stats-value">
        {Math.round((rawKeyStrokes / Math.max(countDownConstant, 1)) * 60.0)}
      </h2>
    </div>
  );

  const renderLanguage = () => (
    <div>
      <p className="stats-title">Test Mode</p>
      <h2 className="stats-value">
        {getFormattedLanguageLanguageName(language)}
      </h2>
    </div>
  );

  const renderTime = () => (
    <div>
      <p className="stats-title">Time</p>
      <h2 className="stats-value">{countDownConstant} s</h2>
    </div>
  );

  const renderWpm = () => {
    // Final WPM is the test average over the full duration:
    // (effective characters / 5) per minute. Previously this averaged every
    // per-second cumulative sample, which skewed the result (early samples are
    // noisy and over-weighted). The straight computation below is the correct,
    // unambiguous "words per minute" for the whole test.
    const finalWpm =
      countDownConstant > 0
        ? Math.round((wpmKeyStrokes / 5 / countDownConstant) * 60.0)
        : 0;
    return (
      <div>
        <h2 className="primary-stats-title">WPM</h2>
        <h1 className="primary-stats-value">{finalWpm}</h1>
      </div>
    );
  };

  const Chart = () => (
    <ResponsiveContainer
      width="100%"
      minHeight={200}
      maxHeight={200}
      height="100%"
    >
      <ComposedChart
        width="100%"
        height="100%"
        data={data.filter((d) => d.time !== 0)}
        margin={{
          top: 12,
          right: 12,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          vertical={false}
          horizontal={false}
          stroke={theme.text}
          opacity={0.15}
        />
        <XAxis
          dataKey="time"
          stroke={theme.text}
          tickMargin={10}
          opacity={0.25}
        />
        <YAxis stroke={theme.text} tickMargin={10} opacity={0.25} />
        <TooltipChart cursor content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="rawWpm"
          stroke={theme.textTypeBox}
          dot={false}
          activeDot={false}
        />
        <Line
          type="monotone"
          dataKey="wpm"
          stroke={theme.text}
          dot={false}
          activeDot={false}
        />
        <Bar dataKey="error" barSize={12} fill={`${red[400]}`} />
      </ComposedChart>
    </ResponsiveContainer>
  );

  return (
    <>
      {status !== "finished" && (
        <>
          <h3>{countDown} s</h3>
          <h3>WPM: {Math.round(wpm)}</h3>
        </>
      )}

      <AnimatePresence>
        {status === "finished" && (
          <motion.div
            className="stats-overlay"
            key="stats-overlay"
            variants={overlayReveal}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <section className="stats-chart">
              <section className="stats-header">
                <div>
                  {renderWpm()}
                  {renderAccuracy()}
                </div>
                {Chart()}
              </section>
              <section className="stats-footer">
                {renderLanguage()}
                {renderRawKpm()}
                {renderCharStats()}
                {renderTime()}
              </section>
              <section>{renderResetButton()}</section>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Stats;
