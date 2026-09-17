export const CURRICULUM_DATA = [
  {
    id: 'csharp-dotnet',
    title: 'C# & .NET Fundamentals',
    icon: 'Terminal',
    summary: 'Core runtime architecture, memory model, OOP principles, type system, and asynchronous concurrency in modern .NET.',
    topics: [
      {
        name: 'The .NET Ecosystem',
        questions: [
          {
            q: 'What is .NET, and what are its key features?',
            a: `**.NET** is a free, cross-platform, open-source developer platform created by Microsoft for building many types of applications (web, mobile, desktop, cloud, IoT, and games).

**Key Features:**
• **Cross-Platform**: Runs on Windows, Linux, and macOS.
• **High Performance**: Industry-leading throughput with Kestrel, RyuJIT, and Span<T> zero-allocation memory abstractions.
• **Unified BCL (Base Class Library)**: Comprehensive standard library for collections, cryptography, I/O, and networking.
• **Automatic Memory Management**: Generational Garbage Collector (GC).
• **Language Interoperability**: Multiple languages (C#, F#, VB.NET) compile down to Common Intermediate Language (CIL).`
          },
          {
            q: 'Explain the .NET architecture (CLR, CTS, CLS) and JIT compilation.',
            a: `• **CLR (Common Language Runtime)**: The execution engine that handles memory allocation, garbage collection, thread management, exception handling, and security.
• **CTS (Common Type System)**: Defines all data types and programming constructs supported by the CLR to guarantee cross-language data sharing.
• **CLS (Common Language Specification)**: A subset of CTS rules that compilers must conform to for seamless cross-language interoperability (e.g., avoiding case-sensitive-only identifier rules for VB.NET compatibility).
• **JIT (Just-In-Time) Compilation**: C# source code compiles into **CIL** (Common Intermediate Language) stored in assemblies (.dll). At runtime, the JIT compiler translates CIL into machine-specific native bytecode. RyuJIT supports Tiered Compilation (Tier 0 for instant startup, Tier 1 optimized for hot paths).`
          },
          {
            q: 'What is the difference between .NET Framework and .NET Core/.NET 5+?',
            a: `• **.NET Framework (1.0 - 4.8.1)**: Legacy, Windows-only monolithic framework tightly coupled with IIS and the Windows registry. Not actively developing new features.
• **.NET Core (1.0 - 3.1)**: Rebuilt from scratch as open-source, modular, lightweight, and cross-platform.
• **.NET 5, 6, 7, 8, 9+**: The unified vision that merged .NET Core, Xamarin, and Mono into a single modern .NET platform with annual release cadences (even numbers are LTS - Long Term Support).`
          }
        ]
      },
      {
        name: 'Types & Variables',
        questions: [
          {
            q: 'What is the difference between value types and reference types?',
            a: `• **Value Types** (\`struct\`, \`enum\`, primitives like \`int\`, \`double\`, \`bool\`, \`DateTime\`):
  - Directly store the data value.
  - Allocated on the thread stack or inline within enclosing objects on the heap.
  - Copied by value upon assignment.
• **Reference Types** (\`class\`, \`interface\`, \`delegate\`, \`string\`, \`object\`, \`array\`):
  - Store a reference (memory pointer) to the data located on the managed heap.
  - Assignment copies only the memory reference, pointing to the same underlying instance.
  - Cleaned up by the Garbage Collector.`
          },
          {
            q: 'Explain `var` vs `dynamic` vs `object`.',
            a: `• **\`var\`**: Statically typed at **compile time**. The compiler infers the exact type from the right-hand assignment. Has full IntelliSense and zero runtime reflection overhead.
• **\`dynamic\`**: Type resolution is deferred until **runtime** via the Dynamic Language Runtime (DLR). Bypasses compile-time type checking. Useful for COM interop, Python scripting, or dynamic JSON.
• **\`object\`**: The ultimate base class of all types in .NET. Requires explicit casting or pattern matching to access members; causes boxing when holding value types.`
          },
          {
            q: 'What is boxing and unboxing?',
            a: `• **Boxing**: The implicit conversion of a value type to an \`object\` or interface type. A new object is allocated on the managed heap and the value is copied into it.
• **Unboxing**: The explicit conversion of an \`object\` back to the original value type. Requires a runtime type check and extracts the value from the heap.
• **Performance impact**: Frequent boxing/unboxing causes heap allocations and increases GC pressure. Use generics (\`List<T>\` instead of \`ArrayList\`) to avoid boxing.`
          },
          {
            q: 'Explain nullable types (e.g., `int` vs `int?`).',
            a: `• By default, value types cannot be \`null\`.
• **\`Nullable<T>\` / \`int?\`**: A struct wrapper around a value type containing:
  - \`bool HasValue\`
  - \`T Value\`
• Nullable Reference Types (\`#nullable enable\` in C# 8+): Static compiler analysis that flags potential null dereferences (\`string?\` vs \`string\`) without runtime overhead.`
          }
        ]
      },
      {
        name: 'OOP & Classes',
        questions: [
          {
            q: 'Explain OOP principles in C#.',
            a: `1. **Encapsulation**: Bundling state and behavior together while restricting direct access using access modifiers (\`private\`, \`protected\`, \`internal\`, \`public\`) and properties.
2. **Inheritance**: Creating new classes based on existing ones to reuse and extend functionality (\`class Dog : Animal\`). C# supports single class inheritance and multiple interface implementation.
3. **Polymorphism**: The ability to treat derived objects as instances of their base class, customized via virtual methods and interfaces (\`override\`, \`virtual\`).
4. **Abstraction**: Hiding complex implementation details and exposing only essential interfaces (\`abstract class\`, \`interface\`).`
          },
          {
            q: 'What is the difference between an interface and an abstract class?',
            a: `• **Abstract Class**:
  - Represents an *is-a* relationship.
  - Can contain instance fields, constructors, non-public members, and complete method implementations.
  - A class can inherit from only **one** abstract class.
• **Interface**:
  - Defines a contract (*can-do* capability).
  - Cannot contain instance fields (state).
  - A class can implement **multiple** interfaces.
  - C# 8+ supports Default Interface Methods (DIM).`
          },
          {
            q: 'What is the difference between a class and a struct?',
            a: `• **\`class\`**: Reference type allocated on the managed heap, supports inheritance, finalizers, and reference equality.
• **\`struct\`**: Value type allocated on the stack or inline, copied by value, cannot inherit from classes (only interfaces), ideal for small, immutable data packets (<16 bytes like \`Point\`, \`ComplexNumber\`).
• **\`record struct\` / \`record class\`**: Provides built-in value-based equality and non-destructive mutation (\`with\` expression).`
          },
          {
            q: 'Explain method overloading vs method overriding.',
            a: `• **Overloading (Compile-Time / Static Polymorphism)**: Multiple methods in the same class with the same name but different signatures (parameter types, order, or count).
• **Overriding (Run-Time / Dynamic Polymorphism)**: A derived class provides a specific implementation of a \`virtual\` or \`abstract\` method defined in its base class using the \`override\` keyword, resolved via the Virtual Method Table (vtable).`
          }
        ]
      },
      {
        name: 'Keywords & Modifiers',
        questions: [
          {
            q: 'Explain the purpose of the `static` keyword.',
            a: `• **Static Members (fields/methods)**: Belong to the type itself rather than any specific instance. Shared across all instances in the AppDomain.
• **Static Class**: Cannot be instantiated, cannot inherit, can contain only static members, and is sealed.
• **Static Constructor**: Executes once automatically before the first instance is created or any static member is accessed.`
          },
          {
            q: 'What is the difference between `const` and `readonly`?',
            a: `• **\`const\`**: Evaluated at **compile-time**, implicitly static, must be initialized at declaration, supports only primitive/literal types. Values are inlined directly into call-site assemblies.
• **\`readonly\`**: Evaluated at **runtime**, can be initialized either at declaration or within the constructor, supports any object type, stored in memory.`
          },
          {
            q: 'Explain `out` vs `ref`.',
            a: `• **\`ref\`**: Passes arguments by reference. The variable **must be initialized** before passing into the method. The method can read and modify it.
• **\`out\`**: Passes arguments by reference for output. The variable **does not need to be initialized** beforehand, but the called method **must assign a value** before returning.`
          },
          {
            q: 'What is a partial class, and when would you use it?',
            a: `• A **partial class** allows splitting a single class definition across multiple \`.cs\` files. The C# compiler combines them into a single type during compilation.
• **Common use cases**:
  - Auto-generated code (Source Generators, Entity Framework scaffolding, WPF/WinForms designer files) separated from human business logic.
  - Large team collaboration on complex domain entities.`
          }
        ]
      },
      {
        name: 'Delegates & Events',
        questions: [
          {
            q: 'What is a delegate, and what are events in C#?',
            a: `• **Delegate**: A type-safe, object-oriented function pointer that references one or more methods with a matching signature (\`delegate void LogHandler(string msg);\`). Supports multicast via \`+\` and \`+=\`.
• **Event**: A wrapper over a delegate that enforces the publisher-subscriber model. External classes can only subscribe (\`+=\`) or unsubscribe (\`-=\`); only the declaring class can invoke the event.`
          },
          {
            q: 'Explain `Func`, `Action`, and `Predicate`.',
            a: `• **\`Action<T1, T2...>\`**: A built-in generic delegate that takes 0 to 16 parameters and returns \`void\`.
• **\`Func<T1, T2..., TResult>\`**: A generic delegate that takes 0 to 16 parameters and **returns a value** of type \`TResult\`.
• **\`Predicate<T>\`**: A delegate that takes one parameter of type \`T\` and returns a \`bool\` (equivalent to \`Func<T, bool>\`).`
          }
        ]
      },
      {
        name: 'Memory Management',
        questions: [
          {
            q: 'Explain Garbage Collection in .NET.',
            a: `The .NET Garbage Collector (GC) is an automatic memory manager with 3 generational partitions on the Managed Heap:
• **Gen 0 (Short-lived)**: Newly allocated small objects. Collected most frequently.
• **Gen 1 (Buffer)**: Surviving objects from Gen 0 collections.
• **Gen 2 (Long-lived)**: Surviving objects from Gen 1 (e.g. singletons, static references).
• **LOH (Large Object Heap)**: Objects >= 85,000 bytes. Collected during Gen 2 cycles.
• **GC Phases**: Marking (identifies live roots) -> Sweeping/Compacting (defragments and shifts live memory).`
          },
          {
            q: 'What is a memory leak in C#?',
            a: `Even with GC, memory leaks occur when unused objects remain referenced by active GC roots:
• **Unsubscribed Events**: Publishers holding strong delegate references to subscribers.
• **Static Collections**: Adding items to static lists/dictionaries without bounds or eviction.
• **Unmanaged Resources**: Unclosed database connections, file streams, or COM objects.
• **Timers**: System.Threading.Timer instances not disposed.`
          },
          {
            q: 'What is `IDisposable` and the `using` statement, and when should they be used?',
            a: `• **\`IDisposable\`**: An interface with a \`Dispose()\` method used to deterministically release **unmanaged resources** (file handles, database connections, sockets, GDI pointers) without waiting for GC finalization.
• **\`using\` statement / declaration**: Syntactic sugar for \`try { ... } finally { obj.Dispose(); }\`, guaranteeing cleanup even if an unhandled exception occurs.
• C# 8+ pattern: \`using var stream = new FileStream(...);\``
          }
        ]
      },
      {
        name: 'Asynchronous Programming',
        questions: [
          {
            q: 'Explain `async` and `await`.',
            a: `• **\`async\`**: Marks a method as asynchronous and enables the use of the \`await\` keyword. The compiler rewrites the method into a state machine struct.
• **\`await\`**: Asynchronously yields control back to the caller while waiting for the task to complete, freeing the executing thread (e.g., UI thread or ASP.NET threadpool worker) to process other work without blocking.`
          },
          {
            q: 'What is the difference between `Task` and `Thread`?',
            a: `• **\`Thread\`**: An OS-level execution thread. Expensive to create (~1MB stack, context switching overhead).
• **\`Task\`**: A higher-level abstraction representing an asynchronous promise or piece of work managed by the CLR \`ThreadPool\`. Reuses threads efficiently, supports continuations, cancellation, and return values.`
          },
          {
            q: 'What is the difference between `Thread.Sleep` and `Task.Delay`?',
            a: `• **\`Thread.Sleep(ms)\`**: Synchronously blocks the current OS thread, preventing it from executing any other work.
• **\`Task.Delay(ms)\`**: Non-blocking asynchronous timer that schedules a callback on the thread pool without holding any thread hostage while waiting.`
          },
          {
            q: 'When can `async`/`await` hurt performance?',
            a: `• **Micro-operations**: Extremely fast CPU-bound methods where the overhead of the generated state machine and Task allocations exceeds the work itself. (Solution: \`ValueTask<T>\`).
• **Sync-over-Async Antipattern**: Calling \`.Result\` or \`.Wait()\` on async tasks causes thread pool starvation and deadlocks.`
          },
          {
            q: 'How do you run two tasks together and get all results?',
            a: `Use **\`Task.WhenAll\`**:
\`\`\`csharp
Task<User> userTask = GetUserAsync(id);
Task<Orders> ordersTask = GetOrdersAsync(id);

await Task.WhenAll(userTask, ordersTask);

User user = await userTask;
Orders orders = await ordersTask;
\`\`\`
If any task throws an exception, \`Task.WhenAll\` captures all exceptions into an \`AggregateException\`.`
          },
          {
            q: 'What is the Parallel library?',
            a: `**TPL (Task Parallel Library)** / \`Parallel.For\` & \`Parallel.ForEach\`:
• Designed for **CPU-bound parallelism** (multi-core computation).
• Automatically partitions work across available CPU cores using the thread pool.
• Not suitable for asynchronous I/O operations (use \`Task.WhenAll\` instead).`
          },
          {
            q: 'What is a `CancellationToken`?',
            a: `A cooperative mechanism used to signal task cancellation across threads:
• \`CancellationTokenSource (CTS)\`: The controller that triggers cancellation (\`cts.Cancel()\`, \`cts.CancelAfter(5000)\`).
• \`CancellationToken (CT)\`: The token passed to async methods, checked via \`token.ThrowIfCancellationRequested()\` or passed directly to async APIs.`
          }
        ]
      }
    ]
  },
  {
    id: 'aspnet-core',
    title: 'ASP.NET Core & Web API',
    icon: 'Server',
    summary: 'Request lifecycle, middleware pipeline, dependency injection lifetimes, REST API design, security, and enterprise configuration.',
    topics: [
      {
        name: 'Architecture & Pipeline',
        questions: [
          {
            q: 'Explain the ASP.NET Core request lifecycle.',
            a: `1. **Web Server (Kestrel / IIS Reverse Proxy)** receives the raw HTTP TCP connection and parses HTTP headers.
2. **HttpContext** is constructed with Request, Response, User Claims, and ServiceProvider.
3. **Middleware Pipeline**: Request passes sequentially through registered middleware components (Authentication, Routing, CORS, Custom Middleware).
4. **Endpoint Routing & Filter Pipeline**: Endpoint selected -> Authorization Filter -> Resource Filter -> Model Binding & Action Filter -> Controller Action Execution -> Result Filter.
5. **Response Pipeline**: Returns back up through the middleware stack in reverse order.`
          },
          {
            q: 'What is ASP.NET Core middleware, and what is the difference between `app.Use` and `app.Run`?',
            a: `**Middleware** is software assembled into an application pipeline to handle requests and responses.
• **\`app.Use\`**: Can execute code before and after the next middleware and calls \`await next()\` to pass control down the pipeline.
• **\`app.Run\`**: A terminal middleware that handles the request and **terminates** the pipeline without calling \`next()\` (nothing after it executes).`
          },
          {
            q: 'How do you write custom middleware for global exception handling?',
            a: `\`\`\`csharp
public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try {
            await _next(context);
        } catch (Exception ex) {
            _logger.LogError(ex, "Unhandled exception occurred");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await context.Response.WriteAsJsonAsync(new { Error = "Internal Server Error", Message = ex.Message });
        }
    }
}
\`\`\``
          }
        ]
      },
      {
        name: 'Dependency Injection',
        questions: [
          {
            q: 'What is DI, and why is it used?',
            a: `**Dependency Injection (DI)** is a software design pattern that implements Inversion of Control (IoC), passing dependencies (services) to a class rather than the class creating them directly.
• **Benefits**: Decouples classes, simplifies unit testing with mocks, manages object lifecycles centrally, and adheres to the SOLID Dependency Inversion Principle.`
          },
          {
            q: 'Explain service lifetimes (`AddTransient`, `AddScoped`, `AddSingleton`).',
            a: `• **\`AddTransient\`**: A new instance is created **every time** it is requested. Lightweight and stateless.
• **\`AddScoped\`**: Created **once per HTTP request** (connection scope). Shared across all components processing that specific request.
• **\`AddSingleton\`**: Created **once on first request** and lives for the entire application lifetime across all requests.`
          },
          {
            q: 'What happens when a Singleton service depends on a Scoped service?',
            a: `**Captive Dependency Bug**: The Scoped service gets captured by the Singleton and effectively becomes a Singleton. This leads to concurrency race conditions and prevents proper disposal.
• In ASP.NET Core dev mode, \`ValidateScopes = true\` throws an \`InvalidOperationException\` at startup.`
          },
          {
            q: 'Can you register the same interface with a different service lifetime or multiple implementations?',
            a: `Yes. Calling \`services.AddScoped<IService, ServiceA>()\` and \`services.AddScoped<IService, ServiceB>()\` registers both. Injecting \`IEnumerable<IService>\` injects all registered instances in order.`
          }
        ]
      },
      {
        name: 'API Design & Routing',
        questions: [
          {
            q: 'What is a REST API?',
            a: `**Representational State Transfer (REST)** is an architectural style based on:
• Client-Server separation
• Stateless requests (each request contains all info needed)
• Cacheable responses
• Uniform Interface (Resource URIs, standard HTTP verbs, JSON/XML payloads)
• Layered System`
          },
          {
            q: 'Explain HTTP methods (GET, POST, PUT, PATCH, DELETE) and common status codes.',
            a: `• **Methods**:
  - \`GET\`: Safe, idempotent. Retrieve resource. (200 OK, 404 Not Found)
  - \`POST\`: Not idempotent. Create resource. (201 Created with \`Location\` header)
  - \`PUT\`: Idempotent. Complete replacement of resource. (200 OK / 204 No Content)
  - \`PATCH\`: Partial update of specific fields. (200 OK)
  - \`DELETE\`: Idempotent. Delete resource. (204 No Content)
• **Key Status Codes**:
  - \`2xx\`: Success (\`200\`, \`201\`, \`204\`)
  - \`3xx\`: Redirection (\`301\`, \`302\`, \`304\`)
  - \`4xx\`: Client Error (\`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`, \`409 Conflict\`, \`429 Too Many Requests\`)
  - \`5xx\`: Server Error (\`500 Internal Server Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\`)`
          },
          {
            q: 'What is the difference between PUT and PATCH?',
            a: `• **PUT**: Replaces the **entire** entity. Any omitted properties are reset to default/null.
• **PATCH**: Applies a **partial update** modifying only specified fields (e.g. using JSON Patch RFC 6902 or DTO mapping).`
          },
          {
            q: 'What is the difference between Minimal APIs and Controllers?',
            a: `• **Controllers**: Structured, attribute-heavy MVC pattern with filter pipelines and model binders. Great for large monolithic APIs.
• **Minimal APIs (.NET 6+)**: Lightweight, lambda-based endpoint declarations directly in \`Program.cs\`. Zero reflection overhead, faster cold starts, ideal for microservices and cloud functions.`
          },
          {
            q: 'What is API versioning, and how do you implement it?',
            a: `Techniques to evolve APIs without breaking existing consumers:
1. **URI Path**: \`/api/v1/orders\`
2. **Query String**: \`/api/orders?api-version=2.0\`
3. **HTTP Header**: \`X-Version: 2.0\`
4. **Accept / Media Type**: \`Accept: application/json;v=2.0\`
Implemented via \`Asp.Versioning.Http\` NuGet package.`
          }
        ]
      },
      {
        name: 'Security & Configuration',
        questions: [
          {
            q: 'How do you handle authentication vs authorization?',
            a: `• **Authentication (AuthN)**: Who are you? (Validating credentials, JWT signature, cookies). Handled by \`app.UseAuthentication()\`.
• **Authorization (AuthZ)**: What are you allowed to do? (Checking roles, scopes, claims, policies). Handled by \`app.UseAuthorization()\` and \`[Authorize(Roles = "Admin")]\` or custom policy requirements.`
          },
          {
            q: 'What is JWT, and how is it used?',
            a: `**JSON Web Token (JWT)** is a compact URL-safe token with 3 parts:
\`Header.Payload.Signature\`
• Base64Url-encoded payload containing claims (\`sub\`, \`role\`, \`exp\`).
• Signed with HMAC-SHA256 or RSA private key.
• Client sends it in the \`Authorization: Bearer <token>\` header for stateless validation on API servers.`
          },
          {
            q: 'How do you enable CORS in ASP.NET Core?',
            a: `\`\`\`csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowClientApp", policy => {
        policy.WithOrigins("https://myfrontend.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("AllowClientApp");
\`\`\``
          }
        ]
      }
    ]
  },
  {
    id: 'linq-efcore',
    title: 'LINQ & Entity Framework Core',
    icon: 'Database',
    summary: 'Deferred execution mechanics, query evaluation, join patterns, EF Core DbContext tracking, Expression Trees, and SQL translation.',
    topics: [
      {
        name: 'LINQ Fundamentals',
        questions: [
          {
            q: 'What is LINQ?',
            a: `**Language Integrated Query (LINQ)** adds native querying capabilities to .NET languages with compile-time type checking, IntelliSense, and unified syntax across in-memory collections (\`IEnumerable\`), databases (\`IQueryable\` / EF Core), and XML.`
          },
          {
            q: 'Explain deferred execution vs immediate execution in LINQ.',
            a: `• **Deferred Execution**: The query is NOT executed when defined; it is evaluated when enumerated (e.g. in a \`foreach\` loop or by passing to another operator). Examples: \`Where()\`, \`Select()\`, \`OrderBy()\`.
• **Immediate Execution**: Forces immediate evaluation and produces results in memory. Examples: \`ToList()\`, \`ToArray()\`, \`Count()\`, \`First()\`, \`Sum()\`.`
          },
          {
            q: 'Why does calling `ToList()` change behavior and potentially cause performance problems?',
            a: `Calling \`ToList()\` on an \`IQueryable\` forces EF Core to send the SQL query to the database immediately and load all records into RAM. Any subsequent LINQ queries execute in memory on the application server rather than as optimized SQL on the database engine.`
          }
        ]
      },
      {
        name: 'Filtering, Projection & Evaluation',
        questions: [
          {
            q: '`Where()` vs `Select()`?',
            a: `• **\`Where()\`**: Filters elements matching a boolean predicate without altering element types.
• **\`Select()\`**: Projects/transforms each element into a new shape or type.`
          },
          {
            q: '`Select()` vs `SelectMany()`?',
            a: `• **\`Select()\`**: Maps 1 input element to 1 output element (returns \`IEnumerable<T>\`).
• **\`SelectMany()\`**: Flattens one-to-many collections (e.g. extracts all order items across all customers into a single flat list).`
          },
          {
            q: '`Any()` vs `Count() > 0`?',
            a: `• **\`Any()\`**: Returns \`true\` on finding the very first match (translates to \`EXISTS(SELECT 1 ...)\` in SQL). Much faster.
• **\`Count() > 0\`**: Enumerates the entire table/collection to count all rows before comparing.`
          },
          {
            q: '`Any()` vs `All()` vs `Contains()`?',
            a: `• **\`Any(predicate)\`**: True if at least one element satisfies the condition.
• **\`All(predicate)\`**: True if EVERY element satisfies the condition.
• **\`Contains(value)\`**: True if the collection contains the specified element.`
          }
        ]
      },
      {
        name: 'Data Retrieval & Grouping',
        questions: [
          {
            q: '`First()` vs `FirstOrDefault()` vs `Single()` vs `SingleOrDefault()`?',
            a: `• **\`First()\`**: Returns first element; throws exception if empty.
• **\`FirstOrDefault()\`**: Returns first element or default (null/0) if empty.
• **\`Single()\`**: Returns single element; throws if empty OR if more than 1 element exists.
• **\`SingleOrDefault()\`**: Returns element or default if empty; throws if more than 1 element exists.`
          },
          {
            q: 'How does `GroupBy()` work (e.g., find the highest-paid employee per department)?',
            a: `\`\`\`csharp
var topEarners = employees
    .GroupBy(e => e.DepartmentId)
    .Select(g => new {
        DepartmentId = g.Key,
        HighestPaid = g.OrderByDescending(e => e.Salary).First()
    })
    .ToList();
\`\`\``
          }
        ]
      },
      {
        name: 'Joining & Sorting',
        questions: [
          {
            q: '`Join()` vs `GroupJoin()` and how to implement a LEFT JOIN in LINQ?',
            a: `• **\`Join()\`**: Inner join between two sequences.
• **\`GroupJoin()\`**: Hierarchical join (outer sequence joined with matching group).
• **LEFT JOIN in LINQ**:
\`\`\`csharp
var leftJoin = from c in db.Customers
               join o in db.Orders on c.Id equals o.CustomerId into orderGroup
               from ord in orderGroup.DefaultIfEmpty()
               select new { c.Name, OrderDate = ord != null ? ord.Date : null };
\`\`\``
          },
          {
            q: '`OrderBy()` vs `ThenBy()`?',
            a: `• **\`OrderBy()\`**: Primary sorting criteria.
• **\`ThenBy()\`**: Secondary sorting applied within already-sorted duplicate subsets.`
          }
        ]
      },
      {
        name: 'Entity Framework Core',
        questions: [
          {
            q: 'What is EF Core, `DbContext`, and `DbSet`?',
            a: `• **EF Core**: Microsoft's lightweight, extensible Object-Relational Mapper (ORM).
• **\`DbContext\`**: Manages database connections, tracks entity changes, coordinates Unit of Work, and commits changes via \`SaveChangesAsync()\`.
• **\`DbSet<T>\`**: Represents a database table and allows querying and CRUD operations for type \`T\`.`
          },
          {
            q: 'What is the difference between `AsNoTracking()` and tracking in EF Core?',
            a: `• **Tracking (Default)**: EF Core stores snapshot copies in the Change Tracker. When \`SaveChangesAsync()\` is called, changes are detected and updated.
• **\`AsNoTracking()\`**: Disables the Change Tracker. Significantly reduces memory overhead and CPU time for read-only query APIs.`
          },
          {
            q: 'How does LINQ translate to SQL via Expression Trees?',
            a: `\`IQueryable<T>\` receives LINQ queries as an **Expression Tree** (AST representation of the code). The EF Core Database Provider parses the nodes of the Expression Tree and translates them into parameterized SQL for the target engine (SQL Server, PostgreSQL, etc.).`
          },
          {
            q: 'Write code for soft delete in EF Core.',
            a: `\`\`\`csharp
// 1. Entity configuration with Query Filter
public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder) {
    modelBuilder.Entity<Product>().HasQueryFilter(p => !p.IsDeleted);
}

// 2. Intercept SaveChanges to mark soft delete
public override Task<int> SaveChangesAsync(CancellationToken ct = default) {
    foreach (var entry in ChangeTracker.Entries<Product>()) {
        if (entry.State == EntityState.Deleted) {
            entry.State = EntityState.Modified;
            entry.Entity.IsDeleted = true;
        }
    }
    return base.SaveChangesAsync(ct);
}
\`\`\``
          }
        ]
      }
    ]
  },
  {
    id: 'microservices-system-design',
    title: 'Microservices & System Design',
    icon: 'Network',
    summary: 'Monolith decomposition, DDD, Saga pattern, distributed transactions, resilience patterns, API gateways, and real-world scenario architecture.',
    topics: [
      {
        name: 'Architecture',
        questions: [
          {
            q: 'Monolith vs Microservices—what are the differences, and how do you decide between them?',
            a: `• **Monolith**: Single deployable unit, shared database, simple debugging and deployment. Trade-offs: tight coupling, single point of failure, scaling challenges.
• **Microservices**: Independently deployable services per bounded context with independent databases. Trade-offs: distributed network latency, eventual consistency, observability complexity.
• **Decision Matrix**: Start with a modular monolith. Move to microservices when domain boundaries are mature, teams are large and decoupled, or distinct services have vastly different scaling requirements.`
          },
          {
            q: 'What is Domain-Driven Design (DDD), bounded context, and ubiquitous language?',
            a: `• **DDD**: An approach to software development that centers architecture on business domain logic.
• **Ubiquitous Language**: A shared, unambiguous language used by domain experts and developers within code, tests, and conversations.
• **Bounded Context**: An explicit boundary within which a domain model and its ubiquitous language applies (e.g. \`User\` in Identity Context vs \`Customer\` in Billing Context).`
          },
          {
            q: 'Layered architecture vs Clean architecture?',
            a: `• **Layered (3-Tier)**: Presentation -> Business Logic -> Data Access. The database is the center of the dependency chain.
• **Clean / Onion / Hexagonal Architecture**: Domain Entities at the center. Business use cases depend on domain interfaces; Infrastructure (DB, APIs, UI) are external plugins adhering to Dependency Inversion.`
          }
        ]
      },
      {
        name: 'Communication & Distributed Systems',
        questions: [
          {
            q: 'How do microservices communicate?',
            a: `1. **Synchronous**: REST HTTP/JSON, gRPC (Protocol Buffers binary over HTTP/2 for high-throughput internal RPCs).
2. **Asynchronous / Event-Driven**: Message brokers (Kafka, RabbitMQ, Azure Service Bus) using pub/sub for eventual consistency.`
          },
          {
            q: 'How do you handle transactions across microservices (Saga patterns)?',
            a: `Distributed transactions cannot use 2PC due to blocking. Instead, use the **Saga Pattern**:
• A sequence of local transactions where each updates its database and publishes an event.
• If a step fails, the Saga executes **Compensating Transactions** (e.g. refunding credit card).
• Two implementations:
  1. **Choreography**: Services listen to events and coordinate autonomously.
  2. **Orchestration**: A central Saga orchestrator instructs services what local transaction to execute next.`
          },
          {
            q: 'How do you prevent duplicate processing in message consumers?',
            a: `**Idempotency & Outbox Pattern**:
• Use an Idempotency Key (e.g., \`transaction_id\`).
• Check a deduplication table before processing.
• Implement the **Transactional Outbox Pattern**: Store the outgoing domain event in an \`Outbox\` database table inside the same ACID transaction as the business entity, then publish asynchronously via Debezium/Worker.`
          }
        ]
      },
      {
        name: 'Design Patterns & Principles',
        questions: [
          {
            q: 'Explain and provide practical examples for Singleton, Factory, and Repository patterns.',
            a: `• **Singleton**: Ensures only one instance exists with global access (e.g. \`HttpClient\`, \`Configuration\`).
• **Factory**: Creates objects without exposing instantiation logic to the client (e.g. \`DbConnectionFactory.Create("Sql")\`).
• **Repository**: Mediates between domain logic and data mapping layers with collection-like interfaces.`
          },
          {
            q: 'Explain the Liskov Substitution Principle (LSP) and KISS principle.',
            a: `• **LSP (L in SOLID)**: Objects of a superclass should be replaceable with objects of its subclasses without breaking application correctness (classic violation: Square inheriting from Rectangle).
• **KISS (Keep It Simple, Stupid)**: Most systems work best if they are kept simple rather than made complicated; avoid premature over-engineering.`
          }
        ]
      },
      {
        name: 'Scenario-Based System Design',
        questions: [
          {
            q: 'BookMyShow Scenario: How do you prevent multiple users from booking seat A12 at the same time?',
            a: `1. **Distributed Lock in Redis**: When a user clicks Seat A12, acquire a Redis key \`SET lock:seat:A12 user123 NX PX 600000\` (10-minute hold).
2. **Optimistic Concurrency Control in DB**: Add a \`Version\` column.
   \`UPDATE Seats SET Status = 'Booked', Version = Version + 1 WHERE SeatId = 'A12' AND Status = 'Reserved' AND Version = @currentVersion;\`
3. If rows affected == 0, another user succeeded; return conflict error.`
          },
          {
            q: 'Design a chat application for 1 million users to load chat history quickly.',
            a: `• Use **WebSockets** for active live messaging.
• Store message history in **Apache Cassandra** or **ScyllaDB** partitioned by \`(room_id, bucket_month)\` and clustered by \`message_id (TimeUUID DESC)\` for sub-millisecond reverse-chronological pagination.
• Cache latest 50 messages per room in Redis.`
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-azure',
    title: 'Cloud (Azure) & Integration',
    icon: 'Cloud',
    summary: 'Serverless Azure Functions, Logic Apps, Service Bus messaging, Dead Letter Queues, Key Vault, and API Management.',
    topics: [
      {
        name: 'Azure Functions & Logic Apps',
        questions: [
          {
            q: 'What is the difference between an Event Grid trigger and an Http trigger?',
            a: `• **HTTP Trigger**: Synchronous invocation directly called via HTTP requests.
• **Event Grid Trigger**: Event-driven reactive push model for cloud events (e.g., Blob created, VM stopped) with built-in retry policies and filtering.`
          },
          {
            q: 'What are Cold Starts in Azure Functions, and how do you minimize them?',
            a: `• **Cold Start**: Latency incurred when starting a new serverless container instance after idle periods.
• **Mitigations**: Use Premium Plan (Pre-warmed instances), enable \`Always On\`, trim startup dependencies, or use Native AOT compilation in .NET 8+.`
          }
        ]
      },
      {
        name: 'Azure Service Bus',
        questions: [
          {
            q: 'Azure Service Bus vs Azure Storage Queues?',
            a: `• **Storage Queues**: Simple, cheap FIFO queuing up to 64 KB messages; no pub/sub, no transaction support.
• **Service Bus**: Enterprise-grade messaging supporting Topics & Subscriptions (Pub/Sub), sessions for ordered processing, dead-letter queues, message deduplication, and transactions.`
          },
          {
            q: 'What is a DLQ (Dead-Letter Queue), and how do you process/recover messages from it?',
            a: `• **DLQ**: A secondary queue holding messages that cannot be processed after reaching \`MaxDeliveryCount\` (poison messages) or expiring via TTL.
• **Recovery Strategy**: Monitor DLQ count via Azure Monitor alert -> Run repair worker that inspects dead-letter reason -> Fix payload schema or downstream dependency -> Replay message back to main queue.`
          }
        ]
      },
      {
        name: 'Security, Monitoring & APIM',
        questions: [
          {
            q: 'Managed Identity vs Client ID/Secret in Key Vault—how do you choose?',
            a: `Always prefer **Managed Identity** (System-Assigned or User-Assigned) because it eliminates embedded secrets in code or config. Azure handles credential rotation automatically via Microsoft Entra ID.`
          },
          {
            q: 'How do you handle API throttling/rate-limiting in Azure API Management (APIM)?',
            a: `Use the \`<rate-limit-by-key>\` inbound policy:
\`\`\`xml
<rate-limit-by-key calls="100" renewal-period="60"
    counter-key="@(context.Subscription?.Id ?? context.Request.IpAddress)" />
\`\`\``
          }
        ]
      }
    ]
  },
  {
    id: 'sql-databases',
    title: 'SQL & Databases',
    icon: 'HardDrive',
    summary: 'Query optimization, indexing strategies, CTEs, ACID guarantees, transaction isolation levels, and Cosmos DB partitioning.',
    topics: [
      {
        name: 'Querying & Optimization',
        questions: [
          {
            q: 'How do you write a query to find the Nth highest salary?',
            a: `\`\`\`sql
-- Using DENSE_RANK() Window Function
WITH RankedSalaries AS (
    SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS RankNum
    FROM Employees
)
SELECT Salary FROM RankedSalaries WHERE RankNum = @N;

-- Alternative using OFFSET / FETCH
SELECT DISTINCT Salary
FROM Employees
ORDER BY Salary DESC
OFFSET (@N - 1) ROWS FETCH NEXT 1 ROWS ONLY;
\`\`\``
          },
          {
            q: 'How do you optimize an API fetching 1 million records?',
            a: `1. **Pagination (Keyset/Cursor pagination)**: \`WHERE Id > @lastSeenId ORDER BY Id ASC LIMIT 50\`. Avoid deep \`OFFSET\`.
2. **Projection**: Select only needed columns (never \`SELECT *\`).
3. **Covering Indexes**: Create composite indexes covering all queried and selected columns.
4. **Streaming / \`IAsyncEnumerable\`**: Stream results chunk-by-chunk to HTTP client without buffering all rows in server RAM.`
          }
        ]
      },
      {
        name: 'Indexes & Constraints',
        questions: [
          {
            q: 'Clustered vs Non-Clustered Index—when to use each?',
            a: `• **Clustered Index (1 per table)**: Dictates the physical storage order of data rows on disk (leaf nodes contain actual data). Best for Primary Keys and range queries (\`BETWEEN\`, \`ORDER BY\`).
• **Non-Clustered Index (Multiple allowed)**: Separate B-tree structure holding indexed column keys and pointers (Row ID or Clustered Key) to data rows. Best for frequent filter lookups.`
          }
        ]
      },
      {
        name: 'Advanced SQL Concepts',
        questions: [
          {
            q: 'Difference between WHERE and HAVING?',
            a: `• **\`WHERE\`**: Filters individual rows **before** aggregation and grouping. Cannot use aggregate functions.
• **\`HAVING\`**: Filters aggregated group results **after** \`GROUP BY\` (e.g. \`HAVING COUNT(*) > 5\`).`
          },
          {
            q: 'What is a CTE (Common Table Expression), and how does it differ from a Subquery?',
            a: `• **CTE (\`WITH ... AS\`\)**: A named temporary result set defined within the execution scope of a single query. Improves readability, can be referenced multiple times, and supports **recursion** (e.g. traversing org charts).`
          }
        ]
      },
      {
        name: 'Transactions & NoSQL',
        questions: [
          {
            q: 'Explain transaction isolation levels and ACID properties.',
            a: `• **ACID**: Atomicity (all or nothing), Consistency (schema integrity), Isolation (concurrency control), Durability (persisted on disk).
• **Isolation Levels**:
  1. \`Read Uncommitted\` (vulnerable to Dirty Reads)
  2. \`Read Committed\` (prevents Dirty Reads)
  3. \`Repeatable Read\` (prevents Non-Repeatable Reads)
  4. \`Serializable\` (prevents Phantom Reads, maximum locking)
  5. \`Snapshot\` (uses row versioning in tempdb for non-blocking reads).`
          },
          {
            q: 'Cosmos DB: Why use it, which partition key to choose, and what are its trade-offs?',
            a: `• **Why**: Globally distributed, multi-model NoSQL with single-digit millisecond latency SLAs and 5 consistency levels.
• **Partition Key Selection**: Must have high cardinality and evenly distributed request volume across partitions (e.g., \`userId\` or \`tenantId\`, never low cardinality like \`country\`).
• **Trade-offs**: Cross-partition queries are expensive in Request Units (RUs); no cross-partition ACID transactions.`
          }
        ]
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend (Angular & React)',
    icon: 'Monitor',
    summary: 'Angular Signals, standalone components, NgRx flow, React Hooks, performance optimization, and debounce search patterns.',
    topics: [
      {
        name: 'Angular',
        questions: [
          {
            q: 'What are Signals in Angular?',
            a: `**Signals (Angular 16+)** provide reactive state management with fine-grained tracking. When a signal value changes, Angular updates only the specific DOM nodes that depend on it, bypassing Zone.js change detection.`
          },
          {
            q: 'What are standalone components?',
            a: `Components that do not need to be declared in an \`@NgModule\`. They import their own dependencies directly in \`imports: [CommonModule, HttpClientModule]\`, simplifying the module structure.`
          },
          {
            q: 'Explain Angular/NgRx flow.',
            a: `1. **Component** dispatches an **Action**.
2. **Effects** listen for actions, execute async API calls, and dispatch success/failure actions.
3. **Reducers** are pure functions taking current State + Action and returning a new immutable State.
4. **Selectors** query state slices for components via RxJS observables.`
          }
        ]
      },
      {
        name: 'React',
        questions: [
          {
            q: '`useMemo` vs `useCallback` vs `useState` vs `useEffect`?',
            a: `• **\`useState\`**: Declares reactive state variable and updater function.
• **\`useEffect\`**: Synchronizes component with external systems (API fetching, subscriptions).
• **\`useMemo\`**: Caches the **calculated value** of an expensive computation between re-renders.
• **\`useCallback\`**: Caches a **function definition** between re-renders to prevent child component re-renders.`
          },
          {
            q: 'Scenario: Build a search component that waits 400ms after typing stops before calling an API, handles aborting older slow requests.',
            a: `\`\`\`jsx
import { useState, useEffect } from 'react';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
          signal: controller.signal
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort(); // Cancel pending fetch if user types again
    };
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      {loading && <p>Loading...</p>}
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}
\`\`\``
          }
        ]
      }
    ]
  },
  {
    id: 'dsa-problems',
    title: 'Data Structures & Problem Solving',
    icon: 'Cpu',
    summary: 'String manipulation, array algorithms, two pointers, sliding window, and logistics interview challenges.',
    topics: [
      {
        name: 'Strings',
        questions: [
          {
            q: 'Find first non-repeating character in a string.',
            a: `\`\`\`csharp
public static char? FirstUniqChar(string s) {
    Dictionary<char, int> counts = new();
    foreach (char c in s) counts[c] = counts.GetValueOrDefault(c) + 1;
    foreach (char c in s) {
        if (counts[c] == 1) return c;
    }
    return null;
}
\`\`\`
Time: O(n), Space: O(1) (bounded by alphabet size).`
          },
          {
            q: 'Longest Substring Without Repeating Characters.',
            a: `\`\`\`csharp
public static int LengthOfLongestSubstring(string s) {
    Dictionary<char, int> charMap = new();
    int maxLength = 0, left = 0;
    for (int right = 0; right < s.Length; right++) {
        if (charMap.ContainsKey(s[right])) {
            left = Math.Max(left, charMap[s[right]] + 1);
        }
        charMap[s[right]] = right;
        maxLength = Math.Max(maxLength, right - left + 1);
    }
    return maxLength;
}
\`\`\`
Time: O(n), Space: O(min(n, alphabet)).`
          },
          {
            q: 'Format a string (e.g., input 1235469875 to 12XX46XX75).',
            a: `\`\`\`csharp
public static string MaskString(string input) {
    // Replaces indices 2-3 and 6-7 with 'XX'
    if (input.Length < 10) return input;
    char[] arr = input.ToCharArray();
    arr[2] = 'X'; arr[3] = 'X';
    arr[6] = 'X'; arr[7] = 'X';
    return new string(arr);
}
\`\`\``
          }
        ]
      },
      {
        name: 'Arrays & Numbers',
        questions: [
          {
            q: 'Sort an array with 3 unique values: 0, 1, 2 (Dutch National Flag).',
            a: `\`\`\`csharp
public static void SortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.Length - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            (nums[low], nums[mid]) = (nums[mid], nums[low]);
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            (nums[mid], nums[high]) = (nums[high], nums[mid]);
            high--;
        }
    }
}
\`\`\`
Time: O(n) in a single pass, Space: O(1).`
          },
          {
            q: 'Move zeroes to the end while maintaining relative order of non-zero elements.',
            a: `\`\`\`csharp
public static void MoveZeroes(int[] nums) {
    int insertPos = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (nums[i] != 0) {
            (nums[insertPos], nums[i]) = (nums[i], nums[insertPos]);
            insertPos++;
        }
    }
}
\`\`\`
Time: O(n), Space: O(1).`
          }
        ]
      },
      {
        name: 'Algorithms & Logistics Challenge',
        questions: [
          {
            q: 'Logistics Challenge: Given unsorted logs from 3 highway sensors (ENTRY, MAINROAD, EXIT) with license plates and timestamps, determine how many complete highway journeys each vehicle made.',
            a: `**Problem Analysis**: A complete journey requires a vehicle to trigger \`ENTRY\` -> \`MAINROAD\` -> \`EXIT\` in chronological order (\`t_entry < t_main < t_exit\`).

\`\`\`csharp
public class SensorLog {
    public string Plate { get; set; }
    public string SensorType { get; set; } // "ENTRY", "MAINROAD", "EXIT"
    public DateTime Timestamp { get; set; }
}

public static Dictionary<string, int> CountCompletedJourneys(List<SensorLog> logs) {
    // Sort all logs chronologically
    var sortedLogs = logs.OrderBy(l => l.Timestamp).ToList();
    
    // Track state machine per vehicle: 0 = None, 1 = Entered, 2 = On Mainroad
    Dictionary<string, int> vehicleState = new();
    Dictionary<string, int> journeyCounts = new();

    foreach (var log in sortedLogs) {
        if (!journeyCounts.ContainsKey(log.Plate)) {
            journeyCounts[log.Plate] = 0;
            vehicleState[log.Plate] = 0;
        }

        int state = vehicleState[log.Plate];

        if (log.SensorType == "ENTRY") {
            vehicleState[log.Plate] = 1; // Start journey
        } else if (log.SensorType == "MAINROAD" && state == 1) {
            vehicleState[log.Plate] = 2; // Verified mid-point
        } else if (log.SensorType == "EXIT" && state == 2) {
            journeyCounts[log.Plate]++;  // Completed journey!
            vehicleState[log.Plate] = 0; // Reset for next journey
        }
    }

    return journeyCounts;
}
\`\`\`
Time Complexity: O(N log N) for sorting + O(N) scan. Space Complexity: O(U) where U is number of unique license plates.`
          }
        ]
      }
    ]
  }
];
