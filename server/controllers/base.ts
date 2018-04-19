abstract class BaseCtrl {

  abstract model: any;

  // Get all
  getAll = (req, res) => {
    console.log('getAll에 잘 왔당깨');
    this.model.find({}, (err, docs) => {
      console.log('getAll의 find 잘 왔당깨!!!');
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Count all
  count = (req, res) => {
    console.log('get에 잘 왔당깨');
    this.model.count((err, count) => {
      if (err) { return console.error(err); }
      res.json(count);
    });
  }
realinsert = (req, res) => {
  console.log('insert에 도착 해부렸당깨');
  this.model.insert(req.body);
  const obj = new this.model(req.body);
  obj.save((err, item) => {
    // 11000 is the code for duplicate key error
    if (err && err.code === 11000) {
      res.sendStatus(400);
    }
    if (err) {
      return console.error(err);
    }
    res.status(200).json(item);
  });
}



  // Insert
  insert = (req, res) => {
    console.log('insert에 도착 해부렸당깨');
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  }

//search  
  search = (req, res) => {
    console.log(req.query);
    console.log("asdadsasd");
    var queryName=Object.keys(req.query)[0];
    var queryValue=Object.values(req.query)[0];
    if (queryName == "title"){
      this.model.find({title : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('title find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "host"){
      this.model.find({host : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('host find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "contents"){
      this.model.find({contents : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('contents find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "tags"){
      this.model.find({tags : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('tags find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "writer"){
      console.log(queryValue);
      this.model.find({writer : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('writer find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        console.log(docs);
        res.json(docs);
      });
    }
    else if (queryName == "receiver"){
      this.model.find({receiver : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('receiver find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "sender"){
      this.model.find({sender : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('sender find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "contest_id"){
      this.model.find({contest_id : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('contest_id find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
    else if (queryName == "read_at") {
      this.model.find({read_at : new RegExp(String(queryValue))}, (err, docs) => {
        console.log('read_at find 잘 왔당깨!!!');
        if (err) { return console.error(err); }
        res.json(docs);
      });
    }
console.log(queryName);
  }


  // Get by id
  get = (req, res) => {
    console.log('get에 잘 왔당깨');
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      console.log('get의 findOne 잘 왔당깨');
      obj.hits++;
      console.log(obj.hits);

      obj.save();
      if (err) { return console.error(err); }
      res.json(obj);
    });
  }

   // put by id 실험용
   getAndUpdate = (req, res) => {
    console.log('getAndUpdate 잘 왔당깨');
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body,{ returnNewDocument: true }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  } 

  // Update by id
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

  // Delete by id
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

}

export default BaseCtrl;
