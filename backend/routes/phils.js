var express = require('express');
var router = express.Router();

const db = require('../models/index');


// logged in
router.get('/', (req, res) => {
    if (!req.session.userinfo) {
        res.redirect('/main');
    }
});


// create
app.post('/create', (req, res) => {
    const userinfo = req.session.userinfo;
    if (!userinfo) {
      console.log("not login");
    } else {
      let ph = req.body;
  
      let id = Math.random().toString().substr(2, 6);
      // const assignedId = () => {
      //   while (true) {
      //     let id_temp = Math.random().toString().substr(2, 6);
      //     db.Philosophers.count({where: {id: [id_temp]}})
      //     .then(count => {
      //       console.log(count);
      //       if (count === 0) {
      //         // break;
      //         return id_temp;
      //       }
      //     });
      //   }
      //   // return id_temp;
      // };
      //
      // const id = assignedId();
      // console.log("id:" + id);
      // console.log("hey");
      // res.end();
  
  
      const addPhilosophers = async () => {
        // let id = Math.random().toString().substr(2, 6);
        db.Philosophers.create({
          id: id,
          name: ph.name,
          name_original: ph.name_original,
          name_other: ph.name_other,
          born: ph.born,
          born_date: ph.born_date,
          born_questioning: ph.born_questioning,
          died: ph.died,
          died_date: ph.died_date,
          died_questioning: ph.died_questioning,
          gender: ph.gender,
          birthplace: ph.birthplace,
          deathplace: ph.deathplace,
        })
        .catch(err => console.error(err.stack));
      };
  
      const updateTags = async (id) => {
        await TagsController.updateTagLanguages(id, ph.languages.map(ts => ts.id));
        await TagsController.updateTagNationalities(id, ph.nationalities.map(ts => ts.id));
        await TagsController.updateTagEducation(id, ph.education.map(ts => ts.id));
        await TagsController.updateTagCategories(id, ph.categories.map(ts => ts.id));
        await TagsController.updateTagKeywords(id, ph.keywords.map(ts => ts.id));
      };
  
      addPhilosophers()
      // .then(() => {
      //   db.Philosophers
      // })
      .then(() => updateTags(id))
      .then(() => {
        const now = new Date();
        const log = {
          date: now,
          userID: userinfo.id,
          type: "add",
          dataType: "philosophers",
          dataName: "ph",
          dataID: id,
          data_before: null,
          data_after: JSON.stringify(ph)
        };
        db.Logs.create(log)
        .catch(err => console.error(err.stack));
  
        res.end();
      })
      .catch(err => console.error(err.stack));
    }
  });

// read
router.get('/read', (req, res) => {
  db.Philosophers.findAll({
    include: [
    //   { model: db.Languages, as: "languages" },
    //   { model: db.Nationalities, as: "nationalities" },
    //   { model: db.Education, as: "education" },
    //   { model: db.Categories, as: "categories" },
    //   { model: db.Keywords, as: "keywords" }
    ]
  })
    .then(phils => res.json(phils.map(ph => ph.dataValues)))
    .catch(err => console.error(err.stack));
});


// update
router.post('/update', (req, res) => {
    const userinfo = req.session.userinfo;
    if (!userinfo) {
      console.log("not login");
    } else {
        const ph = req.body;

        const findBeforePh = async () => {
        db.Philosophers.findOne({where: {id: ph.id}})
        .then(ph => ph)
        };

        const updatePhilosophers = async () => {
        db.Philosophers.update({
            name: ph.name,
            name_original: ph.name_original,
            name_other: ph.name_other,
            born: ph.born,
            born_date: ph.born_date,
            born_questioning: ph.born_questioning,
            died: ph.died,
            died_date: ph.died_date,
            died_questioning: ph.died_questioning,
            gender: ph.gender,
            birthplace: ph.birthplace,
            deathplace: ph.deathplace,
        },
        {where: {id: ph.id}}
        )
        .catch(err => console.error(err.stack));
        };

        const updateTags = async () => {
        await TagsController.updateTagLanguages(ph.id, ph.languages.map(ts => ts.id));
        await TagsController.updateTagNationalities(ph.id, ph.nationalities.map(ts => ts.id));
        await TagsController.updateTagEducation(ph.id, ph.education.map(ts => ts.id));
        await TagsController.updateTagCategories(ph.id, ph.categories.map(ts => ts.id));
        await TagsController.updateTagKeywords(ph.id, ph.keywords.map(ts => ts.id));
        };

        const updateFuncs = [updatePhilosophers(), updateTags()];

        db.Philosophers.findOne({where: {id: ph.id}})
        .then(oldPh => {
        Promise.all(updateFuncs)
        .then(() => {
            const now = new Date();
            const log = {
            date: now,
            userID: userinfo.userID,
            type: "update",
            dataType: "philosophers",
            dataName: "ph",
            dataID: ph.id,
            data_before: JSON.stringify(oldPh),
            data_after: JSON.stringify(ph)
            };
            db.Logs.create(log)
            .catch(err => console.error(err.stack));

            res.end();
        })
        .catch(err => console.error(err.stack));
        });
    }
});


// delete
app.post('/delete', (req, res) => {
    const userinfo = req.session.userinfo;
    if (!userinfo) {
      console.log("not login");
    } else {
      const ph = req.body;
      db.Philosophers.destroy({
        where: {
          id: [ph.id]
        }
      })
      .then(() => {
        const now = new Date();
        const log = {
          date: now,
          userID: userinfo.userID,
          type: "delete",
          dataType: "philosophers",
          dataName: "ph",
          dataID: ph.id,
          data_before: JSON.stringify(ph),
          data_after: null
        };
        db.Logs.create(log)
        .catch(err => console.error(err.stack));
  
        res.end();
      })
      .catch(err => console.error(err.stack));
    }
});

module.exports = router;