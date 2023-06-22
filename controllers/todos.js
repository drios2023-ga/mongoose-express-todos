// controllers/todos.js
const Todo =  require('../models/todo');

module.exports = {
    index,
    show,
    new: newTodo,
    create,
    delete: deleteTodo,
    edit,
    update
};

async function update(req, res){
  req.body.done = !!req.body.done;
  id = req.params.id;
  console.log(req.body);
  await Todo.findByIdAndUpdate( id, req.body, {new:true});
  res.redirect(`/todos/${req.params.id}`);
}

async function edit(req, res){
  const todo = await Todo.findById({ _id: req.params.id });
  res.render('todos/edit', {
    title: 'Edit To-Do', 
    todo
  });
}


async function show(req, res) {
      
  // Delete the document by its _id
  //await Todo.findById({ _id: req.params.id });
  res.render('todos/show',{
    todo:await Todo.findById({ _id: req.params.id }),
    title: 'To-Do Details'
  });
}


  async function index (req, res){
    const allTodos = await Todo.find();
    res.render("todos/",{
        todos: allTodos
    });
}

  function newTodo(req, res) {
    // We'll want to be able to render an
    // errorMsg if the create action fails
    res.render('todos/new.ejs', { errorMsg: '' });
  }

  async function create(req, res) {

    try {
      await Todo.create(req.body);
      // Always redirect after CRUDing data

      res.redirect('/todos');
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('todos/new', { errorMsg: err.message });
    }

  }

   async function deleteTodo(req, res) {
      
    // Delete the document by its _id
    await Todo.deleteOne({ _id: req.params.id });
    res.redirect('/todos');
    //console.log(await Test.countDocuments({ _id: id })); // 0
  }