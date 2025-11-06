export function pluralizeWord(word: string): string {
    const lastChar = word[word.length - 1];

    if (lastChar == 'y')
        return word.substring(0, word.length - 1)+"ies";

    return word+"s";
}