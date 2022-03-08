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



// tags_create
// req: req.body.data = { userinfo: userinfo, index: index, tag: tag }
// res: status
const createTag = (req, res, next) => {
  const index = req.body.index;
	const tagName = req.body.tag.name;

  tagsTables[index]
    .create({
      name: tagName
    })
  .catch(err => console.error(err.stack));

  next();
}

router.post('/create',
  authUser,
  createTag,
  (req, res, next) => {
		const logData = {
			userId: userinfo.id,
			DB: "tags",
			action: "create",
			data_before: null,
			data_after: JSON.stringify(tag)
		};
		log(logData);
		next();
	},
	(req, res) => {
		res.json('created');
	}
);



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
  const tag = res.body.tag;

	tagsTables[index]
    .update({
      name: tag.name
    },
    { where: { id: tag.id } }
    )
    .catch(err => console.error(err.stack));
  
  res.locals.tag_new = tag;
  next();
}

router.post('/update',
  authUser,
  findTag,
  updateTag,
  // (req, res, next) => {
  //   const userinfo = req.session.userinfo;
  
  //   const logData = {
  //     userId: userinfo.id,
  //     DB: 'tags',
  //     action: 'update',
  //     data_before: JSON.stringify(res.locals.tag_old),
  //     data_after: JSON.stringify(res.locals.tag_new)
  //   };
  //   log(logData)
  //   next();
  // },
  (req, res) => {
    res.json('updated');
  }
);





// tags_delete
// req: [userinfo, ph.id]
// res: status
const deleteTag = (req, res, next) => {
  const index = req.body.index;
	const tag_old = req.body.tag;
	tagsTables[index]
		.destroy({ where: { id: tag_old.id } })
		.catch(err => console.error(err.stack));
	
	res.locals.tag_old = tag_old;
	next();
}

router.post('/delete',
	authUser,
	deleteTag,
	// (req, res, next) => {
	// 	const logData = {
	// 		userId: userinfo.id,
	// 		DB: "tags",
	// 		action: "delete",
	// 		data_before: JSON.stringify(res.locals.tag_old),
	// 		data_after: null
	// 	};
	// 	log(logData);
	// 	next();
	// },
	(req, res) => {
		res.json('deleted');
	}
);



module.exports = router;