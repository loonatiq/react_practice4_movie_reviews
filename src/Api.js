export async function getReviews(sort = "createdAt") {
  const query = `sort=${sort}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}
