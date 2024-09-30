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
