const db = require("../models/index.js");
const Philosophers = db.Philosophers;
const Languages = db.Languages;
// const Tutorial = db.tutorial;
// const Tags = db.tag;

// exports.addTags = (phId, tagId) => {
//   return Philosophers.findByPk(phId)
//     .then((ph) => {
//       if (!ph) {
//         console.log("Ph not found!");
//         return null;
//       }
//       return Tags.findByPk(tagId).then((tag) => {
//         if (!tag) {
//           console.log("Tag not found!");
//           return null;
//         }
//
//         ph.addTags(tag);
//         console.log(`>> added Tag id=${tag.id} to Ph id=${ph.id}`);
//         return ph;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding Tag to Ph: ", err);
//     });
// };

// exports.addTagLanguages = (phId, languageId) => {
//   return Philosophers.findByPk(phId)
//     .then(ph => {
//       if (!ph) {
//         console.log("Ph not found!");
//         return null;
//       }
//       return Languages.findByPk(languageId).then(language => {
//         if (!language) {
//           console.log("Tag not found!");
//           return null;
//         }
//
//         ph.addLanguages(language);
//         console.log(`>> added Tag id=${language.id} to Ph id=${ph.id}`);
//         return ph;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding Tag to Ph: ", err);
//     });
// };
//
// exports.removeTagLanguages = (phId, languageId) => {
//   return Philosophers.findByPk(phId)
//     .then(ph => {
//       if (!ph) {
//         console.log("Ph not found!");
//         return null;
//       }
//       return Languages.findByPk(languageId).then(language => {
//         if (!language) {
//           console.log("Tag not found!");
//           return null;
//         }
//
//         ph.removeLanguages(language);
//         console.log(`>> deleted Tag id=${language.id} to Ph id=${ph.id}`);
//         return ph;
//       });
//     })
//     .catch((err) => {
//       console.log(">> Error while adding Tag to Ph: ", err);
//     });
// };


exports.updateTagLanguages = (phId, languageIdsList) => {
  return Philosophers.findByPk(phId)
    .then(ph => {
      if (!ph) {
        console.log("Ph not found!");
        return null;
      }
      return ph.getLanguages()
        .then(array => {
          ph.removeLanguages(array)
        })
        .then(() => {
          ph.addLanguages(languageIdsList)
        })
        .catch(err => console.error(err.stack));
    });
};




// Nationalities
exports.updateTagNationalities = (phId, nationalitiesIdsList) => {
  return Philosophers.findByPk(phId)
    .then(ph => {
      if (!ph) {
        console.log("Ph not found!");
        return null;
      }
      return ph.getNationalities()
        .then(array => {
          ph.removeNationalities(array);
        })
        .then(() => {
          ph.addNationalities(nationalitiesIdsList);
        })
        .catch(err => console.error(err.stack));
    });
};

// Education
exports.updateTagEducation = (phId, educationIdsList) => {
  return Philosophers.findByPk(phId)
    .then(ph => {
      if (!ph) {
        console.log("Ph not found!");
        return null;
      }
      return ph.getEducation()
        .then(array => {
          ph.removeEducation(array);
        })
        .then(() => {
          ph.addEducation(educationIdsList);
        })
        .catch(err => console.error(err.stack));
    });
};

// Categories
exports.updateTagCategories = (phId, categoriesIdsList) => {
  return Philosophers.findByPk(phId)
    .then(ph => {
      if (!ph) {
        console.log("Ph not found!");
        return null;
      }
      return ph.getCategories()
        .then(array => {
          ph.removeCategories(array);
        })
        .then(() => {
          ph.addCategories(categoriesIdsList);
        })
        .catch(err => console.error(err.stack));
    });
};

// Keywords
exports.updateTagKeywords = (phId, keywordsIdsList) => {
  return Philosophers.findByPk(phId)
    .then(ph => {
      if (!ph) {
        console.log("Ph not found!");
        return null;
      }
      return ph.getKeywords()
        .then(array => {
          ph.removeKeywords(array);
        })
        .then(() => {
          ph.addKeywords(keywordsIdsList);
        })
        .catch(err => console.error(err.stack));
    });
};
