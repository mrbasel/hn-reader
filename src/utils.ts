/* 
 Return a string with the first letter capitalized
*/
export function capitalizeFirstLetter(word: String): String {
  return word[0].toUpperCase() + word.substring(1, word.length);
}

/*
 Fetcher function for SWR hooks
*/
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
