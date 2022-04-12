export const toEmptyArray = (phils) => {
  return phils.map(ph => {
    return {
      ...ph,
      influenced: ph.influenced || [],
      influences: ph.influences || []
    }
  });
}