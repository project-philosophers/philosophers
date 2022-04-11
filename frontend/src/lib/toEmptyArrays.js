export const toEmptyArray = (phils) => {
  phils.forEach(ph => {
    if (!ph.influenced) {
      ph.influenced = [];
    }
    if (!ph.influences) {
      ph.influences = [];
    }
  });
}