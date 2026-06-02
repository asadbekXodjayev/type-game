// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  const { wpmKeyStrokes, countDownConstant, countDown } = e.data;

  // Elapsed seconds since the test started. `countDown` ticks down from
  // `countDownConstant`, so elapsed = constant - countDown. Guard against
  // dividing by zero on the very first second (before any tick has elapsed).
  const elapsedSeconds = Math.max(countDownConstant - countDown, 1);

  // Standard WPM: (characters / 5) per minute.
  const currWpm = (wpmKeyStrokes / 5 / elapsedSeconds) * 60.0;

  postMessage(currWpm);
};
