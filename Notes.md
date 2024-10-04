# 8. NestJs Modules

- each application has atleast one root module
- modules are effective way to organize components by a closely related set of capabilities (e.g. per feature)
- it is goog practice to have a folder per each module, containing the module's components.

> Providers

- Array of providers to be available within the module via dependency injection.

> Controllers

- Array os Controllers to be instantiated within the module.

> Exports

- Array of Providers to export to other modules.

> Imports

# 9. More valuable content

# 10. Creating a Task module

```js
nest g module tasks
// the above cmd is used to create a module
```

# 11. Intro to NestJs Controllers

- Responsible for handling incoming requests and returning responses to the client.
- Bound to a specific path (/tasks)
- contains handlers, which handle endpoints and request methods(get,post delete ,...)
- can take advantage of dependency injection to consume providers within the same module

> Defining a controller

```js
@Controller('/tasks')
export class TaskController {
  //....
}
```

> Defining a Handler

- Handlers are simply methods within the controller class, decorated with decorators such as @Get, @Post, @Delete etc..,

```js
@Controller('/tasks')
export class TaskController {
  @Get() // Handler
  getAllTasks(){
    // do stuff
    return ..;
  }

  @Post()
  createTask(){
    // do stuff
    return ...;
  }
}
```

# 12.Creating a Task Controller

```js
nest g controller tasks --no-spec // it does'nt create spec file
```

# 13.Intro to NestJs Providers and Services

> Providers

- Can be injected into constructors if decorated as as @Injectable, via dependency injection
- Providers must be provided to a module for them to be usable.

> Service

- Implemented using providers, not all providers are services

> Dependency injection in NestJs

- @Injectable

# 14.Creating a taskService

```js
nest g service tasks --no-spec
```

# 15.Feature: Getting all tasks

- Using postman got the array of tasks

# 16.Installing Postman

# 17.Creating a Postman Collection

# 18.Defining a Task Model

- created an Interface (Task) and imported in service and controller (TypeScript)

# 19.Feature: Creating a Task

- Implemented createTask method in the service

# 20.Feature: Creating a Task Part-2

- Created a post method(createTask) in the controller
- @Body() is used to get the data sent in the body of post request

# 21.Intro to Data Transfer Object (DTO)

- is an object that carries data between processes
- it is not mandatory to use dto

# 22.Creating createTaskDTO

# 23.Getting a Task By Id

- using @Params() decorators we listen '/:id' path from the url

# 24.Deleting a Task

- using filter method deleted the object in tasks array

# 25.Delete answer

# 26.Updating a Task's Status

# 27.Update Answer

# 28.Searching and Filtering

```js
http://localhost:3000/tasks?status=OPEN&search=Cricket
```

- using @Query() Handler we can implement search and filter functionalities

```js
  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
```

# Section 3

# 30.Intro to NestJs Pipes

- Pipes operate in the arguments to be processed by the route handler, just before the handler is called.
- Pipes can perform _data transformation_ or _data validation_.
- Pipes can return data - either original or modified - which will be passed on to the route handler.
- Pipes can throw exceptions. Exceptions thrown will be handled by NestJs and parsed into an response.
- Parse can be asynchronous.

> 3 Types of Pipes - (Handler level pipes, Parameter level pipes and Glogal level pipes)

# 31.Validation pipe - Creating a Task

- To utilize validation and transformation pipes, we need to install 2 packages

1. (npm install class-validator --save)

- take a look at validation decorators.
- added @IsNotEmpty() decorator in the createTaskDto

# 32.Error Handling: Getting a non-existing Task

- Using NotFoundException

```js
getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID: "${id}" does not exist 🥲`);
    }
    return found;
  }
```

# 33.Error Handling: Deleting a non-existing Task

```js
deleteTask(id: string) {
    const found = this.getTaskById(id);
    // if (!found) {
    //   throw new NotFoundException(`Their is no such task to delete`);
    // }
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return `task deleted successfully`;
  }
```

# 34.Validation: Update Task status

# 35.Validation Task filtering and searching


-----------------------------------------------------------------

# Youtube

- installed mongodb compass and configured
- created a book module,controller and service
- created a .env file and wrote db_uri in that and 