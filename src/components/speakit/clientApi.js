export async function getWords(page = 0, group = 0) {
  const resp = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`
  );
  return await resp.json();
}
