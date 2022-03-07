var express = require('express');
var router = express.Router();

const db = require('../../models/index');

const log = require('../../lib/log');


// authentification
const authUser = (req, res, next) => {
	// const userinfo = req.session.userinfo;
  // if (!userinfo) {
  // 	console.log("not login");
	// 	throw new Error("not login");
  // }
	next();
}


// tags
const tagsTables = {
  languages: db.Languages,
  nationalities: db.Nationalities,
  education: db.Education,
  categories: db.Categories,
  keywords: db.Keywords
};

// tags_read
// req: [tagsIndex]
// res: [tags]
const readTags = async (req, res, next) => {
	 // const index = req.body.index;
	const index = 'languages';

	const tags = await tagsTables[index]
		.findAll()
 		.catch(err => console.error(err.stack));

	res.locals.tags = tags;
	next();
}

router.get('/read',
	readTags,
	(req, res) => {
		const tags = res.locals.tags;
		const resJSON = {
			'data': tags
		}
		res.json(resJSON);
	}
);



// tags_update
// req: req.body.data = { userinfo: userinfo, index: index, tag: tag }
// res: status
const findTag = async (req, res, next) => {
	const index = req.body.index;

	const id = req.body.tag.id;
	const tag_old = await tagsTables[index]
		.findOne({ where: { id: id } })
		.catch(err => console.error(err.stack));

	res.locals.tag_old = tag_old;
	next();
}
const updateTag = (req, res, next) => {
	
}


router.post('/update', (req, res) => {
  const userinfo = req.session.userinfo;
  const index = req.body.index;
  const tag = req.body.tag;

  tagsTables[index].update({
    name: tag.name
  },
  {where: {id: tag.id}}
  )
  .then(() => {
    const now = new Date();
    const log = {
      date: now,
      userID: userinfo.userID,
      type: "update",
      dataType: "tags",
      dataName: index,
      dataID: tag.id,
      data_before: null,
      data_after: JSON.stringify(tag)
    };
    db.Logs.create(log)
    .catch(err => console.error(err.stack));

    res.end();
  })
  .catch(err => console.error(err.stack));
});


// tags_add
router.post('/add', (req, res) => {
  const userinfo = req.session.userinfo;
  const index = req.body.index;
  let tag = {
    id: null,
    name: req.body.newTagName
  }

  tagsTables[index].create({
    name: tag.name
  })
  .then(() => {
    tagsTables[index].findOne({where: {name: tag.name}})
    .then(t => {
      tag.id = t.id;
      console.log(tag.id);
    })
    .then(() => {
      const now = new Date();
      const log = {
        date: now,
        userID: userinfo.userID,
        type: "add",
        dataType: "tags",
        dataName: index,
        dataID: tag.id,
        data_before: null,
        data_after: JSON.stringify(tag)
      };
      db.Logs.create(log)
      .catch(err => console.error(err.stack));

      res.end();
    });
  })
  .catch(err => console.error(err.stack));
});



// tags_delete
router.post('/delete', (req, res) => {
  const userinfo = req.session.userinfo;
  const index = req.body.index;
  const tag = req.body.tag;

  tagsTables[index].destroy({
    where: {id: tag.id}
  })
  .then(() => {
    const now = new Date();
    const log = {
      date: now,
      userID: userinfo.userID,
      type: "delete",
      dataType: "tags",
      dataName: index,
      dataID: tag.id,
      data_before: JSON.stringify(tag),
      data_after: null
    };
    db.Logs.create(log)
    .catch(err => console.error(err.stack));

    res.end();
  })
  .catch(err => console.error(err.stack));
});



module.exports = router;