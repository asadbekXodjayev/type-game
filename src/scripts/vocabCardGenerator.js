import {
  VOCAB_DICTIONARIES,
  DICTIONARY_SOURCE_CATALOG,
} from "../constants/DictionaryConstants";

// Kept in its own module (separate from wordsGenerator) so the large GRE /
// TOEFL / CET dictionary JSONs are only pulled into the lazily-loaded
// WordsCard chunk, not the main bundle that every typing mode loads.
const wordsCardVocabGenerator = (vocabSource, chapter) => {
  const wordsList = [];
  const chapterCatalog = DICTIONARY_SOURCE_CATALOG[vocabSource];
  const chapterStartIndex = chapterCatalog[chapter][0];
  const chapterEndIndex = chapterCatalog[chapter][1];
  for (let i = chapterStartIndex; i < chapterEndIndex + 1; i++) {
    wordsList.push(VOCAB_DICTIONARIES[vocabSource][i]);
  }
  return wordsList;
};

export { wordsCardVocabGenerator };
