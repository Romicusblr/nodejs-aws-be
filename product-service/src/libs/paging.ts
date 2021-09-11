export type Paging = {
  limit?: number;
  offset?: number;
};

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function toPaging(pagingObject: Paging = {}) {
  let {limit = DEFAULT_LIMIT, offset = 0} = pagingObject;
  if (limit <= 0 || limit > MAX_LIMIT) {
    limit = DEFAULT_LIMIT;
  }
  if (offset < 0) {
    offset = 0;
  }
  return {limit, offset};
}
