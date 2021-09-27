const Todo = require("../Models/Todo");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// const ErrorHandler = require("../utils/errorHandler");
///// Add todo /////////

// exports.addtodo = catchAsyncErrors(async (req, res) => {
//   const todo = await Todo.create(req.body);

//   res.status(200).json({
//     success: true,
//     todo,
//   });
// });

exports.addtodo = async (req, res) => {
  const { username, title, category } = req.body;
  /// category = shudld be this value "task", "hobby", "work"],
  //console.log(title, category);

  const todo = new Todo({
    username,
    title,
    category,
  });

  todo.save((error, todo) => {
    if (error) {
      return res.status(400).json({
        message: "bad reqest data not added",
      });
    }

    if (todo) {
      return res.status(201).json({
        message: "Successfully addded a Todo",
        todo,
      });
    }
  });
};

/////////////// Get All Todo and also filetr by create at //////////////

exports.getalltodo = async (req, res) => {
  try {
    //////////////////////// Get all Todo //////////////////////////////
    ///////////////// sorting Todo by createdAt //////////////////////////////
    let key = [];
    for (let k in req.query) {
      key.push(k);
    }
    if (key.length == 0) {
      console.log("should have no query string");
      const todo = await Todo.find().sort({ createdAt: -1 });

      ///////////////// chcke todo  data found or Not//////////////////////////////
      if (todo.length == 0) {
        res.status(404).json({
          success: false,
          message: `Not Found any Todo Data`,
          todo,
        });
      } else {
        res.status(200).json({ success: true, message: "All Todo", todo });
      }
    } else {
      let firstKey = key[0];

      if (key.length == 1) {
        // console.log(req.query[firstKey]);
        firstKey == "true" ? (firstKey = true) : "";
        req.query[key][0] == "false" ? (req.query[key][0] = false) : "";

        ///////////////// if it has query then fillter by given key//////////////////////////////
        ///////////////// // route ex http://localhost:3000/todo/?status=true   ////////////////////
        ///////////////// // req.query = example {key : value}   ////////////////////

        const response = await Todo.find(req.query).sort({
          createdAt: -1,
        });

        ///////////////// chcke filterd data found or Not//////////////////////////////
        if (response.length <= 0) {
          res.status(404).json({
            success: false,
            message: `Not Found ${key} of Todo`,
            todo: response,
          });
        }
        ///////////////// Filterd data resposed//////////////////////////////
        res.status(200).json({
          success: true,
          message: `All ${key} of Todo`,
          todo: response,
        });
      } else {
        ///////////////// respose all todo whithout filtering route (/)//////////////////////////////
        res.status(400).json({ success: false, message: "Add only One key" });
      }
    }
  } catch (err) {
    // console.log(err);
    res.status(404).json({ success: false, message: "data not found", err });
  }
};

/////////////// Get by Todo Id //////////////

// exports.gettodoById = catchAsyncErrors(async (req, res, next) => {
//   const todo = await Todo.findById(req.params.id);

//   if (!todo) {
//     // return next(new ErrorHandler("Todo not found with this id", 404));
//     res
//       .status(404)
//       .json({
//         success: true,
//         message: `Todo Not found this id:${req.params.id}`,
//       });
//   }

//   res.status(200).json({
//     success: true,
//     todo,
//   });
// });

exports.gettodoById = async (req, res) => {
  let id = req.params.id;

  try {
    const todo = await Todo.findById({ _id: id });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: `Todo Not found this id:${id}`,
      });
    }

    res.status(200).json({ success: true, todo });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ success: false, message: "data not found", err });
  }
};
/////////////// Get by Todo Id //////////////

exports.updatetodo = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    });

    if (!todo) {
      res.status(402).json({
        success: false,
        message: `Todo  unsuccessful update this id:${id}`,
      });
    }

    res.status(200).json({ success: true, message: todo });
  } catch (err) {
    // console.log(err);
    res.status(402).json({
      success: false,
      message: `Todo  unsuccessful update this id:${id}`,
      err,
    });
  }
};

exports.deletetodo = async (req, res) => {
  try {
    let id = req.params.id;
    const todo = await Todo.findOneAndDelete({ _id: id });
    console.log(todo);
    if (todo) {
      res.status(201).json({ success: true, message: "Todo removed" });
    } else {
      res.status(204).json({ success: false, message: "not deleted todo" });
    }
  } catch (err) {
    res.status(204).json({ success: false, message: "not deleted todo", err });
  }
};
