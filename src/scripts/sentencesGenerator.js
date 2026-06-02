import { CHINESE_MODE, ENGLISH_MODE } from "../constants/Constants";
import {
  ENGLISH_SENTENCES,
  CHINESE_SENTENCES,
} from "../constants/SentencesCollection";
import { randomIntFromRange } from "./randomUtils";

// Sentence sources are JSON objects keyed "0".."N-1"; derive bounds from the
// key count (inclusive range, so max index = size - 1).
const ENGLISH_SENTENCES_MAX_INDEX = Object.keys(ENGLISH_SENTENCES).length - 1;
const CHINESE_SENTENCES_MAX_INDEX = Object.keys(CHINESE_SENTENCES).length - 1;

const FALLBACK_SENTENCES = [
  { key: "fallback", val: "Something went wrong. Please restart." },
];

const sentencesGenerator = (sentencesCount, language) => {
  if (language === ENGLISH_MODE) {
    const EnglishSentencesList = [];
    for (let i = 0; i < sentencesCount; i++) {
      const rand = randomIntFromRange(0, ENGLISH_SENTENCES_MAX_INDEX);
      EnglishSentencesList.push(ENGLISH_SENTENCES[rand]);
    }
    return EnglishSentencesList;
  }
  if (language === CHINESE_MODE) {
    const ChinseseSentencesList = [];
    for (let i = 0; i < sentencesCount; i++) {
      const rand = randomIntFromRange(0, CHINESE_SENTENCES_MAX_INDEX);
      ChinseseSentencesList.push(CHINESE_SENTENCES[rand]);
    }
    return ChinseseSentencesList;
  }
  return FALLBACK_SENTENCES;
};

export { sentencesGenerator };
