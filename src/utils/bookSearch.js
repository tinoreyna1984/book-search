export const bookSearch = async (isbn13) => {
  try {
        const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
        const data = await response.json();
        return data;
    } catch (e) {
        return console.log(e);
    }
}