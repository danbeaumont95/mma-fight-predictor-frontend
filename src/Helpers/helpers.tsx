/* eslint-disable import/prefer-default-export */
export function capitalizeWords(str: string) {
  // Split the input string into an array of words
  const words = str.split(' ');

  // Iterate through each word and capitalize the first letter
  const capitalizedWords = words.map((word) => {
    // Ensure the word is not an empty string
    if (word.length > 0) {
      // Capitalize the first letter and concatenate the rest of the word
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    // Handle empty words by returning an empty string
    return '';
  });

  // Join the capitalized words back into a single string
  const result = capitalizedWords.join(' ');

  return result;
}
