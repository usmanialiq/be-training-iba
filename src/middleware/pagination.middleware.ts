export default function pagination(req) {
  const page: number = parseInt(req.page) || 1;
  const size: number = parseInt(req.size) || 10;
  const query: any = {
    size,
    limit: 0,
    page,
  };
  query.skip = query.size * (page - 1);
  query.limit = query.size;
  query.page = page;
  delete query.size;
  if (isNaN(query.skip)) {
    query.skip = 0;
  }
  return query;
}
