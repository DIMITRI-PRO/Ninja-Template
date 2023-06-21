const formatQuery = (data) => {
  const query = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    query.push(`${key} = ?`);
    values.push(value);
  });

  return { query, values };
};

export default { formatQuery };
