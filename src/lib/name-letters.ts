export type NameLetter = { char: string; word: number; indexInWord: number; globalIndex: number };

export function splitNameIntoLetters(name: string): NameLetter[] {
  const words = name.split(" ");
  let globalIndex = 0;
  return words.flatMap((word, wi) =>
    word.split("").map((char, li) => ({
      char,
      word: wi,
      indexInWord: li,
      globalIndex: globalIndex++,
    }))
  );
}

export function seededRandom(n: number) {
  const x = Math.sin(n * 999.73) * 10000;
  return x - Math.floor(x);
}
