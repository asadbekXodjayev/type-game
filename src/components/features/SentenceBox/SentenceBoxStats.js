import React from "react";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import { SENTENCE_CHAR_TOOLTIP_TITLE } from "../../../constants/Constants";

const SentenceBoxStats = ({ status, wpm, countDown, stats, rawKeyStrokes }) => {
  // Guard against 0/0 = NaN when a test finishes with no recorded characters.
  const totalChars = stats.correct + stats.incorrect + stats.extra;
  const accuracy =
    totalChars > 0 ? Math.round((stats.correct / totalChars) * 100) : 0;
  // Guard against divide-by-zero when elapsed time is 0.
  const rawKpm =
    countDown > 0 ? Math.round((rawKeyStrokes / countDown) * 60.0) : 0;
  return (
    <>
      <h3>{countDown} s </h3>
      <Box display="flex" flexDirection="row">
        <h3>WPM: {Math.round(wpm)}</h3>
        {status === "finished" && <h4>Accuracy: {accuracy} %</h4>}
        {status === "finished" && (
          <Tooltip
            title={
              <span style={{ whiteSpace: "pre-line" }}>
                {SENTENCE_CHAR_TOOLTIP_TITLE}
              </span>
            }
          >
            <h4>
              Char: <span className="correct-char-stats">{stats.correct}</span>/
              <span className="incorrect-char-stats">{stats.incorrect}</span>/
              <span className="incorrect-char-stats">{stats.extra}</span>
            </h4>
          </Tooltip>
        )}
        {status === "finished" && <h4>Raw KPM: {rawKpm}</h4>}
      </Box>
    </>
  );
};

export default SentenceBoxStats;
