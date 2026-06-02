import randomWords from "random-words";
import {
  COMMON_WORDS,
  COMMON_CHINESE_WORDS,
  COMMON_CHINESE_IDIOMS_WORDS,
} from "../constants/WordsMostCommon";
import {
  DEFAULT_DIFFICULTY,
  ENGLISH_MODE,
  CHINESE_MODE,
  DEFAULT_WORDS_COUNT,
} from "../constants/Constants";
import { randomIntFromRange } from "./randomUtils";
import {
  generateRandomNumChras,
  generateRandomSymbolChras,
} from "./randomCharsGenerator";

// These vocab sources are JSON objects keyed "0".."N-1", so derive their size
// from the key count (Array#length is undefined on them). Computed once at
// module load. randomIntFromRange is inclusive, so the upper bound is size - 1.
const COMMON_WORDS_MAX_INDEX = Object.keys(COMMON_WORDS).length - 1;
const COMMON_CHINESE_WORDS_MAX_INDEX =
  Object.keys(COMMON_CHINESE_WORDS).length - 1;
const COMMON_CHINESE_IDIOMS_WORDS_MAX_INDEX =
  Object.keys(COMMON_CHINESE_IDIOMS_WORDS).length - 1;

// Safe fallback word list used when an unknown language mode is requested,
// so consumers never receive `undefined` (which would crash on `.map`).
const FALLBACK_WORDS = ["something", "went", "wrong"].map((w) => ({
  key: w,
  val: w,
}));

const wordsGenerator = (
  wordsCount,
  difficulty,
  languageMode,
  numberAddOn,
  symbolAddOn
) => {
  if (languageMode === ENGLISH_MODE) {
    if (difficulty === DEFAULT_DIFFICULTY) {
      const EnglishWordList = [];
      for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
        const rand = randomIntFromRange(0, COMMON_WORDS_MAX_INDEX);
        let wordCandidate = COMMON_WORDS[rand].val;
        if (numberAddOn) {
          wordCandidate = wordCandidate + generateRandomNumChras(1, 2);
        }
        if (symbolAddOn) {
          wordCandidate = wordCandidate + generateRandomSymbolChras(1, 1);
        }
        EnglishWordList.push({ key: wordCandidate, val: wordCandidate });
      }
      return EnglishWordList;
    }

    // hard
    const randomWordsGenerated = randomWords({
      exactly: wordsCount,
      maxLength: 7,
    });
    const words = [];
    for (let i = 0; i < wordsCount; i++) {
      let wordCandidate = randomWordsGenerated[i];
      if (numberAddOn) {
        wordCandidate = wordCandidate + generateRandomNumChras(1, 2);
      }
      if (symbolAddOn) {
        wordCandidate = wordCandidate + generateRandomSymbolChras(1, 1);
      }
      words.push({ key: wordCandidate, val: wordCandidate });
    }
    return words;
  }
  return FALLBACK_WORDS;
};

const chineseWordsGenerator = (
  difficulty,
  languageMode,
  numberAddOn,
  symbolAddOn
) => {
  if (languageMode === CHINESE_MODE) {
    if (difficulty === DEFAULT_DIFFICULTY) {
      const ChineseWordList = [];
      for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
        const rand = randomIntFromRange(0, COMMON_CHINESE_WORDS_MAX_INDEX);
        if (COMMON_CHINESE_WORDS[rand] && COMMON_CHINESE_WORDS[rand].val) {
          let wordCandidateKey = COMMON_CHINESE_WORDS[rand].key;
          let wordCandidateVal = COMMON_CHINESE_WORDS[rand].val;
          if (numberAddOn) {
            const generatedNumber = generateRandomNumChras(1, 2);
            wordCandidateKey = wordCandidateKey + generatedNumber;
            wordCandidateVal = wordCandidateVal + generatedNumber;
          }
          if (symbolAddOn) {
            const generatedSymbol = generateRandomSymbolChras(1, 1);
            wordCandidateKey = wordCandidateKey + generatedSymbol;
            wordCandidateVal = wordCandidateVal + generatedSymbol;
          }

          ChineseWordList.push({
            key: wordCandidateKey,
            val: wordCandidateVal,
          });
        }
      }

      return ChineseWordList;
    }

    const ChineseIdiomsList = [];
    for (let i = 0; i < DEFAULT_WORDS_COUNT; i++) {
      const rand = randomIntFromRange(0, COMMON_CHINESE_IDIOMS_WORDS_MAX_INDEX);
      if (
        COMMON_CHINESE_IDIOMS_WORDS[rand] &&
        COMMON_CHINESE_IDIOMS_WORDS[rand].val
      ) {
        let wordCandidateKey = COMMON_CHINESE_IDIOMS_WORDS[rand].key;
        let wordCandidateVal = COMMON_CHINESE_IDIOMS_WORDS[rand].val;
        if (numberAddOn) {
          const generatedNumber = generateRandomNumChras(1, 2);
          wordCandidateKey = wordCandidateKey + generatedNumber;
          wordCandidateVal = wordCandidateVal + generatedNumber;
        }
        if (symbolAddOn) {
          const generatedSymbol = generateRandomSymbolChras(1, 1);
          wordCandidateKey = wordCandidateKey + generatedSymbol;
          wordCandidateVal = wordCandidateVal + generatedSymbol;
        }
        ChineseIdiomsList.push({
          key: wordCandidateKey,
          val: wordCandidateVal,
        });
      }
    }

    return ChineseIdiomsList;
  }
  return FALLBACK_WORDS;
};

export { wordsGenerator, chineseWordsGenerator };
