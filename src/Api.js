export async function getReviews({
  sort = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `sort=${sort}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
