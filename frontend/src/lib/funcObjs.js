export const copyObj = (obj) => obj ? JSON.parse(JSON.stringify(obj)) : null ;
export const lenObj = (obj) => Object.keys(obj).length;