export const CURRICULUM_DATA = [
  // =========================================================================
  // 1. C# AND .NET FUNDAMENTALS
  // =========================================================================
  {
    id: 'csharp-dotnet',
    title: 'C# & .NET Fundamentals',
    icon: 'Terminal',
    summary: 'Core runtime architecture, CLR/CTS/CLS, memory management, OOP, keywords, delegates, and asynchronous concurrency.',
    topics: [
      {
        name: 'The .NET Ecosystem',
        questions: [
          {
            q: 'What is .NET, and what are its key features?',
            short: ".NET is Microsoft's free, open-source, cross-platform platform for building any kind of app in C#, F#, or VB.NET.",
            parts: [
              { q: "What is .NET?", a: "A developer platform (runtime + base class library + SDK) that runs web, cloud, desktop, mobile, IoT and AI apps." },
              { q: "What are its key features?", a: "Cross-platform, high performance, a rich unified BCL, automatic garbage collection, and multi-language support via CIL." }
            ],
            a: `**.NET** is an open-source, cross-platform developer platform created by Microsoft for building web, cloud, desktop, mobile, IoT, AI, and gaming applications.

**Key Features:**
• **Cross-Platform**: Native execution on Windows, Linux, and macOS.
• **High Performance**: Industry-leading throughput with Kestrel, RyuJIT, Span<T>, and hardware intrinsics.
• **Unified Base Class Library (BCL)**: Comprehensive standard library for collections, threading, I/O, cryptography, and networking.
• **Automatic Memory Management**: Generational Garbage Collector (GC).
• **Multi-Language Support**: C#, F#, and VB.NET compile to Common Intermediate Language (CIL).`
          },
          {
            q: 'Explain the .NET architecture (CLR, CTS, CLS) and JIT compilation.',
            short: "Code compiles to CIL; the CLR runs it, the CTS/CLS make types interoperable across languages, and the JIT turns CIL into native code at runtime.",
            parts: [
              { q: "What is the CLR?", a: "The runtime VM that handles memory, GC, threading, exceptions, and security." },
              { q: "What is the CTS?", a: "The shared type system that lets a type defined in one .NET language be used in another." },
              { q: "What is the CLS?", a: "The subset of CTS rules compilers follow so libraries are usable from every .NET language." },
              { q: "What is JIT compilation?", a: "Just-In-Time compilation of CIL to CPU-specific machine code at runtime, with tiered JIT for fast startup then optimized hot paths." }
            ],
            a: `• **CLR (Common Language Runtime)**: The execution virtual machine that manages memory allocation, garbage collection, thread scheduling, exception handling, and code security.
• **CTS (Common Type System)**: The standardized type specification ensuring types defined in one language (e.g., C#) can be used seamlessly in another (e.g., F#).
• **CLS (Common Language Specification)**: A subset of CTS rules that language compilers must follow for cross-language interoperability (e.g. no case-sensitive-only member names).
• **JIT (Just-In-Time) Compilation**: C# source code compiles to CIL in assembly files (.dll). At runtime, the JIT compiler converts CIL into CPU-specific native machine instructions. Tiered JIT enables Tier 0 (fast startup) and Tier 1 (deeply optimized hot loops).`
          },
          {
            q: 'What is the difference between .NET Framework and .NET Core/.NET 5+?',
            short: ".NET Framework is the legacy Windows-only runtime; .NET Core / .NET 5+ is the modern, open-source, cross-platform successor.",
            a: `• **.NET Framework (1.0–4.8.1)**: Legacy Windows-only, monolithic framework tightly coupled with IIS and the Windows registry. Receives security fixes only.
• **.NET Core (1.0–3.1)**: Re-architected as open-source, modular, lightweight, side-by-side deployable, and cross-platform.
• **.NET 5, 6, 7, 8, 9+**: The modern unified .NET platform combining .NET Core, Xamarin, and Mono into a single SDK with annual release cycles (even numbers are LTS).`
          }
        ]
      },
      {
        name: 'Types & Variables',
        questions: [
          {
            q: 'What is the difference between value types and reference types?',
            short: "Value types hold their data directly and are copied on assignment; reference types hold a pointer to a heap object and copy only the reference.",
            a: `• **Value Types** (\`struct\`, \`enum\`, primitives like \`int\`, \`bool\`, \`double\`, \`DateTime\`):
  - Directly contain their data.
  - Allocated on the thread stack or inline within enclosing objects on the heap.
  - Copied by value upon assignment.
• **Reference Types** (\`class\`, \`interface\`, \`delegate\`, \`string\`, \`object\`, \`array\`):
  - Store a pointer/reference to memory allocated on the managed heap.
  - Assignment copies only the reference pointer, not the underlying object.
  - Reclaimed asynchronously by the Garbage Collector.`
          },
          {
            q: 'Explain `var` vs `dynamic` vs `object`.',
            short: "`var` is compile-time inferred and strongly typed, `dynamic` is resolved at runtime, and `object` is the base type that needs casting.",
            parts: [
              { q: "What is `var`?", a: "Compiler-inferred static type; no runtime cost." },
              { q: "What is `dynamic`?", a: "Skips compile-time checks; members are bound at runtime via the DLR." },
              { q: "What is `object`?", a: "The root of all types; you must cast to use members, and value types get boxed." }
            ],
            a: `• **\`var\`**: Strongly typed at **compile time**. The compiler infers the type from the right-hand assignment. Zero runtime overhead, full IntelliSense.
• **\`dynamic\`**: Type resolution is bypassed at compile time and resolved at **runtime** using the DLR (Dynamic Language Runtime). Useful for COM interop, Python scripting, and dynamic JSON.
• **\`object\`**: The root base class for all .NET types. Requires explicit casting/pattern matching to access members; causes boxing for value types.`
          },
          {
            q: 'What is boxing and unboxing?',
            short: "Boxing wraps a value type in a heap-allocated `object`; unboxing casts it back. Both cost allocations and GC pressure.",
            a: `• **Boxing**: The implicit conversion of a value type into an \`object\` or interface reference. Allocates a new object on the managed heap and copies the value.
• **Unboxing**: The explicit conversion of an boxed object back into a value type. Requires runtime type verification and extracts value from heap.
• **Performance Impact**: Frequent boxing/unboxing causes heap allocations and triggers GC collections. Generics (\`List<T>\`) avoid boxing.`
          },
          {
            q: 'Explain nullable types (e.g., `int` vs `int?`).',
            short: "`int?` is `Nullable<int>`, a struct that lets a value type also be null; C# 8 nullable reference types add compile-time null warnings.",
            a: `• **Nullable Value Types (\`Nullable<T>\` / \`int?\`)**: A struct wrapper around a value type containing \`bool HasValue\` and \`T Value\`. Allows value types to represent \`null\` (e.g. database NULL columns).
• **Nullable Reference Types (C# 8+)**: Static compiler analysis annotations (\`string?\` vs \`string\`) to catch \`NullReferenceException\` at compile time without runtime overhead.`
          }
        ]
      },
      {
        name: 'OOP & Classes',
        questions: [
          {
            q: 'Explain OOP principles in C#.',
            short: "The four pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
            parts: [
              { q: "Encapsulation?", a: "Hide internal state behind access modifiers and properties." },
              { q: "Inheritance?", a: "Derive a class from a base class to reuse and extend it." },
              { q: "Polymorphism?", a: "Treat derived objects as their base type and get specialised behaviour via `virtual`/`override` or interfaces." },
              { q: "Abstraction?", a: "Expose a simple contract (abstract class / interface) and hide implementation details." }
            ],
            a: `1. **Encapsulation**: Bundling state and behavior within a class while restricting direct access using access modifiers (\`private\`, \`protected\`, \`public\`) and properties.
2. **Inheritance**: Deriving new classes from existing base classes to reuse and extend functionality (\`class Car : Vehicle\`).
3. **Polymorphism**: The ability to treat derived objects as instances of a base class or interface, executing specialized behavior via \`virtual\`, \`override\`, and interface methods.
4. **Abstraction**: Hiding implementation complexity and exposing clean contracts via \`abstract\` classes and \`interface\` definitions.`
          },
          {
            q: 'What is the difference between an interface and an abstract class?',
            short: "An abstract class is a partial base class with state (single inheritance); an interface is a pure contract a class can implement many of.",
            a: `• **Abstract Class**:
  - Defines an *is-a* relationship.
  - Can maintain state (instance fields) and non-public constructors.
  - Supports full method implementations.
  - Single inheritance only.
• **Interface**:
  - Defines a *can-do* contract.
  - Cannot maintain instance state fields.
  - A class can implement **multiple** interfaces.
  - Supports Default Interface Methods (DIM) in modern C#.`
          },
          {
            q: 'What is the difference between a class and a struct?',
            short: "A class is a heap-allocated reference type with inheritance; a struct is a copied value type best for small, immutable data.",
            a: `• **\`class\`**: Reference type on the managed heap, passed by reference, supports class inheritance and finalizers.
• **\`struct\`**: Value type allocated on the stack or inline, passed by copy, cannot inherit classes (only interfaces). Ideal for small immutable types (< 16 bytes like \`Point\`, \`Vector2\`).`
          },
          {
            q: 'Explain method overloading vs method overriding.',
            short: "Overloading is same name with different parameters (compile time); overriding replaces a base `virtual` method in a subclass (runtime).",
            a: `• **Method Overloading (Static / Compile-Time Polymorphism)**: Multiple methods in the same class sharing the same name but differing in parameter count, types, or order.
• **Method Overriding (Dynamic / Runtime Polymorphism)**: A derived class provides a new implementation for a base class \`virtual\` or \`abstract\` method using \`override\`, resolved via vtable.`
          }
        ]
      },
      {
        name: 'Keywords & Modifiers',
        questions: [
          {
            q: 'Explain the purpose of the `static` keyword.',
            short: "`static` makes a member belong to the type itself rather than an instance, so it is shared and needs no object.",
            a: `• **Static Members**: Belong to the type itself rather than any specific instance; shared across the application domain.
• **Static Classes**: Cannot be instantiated, cannot inherit, contain only static members, and are \`sealed\`.
• **Static Constructors**: Run once automatically before any instance is created or static member is accessed.`
          },
          {
            q: 'What is the difference between `const` and `readonly`?',
            short: "`const` is a compile-time literal baked into callers; `readonly` is set once at runtime (declaration or constructor).",
            a: `• **\`const\`**: Compile-time constant, implicitly static, must be initialized at declaration, limited to primitive and string literals. Inlined into calling assemblies.
• **\`readonly\`**: Runtime constant, can be initialized at declaration or within class constructors, supports complex object references.`
          },
          {
            q: 'Explain `out` vs `ref`.',
            short: "`ref` needs the variable initialised before the call; `out` does not, but the method must assign it before returning.",
            a: `• **\`ref\`**: Passes variable memory reference. The variable **must be initialized** before being passed to the method.
• **\`out\`**: Passes variable by reference for output. The variable **does not need to be initialized** beforehand, but the called method **must assign a value** before returning.`
          },
          {
            q: 'What is a partial class, and when would you use it?',
            short: "A class split across multiple files that the compiler merges into one.",
            parts: [
              { q: "What is it?", a: "A class declared with `partial` in several `.cs` files, compiled as a single type." },
              { q: "When would you use it?", a: "To keep generated code (designers, source generators, scaffolding) separate from hand-written logic." }
            ],
            a: `• A **partial class** splits a single class definition across multiple \`.cs\` files using the \`partial\` keyword. The compiler merges them into one class.
• **Use Cases**:
  - Separating auto-generated code (Entity Framework migrations, Source Generators, WPF designer files) from custom business logic.
  - Large team collaboration on complex domain entities.`
          }
        ]
      },
      {
        name: 'Delegates & Events',
        questions: [
          {
            q: 'What is a delegate, and what are events in C#?',
            short: "A delegate is a type-safe function pointer; an event is a delegate wrapped so only the owner can raise it.",
            parts: [
              { q: "What is a delegate?", a: "A type that references methods with a matching signature and can multicast (`+=`)." },
              { q: "What is an event?", a: "A publisher/subscriber wrapper: outsiders can only subscribe or unsubscribe, and only the declaring class can invoke it." }
            ],
            a: `• **Delegate**: A type-safe, object-oriented function pointer holding references to methods with matching signatures. Supports multicast chaining (\`+=\`, \`-=\`).
• **Event**: An encapsulation wrapper over a delegate enforcing the publisher-subscriber pattern. Outside classes can only subscribe/unsubscribe; only the owning class can trigger/invoke the event.`
          },
          {
            q: 'Explain `Func`, `Action`, and `Predicate`.',
            short: "Built-in generic delegates: `Action` returns void, `Func` returns a value, `Predicate` returns bool.",
            parts: [
              { q: "`Action`?", a: "Takes 0–16 parameters and returns `void`." },
              { q: "`Func`?", a: "Takes 0–16 parameters and returns `TResult` (the last type argument)." },
              { q: "`Predicate`?", a: "Takes one `T` and returns `bool`, the same as `Func<T, bool>`." }
            ],
            a: `• **\`Action<T1, T2...>\`**: A built-in generic delegate taking 0 to 16 parameters and returning \`void\`.
• **\`Func<T1, T2..., TResult>\`**: A built-in generic delegate taking 0 to 16 parameters and returning a value of type \`TResult\`.
• **\`Predicate<T>\`**: A delegate taking one parameter of type \`T\` and returning a \`bool\` (equivalent to \`Func<T, bool>\`).`
          }
        ]
      },
      {
        name: 'Memory Management',
        questions: [
          {
            q: 'Explain Garbage Collection in .NET.',
            short: "The GC automatically frees unreachable objects using generations (0, 1, 2 + LOH) with mark-and-compact phases.",
            explain: "Most objects die young, so the GC collects Gen 0 often and cheaply. Survivors are promoted to Gen 1 and then Gen 2, which are collected less frequently. Objects of 85 KB or more go on the Large Object Heap and are only collected with Gen 2. Each collection marks live objects reachable from roots, then sweeps and compacts memory.",
            a: `The .NET GC is an automatic generational memory manager:
• **Gen 0**: New small allocations; collected frequently in milliseconds.
• **Gen 1**: Buffer between short-lived and long-lived objects.
• **Gen 2**: Long-lived objects (singletons, static caches).
• **LOH (Large Object Heap)**: Objects >= 85,000 bytes, collected during Gen 2.
• **Phases**: Mark (find live references) -> Sweep/Compact (defragment memory).`
          },
          {
            q: 'What is a memory leak?',
            short: "In .NET, a leak is memory that stays reachable, such as undetached event handlers, unbounded static caches, or undisposed resources, so the GC can never free it.",
            a: `In managed .NET, memory leaks occur when unused objects remain reachable by active GC roots:
• **Unsubscribed Event Handlers**: Publisher holds strong reference to subscriber.
• **Static Collections**: Unbounded caching in static dictionaries/lists.
• **Unmanaged Resources**: Undisposed native handles, sockets, database connections.
• **Timers**: \`System.Threading.Timer\` instances not properly disposed.`
          },
          {
            q: 'What is `IDisposable` and the `using` statement, and when should they be used?',
            short: "`IDisposable` provides deterministic cleanup, and `using` guarantees `Dispose()` runs, even on exceptions.",
            parts: [
              { q: "What is `IDisposable`?", a: "An interface with `Dispose()` for releasing unmanaged resources." },
              { q: "What is `using`?", a: "Syntactic sugar for `try/finally { Dispose(); }`; C# 8 also allows `using var`." },
              { q: "When should they be used?", a: "Whenever you own files, streams, DB connections, sockets, or other native handles." }
            ],
            a: `• **\`IDisposable\`**: Interface providing deterministic cleanup for **unmanaged resources** (file handles, database connections, sockets) via \`Dispose()\`.
• **\`using\` statement**: Syntactic sugar for \`try { ... } finally { obj.Dispose(); }\`.
• **C# 8+ using declaration**: \`using var stream = new FileStream(...);\``
          }
        ]
      },
      {
        name: 'Asynchronous Programming',
        questions: [
          {
            q: 'Explain `async` and `await`.',
            short: "`async` turns a method into a compiler-built state machine, and `await` yields the thread until a Task completes, without blocking.",
            parts: [
              { q: "What does `async` do?", a: "Enables `await` in the method and makes it return a `Task`/`ValueTask`." },
              { q: "What does `await` do?", a: "Suspends the method, frees the thread, and resumes when the awaited Task finishes." }
            ],
            a: `• **\`async\`**: Marks a method as asynchronous and tells the compiler to generate a state machine struct.
• **\`await\`**: Asynchronously pauses execution until the awaited Task finishes, yielding the thread back to the thread pool or UI message loop without blocking.`
          },
          {
            q: 'What is the difference between `Task` and `Thread`?',
            short: "A `Thread` is a heavy OS thread; a `Task` is a lightweight unit of work scheduled on pooled threads, with results, continuations, and cancellation.",
            a: `• **\`Thread\`**: Low-level OS execution thread. Heavyweight (~1MB stack, context switching cost).
• **\`Task\`**: High-level promise abstraction managed by the CLR \`ThreadPool\`. Reuses worker threads efficiently, supports continuations, cancellation, and return values.`
          },
          {
            q: 'What is the difference between `Thread.Sleep` and `Task.Delay`?',
            short: "`Thread.Sleep` blocks the thread; `Task.Delay` waits asynchronously without holding a thread.",
            a: `• **\`Thread.Sleep(ms)\`**: Synchronously blocks the operating system thread, making it unavailable for other work.
• **\`Task.Delay(ms)\`**: Non-blocking asynchronous timer that schedules a continuation on the thread pool without consuming a thread while waiting.`
          },
          {
            q: 'When can `async`/`await` hurt performance?',
            short: "When the work is tiny or CPU-bound (state-machine overhead), or when you block on it with `.Result`/`.Wait()` (deadlocks, thread starvation).",
            a: `• **High-frequency micro-methods**: CPU-bound operations where the overhead of the generated state machine and Task allocations outweighs the work. (Use \`ValueTask<T>\`).
• **Sync-over-Async Antipattern**: Calling \`.Result\` or \`.Wait()\` blocks threads and causes threadpool starvation and deadlocks.`
          },
          {
            q: 'How do you run two tasks together and get all results?',
            short: "Start both tasks, then `await Task.WhenAll(...)` and read each result.",
            a: `Use **\`Task.WhenAll\`**:
\`\`\`csharp
Task<User> userTask = GetUserAsync(id);
Task<Orders> ordersTask = GetOrdersAsync(id);

await Task.WhenAll(userTask, ordersTask);

User user = await userTask;
Orders orders = await ordersTask;
\`\`\``
          },
          {
            q: 'What is the Parallel library?',
            short: "The TPL (`Parallel.For/ForEach`, PLINQ) splits CPU-bound work across cores. It is not meant for async I/O.",
            a: `The **Task Parallel Library (TPL)** (\`Parallel.For\`, \`Parallel.ForEach\`, PLINQ):
• Designed for **CPU-bound parallelism** across multiple processor cores.
• Automatically partitions work arrays among worker threads.
• Do not use for asynchronous I/O (use \`Task.WhenAll\` instead).`
          },
          {
            q: 'What is a `CancellationToken`?',
            short: "A token passed to async operations so they can stop cooperatively when its `CancellationTokenSource` is cancelled.",
            a: `A cooperative mechanism to notify asynchronous operations to abort:
• \`CancellationTokenSource (CTS)\`: Instantiates and triggers the cancel signal (\`cts.Cancel()\`, \`cts.CancelAfter(5000)\`).
• \`CancellationToken (CT)\`: The struct passed into async methods, checked via \`token.ThrowIfCancellationRequested()\` or passed directly to I/O APIs.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. ASP.NET CORE & WEB API
  // =========================================================================
  {
    id: 'aspnet-core',
    title: 'ASP.NET Core & Web API',
    icon: 'Server',
    summary: 'Request pipeline, middleware, Dependency Injection lifetimes, RESTful API design, JWT security, and configuration.',
    topics: [
      {
        name: 'Architecture & Pipeline',
        questions: [
          {
            q: 'Explain the ASP.NET Core request lifecycle.',
            short: "Kestrel receives the request, then it passes through the middleware pipeline, routing, filters and the endpoint, and the response flows back out in reverse.",
            explain: "Kestrel (optionally behind IIS or Nginx) parses the request into an HttpContext. The context goes through each middleware in registration order: exception handling, HTTPS, static files, routing, CORS, authentication, authorization. Routing selects an endpoint, the MVC filter pipeline runs (authorization, resource, model binding, action, and result filters), and the action produces a result. The response then unwinds back through the middleware.",
            a: `1. **Web Server (Kestrel / IIS Reverse Proxy)**: Parses incoming TCP socket data into HTTP request representations.
2. **HttpContext Initialization**: Creates \`HttpContext\` holding Request, Response, User Claims, and ServiceProvider.
3. **Middleware Pipeline**: Request flows through registered middleware components (Authentication, Routing, CORS, Custom Middleware).
4. **Endpoint Routing & Filter Pipeline**: Endpoint selected -> Authorization -> Resource Filters -> Model Binding & Action Filters -> Controller Action -> Result Filters.
5. **Response Pipeline**: Response flows back up through middleware in reverse order.`
          },
          {
            q: 'What is ASP.NET Core middleware, and what is the difference between `app.Use` and `app.Run`?',
            short: "Middleware are chained request/response handlers; `Use` can pass to the next one, while `Run` ends the pipeline.",
            parts: [
              { q: "What is middleware?", a: "Components in an ordered pipeline that each inspect or modify the request and response." },
              { q: "`app.Use` vs `app.Run`?", a: "`Use` can run code before and after `await next()`; `Run` is terminal and never calls next." }
            ],
            a: `**Middleware** are software components chained together to process requests and responses.
• **\`app.Use\`**: Can execute code before and after the next component, calling \`await next()\` to pass control.
• **\`app.Run\`**: Terminal middleware that handles the request and **terminates** the pipeline without calling \`next()\`.`
          },
          {
            q: 'How do you write custom middleware for global exception handling?',
            short: "Wrap `await _next(context)` in try/catch, log the exception, and return a 500 JSON (ProblemDetails) response.",
            explain: "Register the middleware early, with `app.UseMiddleware<GlobalExceptionMiddleware>()`, so it wraps everything after it. Any unhandled exception bubbles up to its catch block, which logs it and writes a consistent error body, so controllers do not need their own try/catch. On .NET 8+ you can also use `IExceptionHandler` with `app.UseExceptionHandler()`.",
            a: `\`\`\`csharp
public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try {
            await _next(context);
        } catch (Exception ex) {
            _logger.LogError(ex, "Unhandled exception caught by middleware");
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new { 
                Status = 500, 
                Message = "An internal server error occurred." 
            });
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
            short: "With DI, classes receive their dependencies from a container instead of creating them.",
            parts: [
              { q: "What is DI?", a: "An Inversion of Control technique where dependencies are injected, usually through the constructor." },
              { q: "Why is it used?", a: "Loose coupling, easy mocking in unit tests, central lifetime management, and SOLID's Dependency Inversion." }
            ],
            a: `**Dependency Injection (DI)** is an Inversion of Control (IoC) pattern where a class receives its dependencies from an external container rather than creating them directly.
• **Benefits**: Loose coupling, easy unit testing with mocks, centralized lifetime management, adherence to SOLID Dependency Inversion.`
          },
          {
            q: 'Explain service lifetimes (`AddTransient`, `AddScoped`, `AddSingleton`).',
            short: "Transient creates a new instance every time, Scoped creates one per request, and Singleton creates one for the app's lifetime.",
            parts: [
              { q: "`AddTransient`?", a: "New instance every time it is resolved. Best for lightweight, stateless services." },
              { q: "`AddScoped`?", a: "One instance per HTTP request, shared within it. Typical for `DbContext`." },
              { q: "`AddSingleton`?", a: "One instance for the whole app. It must be thread-safe." }
            ],
            a: `• **\`AddTransient\`**: A new instance is created **every time** it is requested.
• **\`AddScoped\`**: A single instance is created **once per HTTP request** scope and shared across all services in that request.
• **\`AddSingleton\`**: A single instance is created **once on first request** and lives for the entire application lifetime.`
          },
          {
            q: 'What happens when a Singleton service depends on a Scoped service?',
            short: "It becomes a captive dependency: the scoped service lives forever inside the singleton, causing stale state and thread-safety bugs.",
            a: `**Captive Dependency**: The Scoped service gets captured by the Singleton and effectively lives for the entire app lifetime. This leads to multi-threading race conditions and memory leaks. In ASP.NET Core dev mode, scope validation throws an \`InvalidOperationException\` at startup.`
          },
          {
            q: 'Can you register the same service with a different service lifetime or multiple implementations?',
            short: "Yes. Multiple registrations are allowed; single injection gets the last one, and `IEnumerable<T>` gets them all.",
            parts: [
              { q: "Different lifetime?", a: "Yes, but the last registration wins for a plain `T` injection. Use `TryAdd*` to avoid accidental overrides." },
              { q: "Multiple implementations?", a: "Yes. Inject `IEnumerable<IService>` to get all of them in order, or use keyed services (.NET 8+) to pick one." }
            ],
            a: `Yes. Calling \`services.AddScoped<IService, ServiceA>()\` and \`services.AddScoped<IService, ServiceB>()\` registers both. Injecting \`IEnumerable<IService>\` provides all registered implementations in order.`
          }
        ]
      },
      {
        name: 'API Design & Routing',
        questions: [
          {
            q: 'What is a REST API?',
            short: "An HTTP API that follows REST constraints: stateless, resource-based URIs, standard verbs, cacheable responses, and client/server separation.",
            a: `**Representational State Transfer (REST)** is an architectural pattern featuring:
• Client-Server separation
• Stateless communication
• Standard HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`)
• Cacheable responses
• Resource identification via URIs (\`/api/orders/123\`).`
          },
          {
            q: 'Explain HTTP methods (GET, POST, PUT, PATCH, DELETE) and common status codes.',
            short: "Verbs express intent on a resource, and status codes report the outcome (2xx success, 4xx client error, 5xx server error).",
            parts: [
              { q: "HTTP methods?", a: "GET reads, POST creates, PUT replaces, PATCH partially updates, DELETE removes. GET, PUT and DELETE are idempotent." },
              { q: "Common status codes?", a: "200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 429 Too Many Requests, 500 Server Error." }
            ],
            a: `• **Methods**:
  - \`GET\`: Safe, idempotent. Retrieve resource.
  - \`POST\`: Not idempotent. Create new resource (201 Created).
  - \`PUT\`: Idempotent. Complete replacement of resource.
  - \`PATCH\`: Partial update of specific fields.
  - \`DELETE\`: Idempotent. Remove resource.
• **Status Codes**: \`200 OK\`, \`201 Created\`, \`204 No Content\`, \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`, \`409 Conflict\`, \`429 Too Many Requests\`, \`500 Internal Error\`.`
          },
          {
            q: 'What is the difference between PUT and PATCH?',
            short: "PUT replaces the whole resource; PATCH updates only the fields you send.",
            a: `• **PUT**: Replaces the **entire resource**; omitted fields are reset to defaults.
• **PATCH**: Applies a **partial update** to only the specified fields, leaving other fields untouched.`
          },
          {
            q: 'What is the difference between Minimal APIs and Controllers?',
            short: "Controllers are class-based MVC with a rich filter pipeline; Minimal APIs map lambdas directly in `Program.cs` for lean, fast endpoints.",
            a: `• **Controllers**: Class-based MVC structure with rich filter pipelines and model binders. Suited for large, complex enterprise APIs.
• **Minimal APIs (.NET 6+)**: Lambda endpoint definitions directly in \`Program.cs\`. Fast startup, zero reflection overhead, optimal for microservices and cloud functions.`
          },
          {
            q: 'How do you implement routing?',
            short: "Use attribute routes on controllers (`[Route]`, `[HttpGet(\"{id:int}\")]`) or `app.MapGet/MapPost` in Minimal APIs.",
            a: `• **Attribute Routing**: \`[Route("api/[controller]")\`, \`[HttpGet("{id:int}")]\` on controller actions.
• **Minimal API Routing**: \`app.MapGet("/api/users/{id}", (int id) => ...)\`.`
          },
          {
            q: 'What is API versioning, and how do you implement it?',
            short: "Versioning lets you evolve an API without breaking existing clients.",
            parts: [
              { q: "What is it?", a: "Exposing multiple contract versions side by side, such as v1 and v2." },
              { q: "How do you implement it?", a: "Use the `Asp.Versioning` packages with a URL segment (`/api/v1/...`), a query string (`?api-version=1.0`), or a header." }
            ],
            a: `Strategies to prevent breaking clients:
1. **URI Path**: \`/api/v1/orders\`
2. **Query String**: \`/api/orders?api-version=1.0\`
3. **HTTP Header**: \`X-Version: 1.0\`
Implemented via \`Asp.Versioning.Http\` and \`Asp.Versioning.Mvc\` packages.`
          }
        ]
      },
      {
        name: 'Security & Configuration',
        questions: [
          {
            q: 'How do you handle authentication vs authorization?',
            short: "Authentication proves who you are; authorization decides what you are allowed to do.",
            parts: [
              { q: "Authentication?", a: "Validate identity (JWT, cookie, OAuth) with `app.UseAuthentication()`." },
              { q: "Authorization?", a: "Check roles, claims, or policies with `app.UseAuthorization()` and `[Authorize(Policy = \"...\")]`." }
            ],
            a: `• **Authentication (AuthN)**: Identifying who the user is (validating JWT tokens, cookies, passwords). Handled by \`app.UseAuthentication()\`.
• **Authorization (AuthZ)**: Deciding what permissions the user has (Roles, Claims, Policies). Handled by \`app.UseAuthorization()\` and \`[Authorize(Policy = "AdminOnly")]\`.`
          },
          {
            q: 'What is JWT, and how is it used?',
            short: "A JWT is a signed, self-contained token (header.payload.signature) sent as a Bearer token for stateless authentication.",
            parts: [
              { q: "What is JWT?", a: "Base64Url-encoded JSON claims (`sub`, `roles`, `exp`) signed with HMAC or RSA so tampering is detectable." },
              { q: "How is it used?", a: "The client sends `Authorization: Bearer <token>`, and the API validates the signature, issuer, audience, and expiry on every request." }
            ],
            a: `**JSON Web Token (JWT)** contains:
\`Header.Payload.Signature\`
• Base64Url-encoded JSON claims (\`sub\`, \`roles\`, \`exp\`).
• Digitally signed with HMAC-SHA256 secret or RSA private key.
• Transmitted in \`Authorization: Bearer <token>\` header for stateless authentication.`
          },
          {
            q: 'How do you enable CORS?',
            short: "Define a named policy with `AddCors` (allowed origins, headers, methods) and apply it with `app.UseCors(\"PolicyName\")`.",
            a: `\`\`\`csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("https://myclient.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
app.UseCors("AllowFrontend");
\`\`\``
          },
          {
            q: 'How do you configure `appsettings.json` and manage environment variables securely?',
            short: "Configuration is layered (JSON, then environment JSON, env vars, CLI); secrets go in Key Vault or User Secrets, never in JSON.",
            parts: [
              { q: "How is `appsettings.json` configured?", a: "`appsettings.json` is overridden by `appsettings.{Environment}.json`, then env vars, then command-line args. Bind sections with `IOptions<T>`." },
              { q: "How do you manage secrets securely?", a: "Use User Secrets locally and Azure Key Vault (via Managed Identity) or a secrets manager in production." }
            ],
            a: `• ASP.NET Core loads configuration hierarchically: \`appsettings.json\` -> \`appsettings.{Environment}.json\` -> Environment Variables -> Command Line.
• Sensitive production credentials (DB strings, API keys) must **never** be stored in JSON files; use **Azure Key Vault**, **AWS Secrets Manager**, or **User Secrets** (local dev).`
          }
        ]
      },
      {
        name: 'Advanced Web API',
        questions: [
          {
            q: 'What is model binding?',
            short: "The framework automatically maps route, query, body, form, and header data onto action parameters and DTOs.",
            a: `The process that extracts data from HTTP requests (Route values, Query strings, Request Body, Form data, Headers) and maps them into C# action method parameters and DTO models automatically.`
          },
          {
            q: 'What are filters in ASP.NET Core?',
            short: "Hooks that run at specific stages of the MVC action pipeline: Authorization, Resource, Action, Exception, and Result filters.",
            a: `Code running before or after stages in the action execution pipeline:
• **Authorization Filters**: Validate permissions first.
• **Resource Filters**: Wrap the entire pipeline (e.g. caching).
• **Action Filters**: Execute before/after action methods (e.g. model validation).
• **Exception Filters**: Handle unhandled exceptions.
• **Result Filters**: Execute before/after the action result is sent.`
          },
          {
            q: 'How do you handle errors and logging?',
            short: "Use global exception middleware that returns ProblemDetails, plus structured logging via `ILogger` or Serilog.",
            parts: [
              { q: "Errors?", a: "`app.UseExceptionHandler()` or custom middleware returning RFC 7807 ProblemDetails." },
              { q: "Logging?", a: "Structured logs through `ILogger`/Serilog to sinks like Application Insights or Elasticsearch." }
            ],
            a: `• Structured logging with **Serilog** or **ILogger** sinks (Application Insights, Elasticsearch, Console).
• Global error handling via custom middleware or \`app.UseExceptionHandler()\` returning standard RFC 7807 **ProblemDetails** JSON responses.`
          },
          {
            q: 'How do you integrate external APIs?',
            short: "Use `IHttpClientFactory` (typed clients) to avoid socket exhaustion, with Polly for retries, timeouts, and circuit breakers.",
            a: `Use **\`IHttpClientFactory\`** to create and manage resilient \`HttpClient\` instances, preventing socket exhaustion. Combine with **Polly** for retry policies, circuit breakers, and rate limits.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. LINQ & ENTITY FRAMEWORK CORE
  // =========================================================================
  {
    id: 'linq-efcore',
    title: 'LINQ & Entity Framework Core',
    icon: 'Database',
    summary: 'Deferred execution, joining, grouping, EF Core Change Tracker, Expression Trees, and SQL translation.',
    topics: [
      {
        name: 'LINQ Fundamentals',
        questions: [
          {
            q: 'What is LINQ?',
            short: "Language Integrated Query: type-safe query syntax in C# over collections, databases, and XML.",
            a: `**Language Integrated Query (LINQ)** provides native query syntax directly in C# for querying objects (\`IEnumerable\`), databases (\`IQueryable\` / EF Core), and XML with compile-time type safety.`
          },
          {
            q: 'Explain deferred execution vs immediate execution.',
            short: "Deferred queries (`Where`, `Select`) run only when enumerated; immediate operators (`ToList`, `Count`, `First`) run right away.",
            a: `• **Deferred Execution**: Query definition does not execute immediately; it runs only when enumerated (e.g. \`foreach\`, \`Where()\`, \`Select()\`).
• **Immediate Execution**: Forces execution immediately and loads data into memory (e.g. \`ToList()\`, \`Count()\`, \`First()\`, \`Sum()\`).`
          },
          {
            q: 'Why does calling `ToList()` change behavior and potentially cause performance problems?',
            short: "It executes the SQL immediately, so everything after it runs in app memory instead of the database, often loading far too many rows.",
            a: `Calling \`ToList()\` on an \`IQueryable\` forces EF Core to send SQL to the database and pull all rows into memory. Any subsequent operations execute in RAM on the app server rather than being optimized into SQL by the DB engine.`
          }
        ]
      },
      {
        name: 'Filtering, Projection & Evaluation',
        questions: [
          {
            q: '`Where()` vs `Select()`?',
            short: "`Where` filters items; `Select` transforms each item into a new shape.",
            a: `• **\`Where()\`**: Filters elements matching a boolean predicate without changing their structure.
• **\`Select()\`**: Transforms / projects each element into a new shape or type.`
          },
          {
            q: '`Select()` vs `SelectMany()`?',
            short: "`Select` maps one-to-one; `SelectMany` maps one-to-many and flattens the nested collections.",
            a: `• **\`Select()\`**: 1-to-1 projection (returns \`IEnumerable<T>\`).
• **\`SelectMany()\`**: 1-to-many flattening (e.g. flattens \`List<Order>.Select(o => o.Items)\` into a single flat list of items).`
          },
          {
            q: '`Any()` vs `Count() > 0`?',
            short: "`Any()` stops at the first match (`EXISTS`); `Count() > 0` counts everything first, so prefer `Any()`.",
            a: `• **\`Any()\`**: Returns \`true\` on the first matching element (translates to \`EXISTS(SELECT 1 ...)\` in SQL). Much faster.
• **\`Count() > 0\`**: Counts every single row across the table before comparing.`
          },
          {
            q: '`Any()` vs `All()` vs `Contains()`?',
            short: "`Any`: at least one item matches. `All`: every item matches. `Contains`: a specific value is present.",
            a: `• **\`Any(pred)\`**: True if at least one item satisfies the predicate.
• **\`All(pred)\`**: True if EVERY item satisfies the predicate.
• **\`Contains(val)\`**: True if the collection contains the specified item.`
          }
        ]
      },
      {
        name: 'Data Retrieval & Grouping',
        questions: [
          {
            q: '`First()` vs `FirstOrDefault()`?',
            short: "`First` throws if the sequence is empty; `FirstOrDefault` returns null/default instead.",
            a: `• **\`First()\`**: Returns the first element; throws an \`InvalidOperationException\` if the collection is empty.
• **\`FirstOrDefault()\`**: Returns the first element, or \`null\` / default value if empty.`
          },
          {
            q: '`First()` vs `Single()`?',
            short: "`First` takes the first match; `Single` requires exactly one and throws if there are zero or several.",
            a: `• **\`First()\`**: Returns the first element and stops searching.
• **\`Single()\`**: Expects exactly one element; throws if empty OR if more than one element is found.`
          },
          {
            q: '`Single()` vs `SingleOrDefault()`?',
            short: "Both throw on more than one element; on zero elements `Single` throws and `SingleOrDefault` returns default.",
            a: `• **\`Single()\`**: Throws if 0 elements or >1 elements exist.
• **\`SingleOrDefault()\`**: Returns default/null if 0 elements exist; throws if >1 elements exist.`
          },
          {
            q: 'How does `GroupBy()` work (e.g., find the highest-paid employee per department)?',
            short: "`GroupBy` buckets items by a key; then `Select` over each group, e.g. `OrderByDescending(Salary).First()`.",
            a: `\`\`\`csharp
var topPaid = employees
    .GroupBy(e => e.DepartmentId)
    .Select(g => new {
        DepartmentId = g.Key,
        TopEmployee = g.OrderByDescending(e => e.Salary).First()
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
            q: '`Join()` vs `GroupJoin()`?',
            short: "`Join` is an inner join producing flat pairs; `GroupJoin` gives each outer item the collection of its matches.",
            a: `• **\`Join()\`**: Inner join correlating elements of two sequences based on matching keys.
• **\`GroupJoin()\`**: Correlates elements based on keys and groups matching elements into a collection per parent.`
          },
          {
            q: 'How do you implement a LEFT JOIN in LINQ?',
            short: "Use `join ... into group` then `from x in group.DefaultIfEmpty()` so unmatched rows come through with null.",
            a: `\`\`\`csharp
var leftJoin = from c in db.Customers
               join o in db.Orders on c.Id equals o.CustomerId into orderGroup
               from ord in orderGroup.DefaultIfEmpty()
               select new { c.Name, OrderId = ord != null ? ord.Id : (int?)null };
\`\`\``
          },
          {
            q: '`OrderBy()` vs `ThenBy()`?',
            short: "`OrderBy` sets the primary sort; `ThenBy` breaks ties with a secondary key.",
            a: `• **\`OrderBy()\`**: Performs the primary ascending sort.
• **\`ThenBy()\`**: Performs secondary sorting on elements that share identical primary sort keys.`
          },
          {
            q: '`Distinct()` vs `DistinctBy()`?',
            short: "`Distinct` compares whole objects; `DistinctBy` (.NET 6+) de-duplicates by a chosen key.",
            a: `• **\`Distinct()\`**: Compares entire object equality.
• **\`DistinctBy()\` (.NET 6+)**: Filters duplicates based on a specific property key selector (\`items.DistinctBy(x => x.Email)\`).`
          }
        ]
      },
      {
        name: 'Advanced LINQ',
        questions: [
          {
            q: 'How do you use `Skip()` and `Take()` for pagination, and what problems occur with large datasets?',
            short: "`Skip((page-1)*size).Take(size)` works, but deep offsets get slow, so use keyset (cursor) pagination for large tables.",
            parts: [
              { q: "How do you paginate?", a: "`query.OrderBy(x => x.Id).Skip((page - 1) * size).Take(size)`." },
              { q: "What goes wrong at scale?", a: "`OFFSET 100000` makes the DB read and discard 100k rows, so every page gets slower." },
              { q: "What is the fix?", a: "Keyset pagination: `WHERE Id > @lastId ORDER BY Id` with `Take(size)`." }
            ],
            a: `• **Usage**: \`query.Skip((pageNumber - 1) * pageSize).Take(pageSize)\`.
• **Problem with large datasets (Deep Pagination)**: \`OFFSET 100000\` forces the DB engine to scan 100,000 rows before discarding them.
• **Solution**: **Keyset / Cursor Pagination** (\`WHERE Id > @lastSeenId ORDER BY Id ASC LIMIT 50\`).`
          },
          {
            q: '`Concat()` vs `Union()`?',
            short: "`Concat` appends and keeps duplicates; `Union` appends and removes duplicates.",
            a: `• **\`Concat()\`**: Appends two collections together, preserving all duplicates.
• **\`Union()\`**: Appends two collections and removes duplicate elements.`
          },
          {
            q: 'What happens if you enumerate the same LINQ query multiple times?',
            short: "The query re-executes each time, repeating DB round-trips and possibly returning different data. Materialise it once with `ToList()`.",
            a: `**Multiple Enumeration**: The query executes against the database or data source every time it is enumerated, leading to duplicate SQL queries, wasted network round-trips, and potential data race conditions.`
          }
        ]
      },
      {
        name: 'Entity Framework Core',
        questions: [
          {
            q: 'What is EF Core, `DbContext`, and `DbSet`?',
            short: "EF Core is .NET's ORM; `DbContext` is the session/unit of work, and `DbSet<T>` represents a table.",
            parts: [
              { q: "What is EF Core?", a: "Microsoft's cross-platform Object-Relational Mapper." },
              { q: "What is `DbContext`?", a: "Manages the connection, change tracking, and `SaveChanges`, acting as the unit of work." },
              { q: "What is `DbSet<T>`?", a: "A queryable collection representing one table/entity type." }
            ],
            a: `• **EF Core**: Microsoft's modern Object-Relational Mapper (ORM).
• **\`DbContext\`**: Coordinates Unit of Work, manages connections, and tracks entity states.
• **\`DbSet<T>\`**: Represents a table collection for querying and mutating entities of type \`T\`.`
          },
          {
            q: 'Code-first vs DB-first approach?',
            short: "Code-first generates the schema from C# classes via migrations; DB-first scaffolds C# classes from an existing database.",
            a: `• **Code-First**: C# entity classes and EF Core migrations define and update the database schema.
• **Database-First**: An existing database schema is reverse-engineered into C# entity models using EF Core scaffolding tools.`
          },
          {
            q: 'What are migrations?',
            short: "Versioned, incremental schema changes generated from model changes (`dotnet ef migrations add` / `database update`).",
            a: `A structured way to incrementally evolve database schemas in sync with C# domain model changes (\`dotnet ef migrations add AddUserTable\`, \`dotnet ef database update\`).`
          },
          {
            q: 'What is the difference between `AsNoTracking()` and tracking?',
            short: "Tracking snapshots entities to detect changes for `SaveChanges`; `AsNoTracking` skips that for faster, lighter read-only queries.",
            a: `• **Tracking (Default)**: EF Core stores snapshots in the Change Tracker to detect changes on \`SaveChangesAsync()\`.
• **\`AsNoTracking()\`**: Disables the Change Tracker for read-only queries, reducing memory allocations and CPU usage.`
          },
          {
            q: 'How do you handle database transactions?',
            short: "`SaveChanges` is already transactional; for several operations use `BeginTransactionAsync`, then `Commit`, with `Rollback` on error.",
            a: `\`\`\`csharp
using var transaction = await db.Database.BeginTransactionAsync();
try {
    // operations
    await db.SaveChangesAsync();
    await transaction.CommitAsync();
} catch {
    await transaction.RollbackAsync();
}
\`\`\``
          },
          {
            q: 'What is an Expression Tree, and why is it important in EF Core?',
            short: "Code represented as a data structure (an AST) that EF Core can inspect and translate into SQL.",
            parts: [
              { q: "What is an Expression Tree?", a: "An `Expression<Func<...>>` object graph describing code instead of compiled IL." },
              { q: "Why does it matter in EF Core?", a: "EF Core walks the tree to generate parameterised SQL, which is why `IQueryable` filters run in the database." }
            ],
            a: `An **Expression Tree** represents code as an Abstract Syntax Tree (AST) of objects. EF Core parses Expression Trees at runtime to translate C# LINQ syntax into native parameterized SQL.`
          },
          {
            q: 'How does LINQ translate to SQL?',
            short: "On enumeration, EF's query provider walks the expression tree, applies global filters, generates parameterised SQL, and runs it via ADO.NET.",
            a: `When \`IQueryable\` is enumerated, EF Core's Query Provider parses the Expression Tree, optimizes relational nodes, applies Global Query Filters, generates parameterized SQL, and executes it via ADO.NET.`
          },
          {
            q: 'Write code for soft delete in EF Core.',
            short: "Add an `IsDeleted` flag, a global query filter `!IsDeleted`, and override `SaveChanges` to turn deletes into updates.",
            explain: "The global query filter hides deleted rows from every query automatically (use `IgnoreQueryFilters()` when you need them). In `SaveChangesAsync`, find entries in the `Deleted` state, switch them to `Modified`, and set `IsDeleted = true`. The row stays in the table for auditing and restore.",
            a: `\`\`\`csharp
public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
}

// In DbContext:
protected override void OnModelCreating(ModelBuilder modelBuilder) {
    modelBuilder.Entity<Product>().HasQueryFilter(p => !p.IsDeleted);
}

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

  // =========================================================================
  // 4. MICROSERVICES & SYSTEM DESIGN
  // =========================================================================
  {
    id: 'microservices-system-design',
    title: 'Microservices & System Design',
    icon: 'Network',
    summary: 'Monolith decomposition, DDD, Saga patterns, distributed transactions, resilience, design patterns, and scenario blueprints.',
    topics: [
      {
        name: 'Architecture',
        questions: [
          {
            q: 'Monolith vs Microservices—what are the differences, and how do you decide between them?',
            short: "A monolith is one deployable unit; microservices are independently deployable services. Start with a modular monolith and split when scale or teams demand it.",
            parts: [
              { q: "What are the differences?", a: "A monolith shares one codebase and DB and is simple to build and debug; microservices each own their data and scale independently but add network, consistency, and ops complexity." },
              { q: "How do you decide?", a: "Choose microservices only when independent scaling, deployment cadence, or team boundaries justify the operational cost." }
            ],
            a: `• **Monolith**: Single deployable codebase with a shared database. Simpler development, debugging, and initial deployment. Trade-offs: hard to scale individual modules, single point of failure.
• **Microservices**: Loosely coupled, independently deployable services organized around bounded contexts with private databases. Trade-offs: distributed network latency, eventual consistency, monitoring complexity.
• **Decision**: Start with a modular monolith; migrate to microservices when scaling demands or team boundaries warrant it.`
          },
          {
            q: 'How do you break a monolith into microservices?',
            short: "Find bounded contexts, peel features off incrementally with the Strangler Fig pattern, and split the database per service.",
            explain: "Start with domain modelling (Event Storming) to find seams. Put an API gateway in front of the monolith and move one capability at a time into a new service, routing its traffic there, until the old code can be deleted. Each service gets its own data store; cross-service joins become API calls or events.",
            a: `1. **Domain Modeling**: Identify bounded contexts via Event Storming.
2. **Strangler Fig Pattern**: Gradually replace monolith features with microservices behind an API Gateway.
3. **Database Decomposition**: Split tables into domain-specific databases; replace direct SQL joins with APIs or asynchronous event streaming.`
          },
          {
            q: 'What is Domain-Driven Design (DDD), bounded context, and ubiquitous language?',
            short: "DDD models software around the business domain, with explicit boundaries and a shared vocabulary.",
            parts: [
              { q: "What is DDD?", a: "Designing code structure around core business concepts and rules." },
              { q: "What is a bounded context?", a: "A boundary within which one model and its terms have one meaning, e.g. \"Account\" in Billing vs Identity." },
              { q: "What is ubiquitous language?", a: "One shared vocabulary used by domain experts and developers in conversation and in code." }
            ],
            a: `• **DDD**: An architectural approach centering software design around core business domain logic.
• **Ubiquitous Language**: A shared vocabulary used by both domain experts and software engineers in code, PRDs, and meetings.
• **Bounded Context**: An explicit boundary within which a specific domain model applies (e.g. \`Account\` in Billing Context vs \`Account\` in Identity Context).`
          },
          {
            q: 'Layered architecture vs Clean architecture?',
            short: "Layered depends top-down on the data layer; Clean puts the domain at the centre, with DB and UI as outer plugins behind interfaces.",
            a: `• **Layered (3-Tier)**: Presentation -> Business Logic -> Data Access. Database is the foundation of dependencies.
• **Clean / Onion Architecture**: Core Domain Entities at the center. Use cases depend on domain interfaces; DB, Web, and UI are outer plugins implementing interfaces via Dependency Inversion.`
          }
        ]
      },
      {
        name: 'Communication & API Gateway',
        questions: [
          {
            q: 'How do microservices communicate?',
            short: "Synchronously via REST or gRPC, or asynchronously via message brokers (Kafka, RabbitMQ, Service Bus).",
            a: `• **Synchronous**: REST HTTP/JSON (client-to-service), gRPC (Protocol Buffers over HTTP/2 for high-throughput service-to-service).
• **Asynchronous / Event-Driven**: Message Brokers (Kafka, RabbitMQ, Azure Service Bus) for pub/sub decoupling and eventual consistency.`
          },
          {
            q: 'What is an API Gateway, and how does it differ from a Load Balancer?',
            short: "A gateway is a smart single entry point for APIs; a load balancer just spreads traffic across identical instances.",
            parts: [
              { q: "What is an API Gateway?", a: "A reverse proxy that handles routing, auth, rate limiting, SSL termination, and aggregation (BFF)." },
              { q: "How is it different from a load balancer?", a: "A load balancer distributes traffic at L4/L7 across copies of one service without API-level concerns." }
            ],
            a: `• **Load Balancer**: Distributes network traffic across identical server instances at Layer 4 (TCP) or Layer 7 (HTTP).
• **API Gateway**: Reverse proxy acting as a single entry point offering API routing, SSL termination, authentication/authorization, rate limiting, and request aggregation (BFF - Backend For Frontend).`
          },
          {
            q: 'When would you use a message queue instead of a direct API call?',
            short: "When work can be asynchronous, traffic is spiky, producer and consumer should be decoupled, or you need to fan out to many subscribers.",
            a: `• Asynchronous background processing (generating PDFs, sending emails).
• Smoothing traffic spikes (load leveling).
• Decoupling producer and consumer availability.
• Broadcast pub/sub to multiple downstream subscribers.`
          }
        ]
      },
      {
        name: 'Distributed Systems Challenges',
        questions: [
          {
            q: 'How do you prevent duplicate processing?',
            short: "Make consumers idempotent with an idempotency key stored in Redis or a unique constraint, and publish reliably via the Outbox pattern.",
            a: `**Idempotency & Deduplication**:
• Include an unique Idempotency Key (e.g. \`transaction_id\`) with requests.
• Store processed keys in Redis or a DB unique constraint.
• **Transactional Outbox Pattern**: Commit outgoing events in an Outbox DB table within the same transaction as entity changes.`
          },
          {
            q: 'How do you handle transactions across microservices (Saga patterns)?',
            short: "Use a Saga: a chain of local transactions coordinated by events or an orchestrator, with compensating actions to undo on failure.",
            explain: "There is no distributed ACID transaction, so each service commits locally and signals the next step. In choreography, services react to each other's events. In orchestration, a central coordinator tells each service what to do. If a later step fails, earlier steps are undone with compensating transactions such as refunding a payment or releasing stock.",
            a: `**Saga Pattern**: A sequence of local transactions coordinated via events:
• **Choreography**: Each service executes its local transaction and publishes events that trigger subsequent services.
• **Orchestration**: A central orchestrator service coordinates the exact transaction sequence.
• **Compensating Transactions**: If step 3 fails, the saga executes undo actions for steps 1 and 2 (e.g. refunding payment).`
          },
          {
            q: 'How do you design resilience for external API failures?',
            short: "Use timeouts, retries with exponential backoff and jitter, a circuit breaker to fail fast, and a fallback response (e.g. via Polly).",
            a: `Use the **Polly** resilience library:
• **Retry with Exponential Backoff & Jitter**: Avoids thundering herd.
• **Circuit Breaker**: Trips and fails fast when error rate exceeds threshold, protecting downstream services.
• **Fallback**: Returns cached or graceful default response.`
          },
          {
            q: 'How is scalability implemented?',
            short: "Scale stateless services horizontally behind a load balancer, cache hot reads, and scale the DB with replicas, pooling, and sharding.",
            a: `• **Horizontal Scaling (Scale Out)**: Stateless application containers behind load balancers.
• **Caching**: Redis cluster for hot read data.
• **Database Scaling**: Read replicas (CQRS), connection pooling, and database sharding.`
          }
        ]
      },
      {
        name: 'Design Patterns',
        questions: [
          {
            q: 'Explain and provide practical examples for the Singleton, Factory, and Repository patterns.',
            short: "Singleton gives one shared instance, Factory centralises object creation, and Repository abstracts data access.",
            parts: [
              { q: "Singleton?", a: "One instance app-wide, e.g. a shared `HttpClient` or config cache, usually via `AddSingleton`." },
              { q: "Factory?", a: "Creates the right implementation without exposing `new`, e.g. `PaymentGatewayFactory.Create(\"Stripe\")`." },
              { q: "Repository?", a: "A collection-like interface over storage, e.g. `IUserRepository.GetById(id)`, which keeps EF out of the domain." }
            ],
            a: `• **Singleton**: Ensures a class has only one instance with a global access point (e.g. \`HttpClient\`, database connection pool).
• **Factory**: Defines an interface for creating objects without exposing instantiation logic (e.g. \`PaymentGatewayFactory.Create("Stripe")\`).
• **Repository**: Mediates between domain logic and data access, exposing collection-like interfaces (\`IUserRepository\`).`
          },
          {
            q: 'Explain the Liskov Substitution Principle (LSP).',
            short: "Any subclass must be usable wherever its base class is expected without breaking correctness.",
            a: `Subtypes must be substitutable for their base types without altering application correctness. Violations occur when derived classes throw \`NotImplementedException\` or change expected base class contracts.`
          },
          {
            q: 'What is the KISS principle?',
            short: "\"Keep It Simple, Stupid\": prefer the simplest design that works and avoid unnecessary abstraction.",
            a: `**Keep It Simple, Stupid (KISS)**: Software systems work best when kept simple rather than made complicated. Avoid premature optimization, excessive abstractions, and unnecessary design patterns.`
          }
        ]
      },
      {
        name: 'Scenario-Based Design',
        questions: [
          {
            q: 'Design a chat application for 1 million users to load chat history quickly.',
            short: "WebSockets with a Redis pub/sub backplane for live messages, history in Cassandra partitioned by room and time, and the latest messages cached in Redis.",
            explain: "Clients hold WebSocket connections to stateless chat servers; Redis Pub/Sub fans messages out across servers. Messages are written to a wide-column store (Cassandra/ScyllaDB) partitioned by (room_id, month) and clustered by a time-ordered id descending, so the latest page is a single sequential read. The last ~50 messages per room are cached in Redis for instant open, and older history loads with cursor pagination.",
            a: `• **Live Chat**: WebSockets connected via Redis Pub/Sub backplane.
• **Chat History Storage**: Apache Cassandra / ScyllaDB partitioned by \`(room_id, bucket_month)\` and clustered by \`message_id (TimeUUID DESC)\` for instant reverse-chronological pagination.
• **Caching**: Redis cache storing the latest 50 messages per room.`
          },
          {
            q: 'Design an API to handle 10x more traffic.',
            short: "Scale stateless APIs horizontally, cache at the edge and in Redis, add read replicas (CQRS), and push heavy writes onto queues.",
            explain: "First measure where the bottleneck is. Make the API tier stateless and autoscale it on Kubernetes or App Service. Serve cacheable reads from a CDN or Redis, route reads to replicas, and keep the primary for writes. Move slow work (emails, reports, heavy writes) to Kafka or Service Bus workers. Add rate limiting and circuit breakers so spikes degrade gracefully.",
            a: `1. **Stateless API tier** scaled horizontally on Kubernetes.
2. **Edge CDN & Caching**: Cache static and read-heavy responses in Redis/Cloudflare.
3. **CQRS & Read Replicas**: Separate write DB from read replicas.
4. **Asynchronous Queuing**: Offload heavy write processing to Kafka/Service Bus workers.`
          },
          {
            q: 'BookMyShow Scenario: How do you prevent multiple users from booking seat A12 at the same time?',
            short: "Hold the seat with a short-lived Redis lock, then confirm with an optimistic-concurrency update that fails if someone else got it first.",
            explain: "When a user selects A12, `SET lock:seat:A12 <user> NX PX 600000` succeeds for only one user and reserves it for 10 minutes. At payment, update the row with `WHERE SeatId = 'A12' AND Version = @v`; if zero rows are affected, another booking won and you return a conflict. The lock handles the UX hold, and the DB check guarantees correctness.",
            a: `1. **Distributed Lock in Redis**: \`SET lock:seat:A12 user123 NX PX 600000\` (10-minute hold).
2. **Optimistic Concurrency Control**: DB table with a \`Version\` or \`RowVersion\` column:
   \`UPDATE Seats SET Status = 'Booked', Version = Version + 1 WHERE SeatId = 'A12' AND Status = 'Reserved' AND Version = @currentVer;\`
3. If rows affected == 0, another user acquired the seat; throw conflict exception.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. CLOUD (AZURE) & INTEGRATION
  // =========================================================================
  {
    id: 'cloud-azure',
    title: 'Cloud (Azure) & Integration',
    icon: 'Cloud',
    summary: 'Azure Functions, Logic Apps, Service Bus messaging, Dead Letter Queues, Key Vault, and API Management.',
    topics: [
      {
        name: 'Azure Functions & Logic Apps',
        questions: [
          {
            q: 'What is the difference between an Event Grid trigger and an Http trigger?',
            short: "An HTTP trigger is called directly on request; an Event Grid trigger fires when Azure pushes an event (e.g. blob created), with retries built in.",
            a: `• **HTTP Trigger**: Synchronously invoked via standard HTTP requests.
• **Event Grid Trigger**: Reactive push notification trigger for cloud events (Blob created, VM restarted) with built-in retry mechanisms and high fan-out.`
          },
          {
            q: 'How do you run Azure Functions in parallel?',
            short: "Use the Durable Functions fan-out/fan-in pattern: start many activity calls, then `await Task.WhenAll`.",
            a: `• Use **Durable Functions Fan-Out/Fan-In**:
\`\`\`csharp
var tasks = items.Select(item => context.CallActivityAsync("ProcessItem", item));
await Task.WhenAll(tasks);
\`\`\``
          },
          {
            q: 'How do you connect a Logic App to Azure Key Vault?',
            short: "Enable the Logic App's Managed Identity, grant it the Key Vault Secrets User role, and use the Key Vault connector.",
            a: `Enable **Managed Identity** on the Logic App, grant it the **Key Vault Secrets User** RBAC role on Key Vault, and use the built-in Azure Key Vault connector.`
          },
          {
            q: 'What are Cold Starts, and how do you minimize them?',
            short: "A cold start is the delay spinning up an idle serverless instance; reduce it with pre-warmed instances and a lighter startup.",
            parts: [
              { q: "What is a cold start?", a: "Extra latency on the first request after idle while a new host loads your app." },
              { q: "How do you minimise it?", a: "Premium/Flex plan with pre-warmed instances or Always On, fewer startup dependencies, and Native AOT." }
            ],
            a: `• **Cold Start**: Latency incurred when starting a new serverless container after an idle period.
• **Minimization**: Use Azure Functions **Premium Plan** (pre-warmed instances), enable \`Always On\`, reduce startup dependencies, or use **Native AOT** in .NET 8+.`
          }
        ]
      },
      {
        name: 'Azure Service Bus',
        questions: [
          {
            q: 'Azure Service Bus vs Azure Storage Queues?',
            short: "Storage Queues are cheap, simple queues; Service Bus is enterprise messaging with topics, sessions/FIFO, DLQ, dedupe, and transactions.",
            a: `• **Storage Queues**: Simple, low-cost FIFO queuing up to 64 KB messages; no pub/sub, no transaction support.
• **Service Bus**: Enterprise messaging supporting Topics/Subscriptions (Pub/Sub), FIFO Sessions, Dead-Letter Queues, message deduplication, and transactions.`
          },
          {
            q: 'How do you handle ordered message processing?',
            short: "Enable Service Bus Sessions: messages with the same `SessionId` are processed in order by one consumer at a time.",
            a: `Enable **Sessions** in Azure Service Bus. Messages with the same \`SessionId\` are guaranteed to be processed strictly in order by a single consumer at a time.`
          },
          {
            q: 'What is a DLQ (Dead-Letter Queue), and how do you process/recover messages from it?',
            short: "A DLQ is a sub-queue for messages that could not be processed; you inspect them, fix the cause, and replay them.",
            parts: [
              { q: "What is a DLQ?", a: "Where messages go after exceeding `MaxDeliveryCount`, expiring, or being explicitly dead-lettered." },
              { q: "How do you recover messages?", a: "Alert on DLQ depth, read `DeadLetterReason`, fix the bug or data, then resubmit the messages to the main queue." }
            ],
            a: `• **DLQ**: Sub-queue holding messages that exceed \`MaxDeliveryCount\` or TTL.
• **Recovery**: Alert via Azure Monitor -> Inspect DeadLetterReason -> Fix schema/system error -> Replay messages back to the main queue.`
          },
          {
            q: 'How do you handle poison messages and a growing backlog?',
            short: "Cap retries so poison messages move to the DLQ, and autoscale consumers on queue length.",
            parts: [
              { q: "Poison messages?", a: "Set `MaxDeliveryCount` (e.g. 5) so a bad message is dead-lettered instead of blocking the queue." },
              { q: "Growing backlog?", a: "Scale out consumers (KEDA / Functions scaling on queue length) and tune prefetch and concurrency." }
            ],
            a: `• Configure \`MaxDeliveryCount = 5\` so bad messages move to DLQ without blocking the queue.
• Auto-scale consumers using KEDA (Kubernetes Event-driven Autoscaling) based on queue backlog length.`
          },
          {
            q: 'If a message size increases from 5 KB to 5 MB, how do you handle it?',
            short: "Use the Claim-Check pattern: store the payload in Blob Storage and send only its reference in the message.",
            a: `**Claim-Check Pattern**: Store the 5 MB payload in Azure Blob Storage, and send only the blob URL/metadata in the Service Bus message.`
          }
        ]
      },
      {
        name: 'Security & Monitoring',
        questions: [
          {
            q: 'How do you implement OAuth 2.0 in Azure?',
            short: "Register the apps in Microsoft Entra ID, use the right flow (auth code or client credentials), and validate tokens with `Microsoft.Identity.Web`.",
            a: `Register applications in **Microsoft Entra ID (Azure AD)**, configure client credentials / authorization code flows, and validate JWT access tokens using \`Microsoft.Identity.Web\` middleware.`
          },
          {
            q: 'Managed Identity vs Client ID/Secret in Key Vault—how do you choose?',
            short: "Prefer Managed Identity: there are no secrets to store or rotate. Use a client secret only where Managed Identity is not available.",
            a: `Always prefer **Managed Identity** (System or User-Assigned) because it eliminates credentials in code and configuration, rotating tokens automatically.`
          },
          {
            q: 'How do you implement App Insights across multiple functions to differentiate logs?',
            short: "Use distributed tracing (W3C `traceparent`) for correlation and tag telemetry with a service name / cloud role name.",
            a: `Use **Distributed Tracing** with a shared \`W3C TraceContext\` (\`traceparent\`), adding custom properties (\`telemetry.Context.GlobalProperties["ServiceName"] = "BillingService"\`).`
          },
          {
            q: 'How do you add roles using RBAC?',
            short: "Assign built-in or custom roles to users, groups, or Managed Identities at resource, resource group, or subscription scope.",
            a: `Assign built-in or custom RBAC roles (e.g. *Key Vault Secrets Officer*, *Contributor*) to Microsoft Entra users or Managed Identities at the Resource, Resource Group, or Subscription scope.`
          }
        ]
      },
      {
        name: 'API Management (APIM)',
        questions: [
          {
            q: 'How do you manage APIM policies?',
            short: "Use XML policies at global, product, API, or operation scope, in `<inbound>`, `<backend>`, `<outbound>`, and `<on-error>` sections.",
            a: `Using XML policy documents at Global, Product, API, or Operation scopes across \`<inbound>\`, \`<backend>\`, \`<outbound>\`, and \`<on-error>\` blocks.`
          },
          {
            q: 'How do you handle API throttling/rate-limiting?',
            short: "Apply APIM's `rate-limit-by-key` (or `quota-by-key`) policy keyed by IP, subscription, or user.",
            a: `Use the \`<rate-limit-by-key>\` policy:
\`\`\`xml
<rate-limit-by-key calls="100" renewal-period="60" counter-key="@(context.Request.IpAddress)" />
\`\`\``
          },
          {
            q: 'How do you securely connect APIM to a Backend API to Azure SQL?',
            short: "Keep everything on a VNet with private endpoints, and use Managed Identity + Entra auth from the API to SQL, with no passwords.",
            a: `Place all components in an **Azure Virtual Network (VNet)**:
APIM -> Private Endpoint -> Backend App Service (with Managed Identity) -> Azure SQL (Private Endpoint with Entra Auth).`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. SQL & DATABASES
  // =========================================================================
  {
    id: 'sql-databases',
    title: 'SQL & Databases',
    icon: 'HardDrive',
    summary: 'Query optimization, indexing strategies, CTEs, ACID guarantees, transaction isolation, and Cosmos DB partitioning.',
    topics: [
      {
        name: 'Querying & Optimization',
        questions: [
          {
            q: 'How do you write a query to find the Nth highest salary?',
            short: "Rank with `DENSE_RANK() OVER (ORDER BY Salary DESC)` and pick rank N, or use `OFFSET N-1 ROWS FETCH NEXT 1`.",
            a: `\`\`\`sql
-- Using DENSE_RANK() Window Function
WITH RankedSalaries AS (
    SELECT Salary, DENSE_RANK() OVER (ORDER BY Salary DESC) AS RankNum
    FROM Employees
)
SELECT DISTINCT Salary FROM RankedSalaries WHERE RankNum = @N;

-- Alternative using OFFSET / FETCH
SELECT DISTINCT Salary
FROM Employees
ORDER BY Salary DESC
OFFSET (@N - 1) ROWS FETCH NEXT 1 ROWS ONLY;
\`\`\``
          },
          {
            q: 'Difference between `IEnumerable` and `IQueryable` (in the context of DB fetching)?',
            short: "`IQueryable` builds SQL that runs on the DB server; `IEnumerable` filters in app memory after the data is loaded.",
            a: `• **\`IQueryable\`**: Executes query on the **database server** (Expression Trees converted to SQL \`WHERE\`, \`TOP\`).
• **\`IEnumerable\`**: Executes query in **application memory** after loading all rows across the network.`
          },
          {
            q: 'How do you optimize an API fetching 1 million records?',
            short: "Never return them all at once: use keyset pagination, project only the needed columns, use covering indexes, and stream results.",
            a: `1. **Cursor/Keyset Pagination**: Avoid deep \`OFFSET\`.
2. **Explicit Projection**: Never use \`SELECT *\`.
3. **Covering Indexes**: Include all queried columns.
4. **Streaming**: Use \`IAsyncEnumerable\` with chunked JSON.`
          },
          {
            q: 'How do you optimize slow queries?',
            short: "Read the execution plan, add the right indexes, make predicates sargable, and keep statistics up to date.",
            a: `1. Inspect **Execution Plan** for Table Scans and Key Lookups.
2. Add composite/covering indexes on filter/join columns.
3. Eliminate non-sargable functions in \`WHERE\` (e.g. \`WHERE YEAR(Date) = 2024\` -> \`WHERE Date >= '2024-01-01'\`).
4. Update table statistics (\`UPDATE STATISTICS\`).`
          }
        ]
      },
      {
        name: 'Indexes & Constraints',
        questions: [
          {
            q: 'Clustered vs Non-Clustered Index—when to use each?',
            short: "The clustered index is the table's physical order (one per table); non-clustered indexes are separate lookup structures (many allowed).",
            parts: [
              { q: "When to use clustered?", a: "On the primary key or a column used for range scans and sorting." },
              { q: "When to use non-clustered?", a: "On foreign keys and frequently filtered or joined columns; add `INCLUDE` columns to cover queries." }
            ],
            a: `• **Clustered Index (1 per table)**: Dictates the physical storage order on disk. Leaf nodes contain the actual table rows. Best for Primary Keys and range queries.
• **Non-Clustered Index (Multiple)**: Separate B-tree structure storing index key values and pointers to table rows. Best for foreign keys and filter columns.`
          },
          {
            q: 'How does indexing improve query performance?',
            short: "A B-tree index turns O(N) table scans into O(log N) seeks.",
            a: `Indexes organize column data into balanced B-Tree structures, allowing queries to find records in **O(log N)** time via Index Seeks instead of **O(N)** full table scans.`
          },
          {
            q: 'Explain SQL constraints. Can different combinations of constraints/keys work together?',
            short: "Constraints enforce data integrity rules, and yes, a table can combine many of them.",
            parts: [
              { q: "What are constraints?", a: "`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`, and `DEFAULT`." },
              { q: "Can they be combined?", a: "Yes, e.g. a composite primary key plus several foreign keys, unique, and check constraints on one table." }
            ],
            a: `• **Constraints**: \`PRIMARY KEY\`, \`FOREIGN KEY\`, \`UNIQUE\`, \`CHECK\`, \`NOT NULL\`, \`DEFAULT\`.
• **Combinations**: Yes, a table can have a Composite Primary Key with multiple Foreign Keys and CHECK constraints validating data integrity simultaneously.`
          }
        ]
      },
      {
        name: 'Advanced SQL Concepts',
        questions: [
          {
            q: 'What is a CTE (Common Table Expression), and how does it differ from a Subquery?',
            short: "A CTE is a named, reusable temporary result set (`WITH ...`) that can be recursive; a subquery is an unnamed inline query.",
            parts: [
              { q: "What is a CTE?", a: "A named result set defined with `WITH name AS (...)` before the main query." },
              { q: "How is it different from a subquery?", a: "CTEs are more readable, can be referenced multiple times, and support recursion; subqueries are nested in place." }
            ],
            a: `• **CTE (\`WITH ... AS\`\)**: A named temporary result set defined at the top of a query. Enhances readability, can be referenced multiple times, and supports **recursion** (hierarchical parent-child traversal).
• **Subquery**: An inline nested query evaluated in place.`
          },
          {
            q: 'Difference between WHERE and HAVING?',
            short: "`WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.",
            a: `• **\`WHERE\`**: Filters individual rows **before** aggregation. Cannot use aggregate functions.
• **\`HAVING\`**: Filters aggregated groups **after** \`GROUP BY\` (e.g. \`HAVING COUNT(*) > 5\`).`
          },
          {
            q: "Why can't aggregate functions be used in a WHERE clause?",
            short: "Because `WHERE` runs before `GROUP BY`, so the aggregates do not exist yet.",
            a: `Because the SQL logical query processing order evaluates the \`WHERE\` clause **before** grouping and aggregations (\`FROM\` -> \`WHERE\` -> \`GROUP BY\` -> \`HAVING\` -> \`SELECT\`).`
          },
          {
            q: 'Stored Procedure vs Function?',
            short: "Procedures can change data and manage transactions (called with `EXEC`); functions return a value or table, cannot modify data, and can be used in `SELECT`.",
            a: `• **Stored Procedure**: Can execute DDL/DML, manage transactions, return multiple result sets or output parameters, invoked with \`EXEC\`.
• **Function (UDF)**: Must return a single value or table, cannot modify database state (no DML), can be used directly in \`SELECT\` / \`JOIN\` statements.`
          }
        ]
      },
      {
        name: 'Transactions & NoSQL',
        questions: [
          {
            q: 'Explain transaction isolation and ACID properties.',
            short: "ACID guarantees reliable transactions; isolation levels trade consistency against concurrency.",
            parts: [
              { q: "What is ACID?", a: "Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (survives crashes)." },
              { q: "What are the isolation levels?", a: "Read Uncommitted, then Read Committed (the default), Repeatable Read, and Serializable, each preventing more anomalies; Snapshot uses row versioning." }
            ],
            a: `• **ACID**: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrency control), Durability (persisted on disk).
• **Isolation Levels**: \`Read Uncommitted\` (dirty reads), \`Read Committed\` (default), \`Repeatable Read\` (prevents non-repeatable reads), \`Serializable\` (prevents phantom reads), \`Snapshot\` (row versioning).`
          },
          {
            q: 'How do you ensure a DML statement executes entirely or not at all?',
            short: "Wrap it in `BEGIN TRAN` with `TRY/CATCH`: `COMMIT` on success, `ROLLBACK` on error.",
            a: `Wrap the operations inside a database transaction:
\`\`\`sql
BEGIN TRANSACTION;
BEGIN TRY
    UPDATE Accounts SET Balance = Balance - 100 WHERE Id = 1;
    UPDATE Accounts SET Balance = Balance + 100 WHERE Id = 2;
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    THROW;
END CATCH;
\`\`\``
          },
          {
            q: 'Cosmos DB: Why use it, which partition key to choose, and what are its disadvantages?',
            short: "A globally distributed, low-latency NoSQL database; pick a high-cardinality, evenly used partition key; watch out for RU costs and cross-partition limits.",
            parts: [
              { q: "Why use it?", a: "Global distribution, single-digit-ms latency SLAs, elastic scale, and tunable consistency." },
              { q: "Which partition key?", a: "A high-cardinality key that spreads reads and writes evenly and matches your main query, e.g. `userId` or `tenantId`." },
              { q: "Disadvantages?", a: "Cross-partition queries are RU-expensive, there are no cross-partition transactions, and costs can be hard to predict." }
            ],
            a: `• **Why**: Globally distributed NoSQL with single-digit millisecond latency SLAs and tunable consistency models.
• **Partition Key**: Choose a high-cardinality key with even distribution of reads/writes (e.g. \`userId\`, \`tenantId\`).
• **Disadvantages**: Cross-partition queries are expensive in Request Units (RUs); no cross-partition ACID transactions.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. FRONTEND (ANGULAR & REACT)
  // =========================================================================
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
            q: 'What are Pipes, and how do you create a custom one?',
            short: "Pipes transform values in templates; create one with `@Pipe` and a class implementing `PipeTransform.transform()`.",
            parts: [
              { q: "What are Pipes?", a: "Template formatters like `{{ price | currency }}` or `date`." },
              { q: "How do you create one?", a: "Decorate a class with `@Pipe({ name, standalone: true })`, implement `transform(value, ...args)`, and import it where it is used." }
            ],
            a: `**Pipes** transform displayed values in templates (\`{{ price | currency }}\`).
\`\`\`typescript
@Pipe({ name: 'exponential', standalone: true })
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}
\`\`\``
          },
          {
            q: 'What are Signals?',
            short: "Angular's reactive primitives (`signal`, `computed`, `effect`) that update only the exact parts of the view that depend on them.",
            a: `**Signals (Angular 16+)** provide reactive state management with fine-grained dependency tracking. Angular updates only the exact DOM elements that depend on a changed signal, bypassing full Zone.js tree traversal.`
          },
          {
            q: 'What are standalone components?',
            short: "Components that import their own dependencies directly, with no `NgModule` needed.",
            a: `Components that do not require an \`@NgModule\`. They import their dependencies directly in the \`imports\` array, simplifying module architecture and enabling tree-shaking.`
          },
          {
            q: 'Explain Angular/NgRx flow.',
            short: "The component dispatches an Action, Effects handle side effects, Reducers produce new state, and Selectors feed it back to the component.",
            a: `1. **Component** dispatches an **Action**.
2. **Effects** listen for actions, execute async HTTP calls, and dispatch success/failure actions.
3. **Reducers** compute the new immutable State.
4. **Selectors** query state slices as RxJS Observables for components.`
          },
          {
            q: 'How does Angular connect with a backend API?',
            short: "Through `HttpClient` (Observables), with interceptors for auth tokens and global error handling.",
            a: `Using **\`HttpClient\`** (providing RxJS Observables) configured with **HTTP Interceptors** for JWT token injection and global error handling.`
          },
          {
            q: 'Explain Dependency Injection in Angular modules, two-way binding, and lifecycle hooks.',
            short: "DI supplies services through a hierarchical injector, two-way binding syncs a model and the view, and lifecycle hooks run at component stages.",
            parts: [
              { q: "Dependency Injection?", a: "Services marked `@Injectable({ providedIn: 'root' })` are injected via the constructor or `inject()`." },
              { q: "Two-way binding?", a: "`[(ngModel)]` (banana-in-a-box) combines `[property]` and `(event)` binding." },
              { q: "Lifecycle hooks?", a: "`ngOnChanges`, `ngOnInit`, `ngDoCheck`, `ngAfterViewInit`, and `ngOnDestroy` (cleanup)." }
            ],
            a: `• **DI**: Hierarchical injector tree providing services via \`@Injectable({ providedIn: 'root' })\`.
• **Two-Way Binding**: \`[(ngModel)]="username"\` (combines property binding \`[]\` and event binding \`()\`).
• **Lifecycle Hooks**: \`ngOnInit\`, \`ngOnChanges\`, \`ngDoCheck\`, \`ngAfterViewInit\`, \`ngOnDestroy\`.`
          },
          {
            q: 'What are Guards?',
            short: "Router hooks that allow or block navigation, e.g. `CanActivate` for auth or `CanDeactivate` for unsaved changes.",
            a: `Route middleware controlling navigation: \`CanActivate\` (auth checks), \`CanDeactivate\` (unsaved form warnings), \`CanMatch\`, \`Resolve\`.`
          },
          {
            q: 'What are `@Input()` and `@Output()`?',
            short: "`@Input` passes data from parent to child; `@Output` emits events from child to parent.",
            parts: [
              { q: "`@Input()`?", a: "A property the parent binds into: `<child [user]=\"u\">`." },
              { q: "`@Output()`?", a: "An `EventEmitter` the parent listens to: `<child (saved)=\"onSave($event)\">`." }
            ],
            a: `• **\`@Input()\`**: Passes data from a parent component down to a child.
• **\`@Output()\`**: Emits events from a child up to the parent using \`EventEmitter\`.`
          }
        ]
      },
      {
        name: 'React',
        questions: [
          {
            q: 'Explain React Hooks.',
            short: "Functions (`useState`, `useEffect`, etc.) that give function components state and lifecycle behaviour; call them only at the top level.",
            a: `Functions that let functional components use state and lifecycle features without writing classes (\`useState\`, \`useEffect\`, \`useContext\`, \`useReducer\`, \`useRef\`). Must be called at the top level.`
          },
          {
            q: '`useMemo` vs `useCallback`?',
            short: "`useMemo` caches a computed value; `useCallback` caches a function reference.",
            a: `• **\`useMemo\`**: Caches the **computed result** of an expensive function.
• **\`useCallback\`**: Caches the **function definition instance** itself to prevent re-rendering child components.`
          },
          {
            q: '`useState` vs `useEffect`?',
            short: "`useState` holds state that triggers re-renders; `useEffect` runs side effects after render.",
            a: `• **\`useState\`**: Declares reactive state variables that trigger UI re-renders on change.
• **\`useEffect\`**: Performs side effects (fetching data, DOM listeners, timers) synchronized with component state.`
          },
          {
            q: 'What is prop drilling?',
            short: "Passing props through many components that do not use them; fix it with Context, Zustand, or Redux.",
            a: `Passing props down through multiple layers of intermediate components that do not need them. Solved via **React Context API**, **Zustand**, or **Redux Toolkit**.`
          },
          {
            q: 'Explain lifecycle methods and routing.',
            short: "`useEffect` covers mount, update, and unmount; `react-router` handles client-side routing.",
            parts: [
              { q: "Lifecycle?", a: "`useEffect(fn, [])` runs on mount, `[dep]` on update, and the returned cleanup on unmount." },
              { q: "Routing?", a: "`react-router-dom` with `<Routes>`, `<Route>`, `<Link>`, and `useNavigate()`." }
            ],
            a: `• In functional React, \`useEffect(() => {}, [])\` represents mounting, \`useEffect(() => {}, [dep])\` represents updating, and the return cleanup function represents unmounting.
• **Routing**: Handled via \`react-router-dom\` with \`<Routes>\`, \`<Route>\`, and \`useNavigate()\`.`
          },
          {
            q: 'How do you implement lazy loading and Error Boundaries?',
            short: "Lazy loading uses `React.lazy` + `<Suspense>`; an Error Boundary is a component that catches render errors in its children.",
            parts: [
              { q: "Lazy loading?", a: "`const Page = React.lazy(() => import('./Page'))` wrapped in `<Suspense fallback={...}>`." },
              { q: "Error Boundaries?", a: "A class component with `getDerivedStateFromError` / `componentDidCatch` that renders a fallback UI." }
            ],
            a: `• **Lazy Loading**: \`const Component = React.lazy(() => import('./Component'))\` wrapped in \`<Suspense fallback={<Spinner />}>\`.
• **Error Boundaries**: Class components implementing \`componentDidCatch\` / \`getDerivedStateFromError\` to catch JavaScript runtime errors in child trees.`
          },
          {
            q: 'How do you improve React performance?',
            short: "Code-split, memoise (`React.memo`, `useMemo`, `useCallback`), virtualise long lists, and keep state local.",
            a: `1. Code splitting with \`React.lazy\`.
2. Memoization with \`React.memo\`, \`useMemo\`, \`useCallback\`.
3. Virtualize long lists (\`react-window\`).
4. Keep state localized to prevent unnecessary parent re-renders.`
          },
          {
            q: 'Scenario: Build a search component that waits 400ms after typing stops before calling an API. Handle query length validation, loading states, and aborting older slow requests.',
            short: "In a `useEffect` on `query`, set a 400ms timeout and an `AbortController`; the cleanup clears the timer and aborts the old request.",
            parts: [
              { q: "How do you debounce by 400ms?", a: "`setTimeout` inside `useEffect`, cleared by the cleanup function every time the query changes." },
              { q: "How do you validate query length?", a: "If `query.trim().length < 3`, clear the results and return early without calling the API." },
              { q: "How do you show loading?", a: "Set `loading` to true before `fetch` and back to false in `finally`." },
              { q: "How do you abort older requests?", a: "Pass `controller.signal` to `fetch` and call `controller.abort()` in the cleanup; ignore `AbortError`." }
            ],
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
      controller.abort(); // Cancel pending request if user types again
    };
  }, [query]);

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search items (min 3 chars)..." 
      />
      {loading && <p>Searching...</p>}
      <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
    </div>
  );
}
\`\`\``
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. DATA STRUCTURES & PROBLEM SOLVING
  // =========================================================================
  {
    id: 'dsa-problems',
    title: 'Data Structures & Problem Solving',
    icon: 'Cpu',
    summary: 'Strings, arrays, algorithms, two pointers, sliding window, and sensor logistics challenges.',
    topics: [
      {
        name: 'Strings',
        questions: [
          {
            q: 'Reverse words in a string.',
            short: "Split on spaces (dropping empties), reverse the array, and join with single spaces. O(n).",
            a: `\`\`\`csharp
public static string ReverseWords(string s) {
    var words = s.Split(' ', StringSplitOptions.RemoveEmptyEntries);
    Array.Reverse(words);
    return string.Join(" ", words);
}
\`\`\`
Time: O(n), Space: O(n).`
          },
          {
            q: 'Find occurrences of each character.',
            short: "Loop once and increment a `Dictionary<char, int>` count per character. O(n).",
            a: `\`\`\`csharp
public static Dictionary<char, int> CharCounts(string s) {
    Dictionary<char, int> counts = new();
    foreach (char c in s) counts[c] = counts.GetValueOrDefault(c) + 1;
    return counts;
}
\`\`\``
          },
          {
            q: 'Find the first non-repeating character.',
            short: "Count all characters in one pass, then return the first one with count 1 in a second pass. O(n).",
            a: `\`\`\`csharp
public static char? FirstNonRepeating(string s) {
    Dictionary<char, int> counts = new();
    foreach (char c in s) counts[c] = counts.GetValueOrDefault(c) + 1;
    foreach (char c in s) {
        if (counts[c] == 1) return c;
    }
    return null;
}
\`\`\``
          },
          {
            q: 'Check if a string is a palindrome.',
            short: "Two pointers moving inward, skipping non-alphanumerics and comparing case-insensitively. O(n), O(1) space.",
            a: `\`\`\`csharp
public static bool IsPalindrome(string s) {
    int left = 0, right = s.Length - 1;
    while (left < right) {
        while (left < right && !char.IsLetterOrDigit(s[left])) left++;
        while (left < right && !char.IsLetterOrDigit(s[right])) right--;
        if (char.ToLower(s[left]) != char.ToLower(s[right])) return false;
        left++; right--;
    }
    return true;
}
\`\`\``
          },
          {
            q: 'Check for anagrams.',
            short: "Same length, and a 26-slot count array (++ for s, -- for t) that ends all zeros. O(n).",
            a: `\`\`\`csharp
public static bool IsAnagram(string s, string t) {
    if (s.Length != t.Length) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.Length; i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    return count.All(c => c == 0);
}
\`\`\``
          },
          {
            q: 'Remove duplicate characters.',
            short: "Keep the first occurrence of each character, e.g. `new string(s.Distinct().ToArray())` or a `HashSet` loop.",
            a: `\`\`\`csharp
public static string RemoveDuplicates(string s) {
    return new string(s.Distinct().ToArray());
}
\`\`\``
          },
          {
            q: 'Remove all white spaces.',
            short: "Filter out characters where `char.IsWhiteSpace(c)` and rebuild the string.",
            a: `\`\`\`csharp
public static string RemoveWhitespace(string s) {
    return new string(s.Where(c => !char.IsWhiteSpace(c)).ToArray());
}
\`\`\``
          },
          {
            q: 'Find the longest palindromic substring.',
            short: "Expand around each centre (odd and even) and keep the longest span. O(n²) time, O(1) space.",
            explain: "Every palindrome mirrors around a centre, and there are 2n-1 centres (each character and each gap). For each centre, expand outward while the characters match, and record the best start and end. This avoids an O(n²) DP table.",
            a: `\`\`\`csharp
public static string LongestPalindrome(string s) {
    if (string.IsNullOrEmpty(s)) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.Length; i++) {
        int len1 = ExpandAroundCenter(s, i, i);
        int len2 = ExpandAroundCenter(s, i, i + 1);
        int len = Math.Max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.Substring(start, end - start + 1);
}

private static int ExpandAroundCenter(string s, int left, int right) {
    while (left >= 0 && right < s.Length && s[left] == s[right]) {
        left--; right++;
    }
    return right - left - 1;
}
\`\`\`
Time: O(n²), Space: O(1).`
          },
          {
            q: 'Longest substring without repeating characters.',
            short: "Sliding window: track each character's last index and jump the left edge past a repeat. O(n).",
            explain: "Move `right` across the string. If the current character was seen inside the window, move `left` to one past its last position (never backwards). Update its last index and take the max of `right - left + 1`.",
            a: `\`\`\`csharp
public static int LengthOfLongestSubstring(string s) {
    Dictionary<char, int> seen = new();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.Length; right++) {
        if (seen.ContainsKey(s[right])) {
            left = Math.Max(left, seen[s[right]] + 1);
        }
        seen[s[right]] = right;
        maxLen = Math.Max(maxLen, right - left + 1);
    }
    return maxLen;
}
\`\`\`
Time: O(n), Space: O(min(n, alphabet)).`
          },
          {
            q: 'Format a string (e.g., input 1235469875 to 12XX46XX75).',
            short: "Convert to a char array and overwrite positions 2, 3, 6, and 7 with `X`.",
            a: `\`\`\`csharp
public static string FormatMaskString(string input) {
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
            q: 'Find two numbers that add up to a target (Two Sum).',
            short: "One pass with a hash map from value to index: if `target - n` is already in the map, return both indices. O(n).",
            a: `\`\`\`csharp
public static int[] TwoSum(int[] nums, int target) {
    Dictionary<int, int> map = new();
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.ContainsKey(complement)) {
            return new int[] { map[complement], i };
        }
        map[nums[i]] = i;
    }
    return Array.Empty<int>();
}
\`\`\`
Time: O(n), Space: O(n).`
          },
          {
            q: 'Max sum of a contiguous subarray of size K.',
            short: "Fixed sliding window: sum the first K, then add the new element and drop the old one each step. O(n).",
            a: `\`\`\`csharp
public static int MaxSubArrayK(int[] nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    int maxSum = windowSum;
    for (int i = k; i < nums.Length; i++) {
        windowSum += nums[i] - nums[i - k];
        maxSum = Math.Max(maxSum, windowSum);
    }
    return maxSum;
}
\`\`\`
Sliding Window: Time O(n), Space O(1).`
          },
          {
            q: 'Sort an array with 3 unique values: 0, 1, 2 (Dutch National Flag).',
            short: "Three pointers (low, mid, high): swap 0s to the front and 2s to the back in one pass. O(n), O(1) space.",
            explain: "Everything before `low` is 0, between `low` and `mid` is 1, and after `high` is 2. If `nums[mid]` is 0, swap it with `low` and advance both. If it is 1, just advance `mid`. If it is 2, swap it with `high` and shrink `high` without advancing `mid`, because the swapped-in value is not yet checked.",
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
Time: O(n) single pass, Space: O(1).`
          },
          {
            q: 'Move zeroes to the end.',
            short: "Keep a write pointer and swap each non-zero element forward; the zeros end up at the back. O(n), O(1).",
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
          },
          {
            q: 'Left/Right rotate an array by K places.',
            short: "Use the reverse trick: reverse the whole array, then reverse each part. O(n), O(1).",
            parts: [
              { q: "Right rotate by K?", a: "`k %= n`; reverse all, reverse `[0..k-1]`, reverse `[k..n-1]`." },
              { q: "Left rotate by K?", a: "Same as right-rotating by `n - k`, or reverse `[0..k-1]`, reverse `[k..n-1]`, then reverse all." }
            ],
            a: `\`\`\`csharp
// Right rotate by K places
public static void Rotate(int[] nums, int k) {
    k %= nums.Length;
    Reverse(nums, 0, nums.Length - 1);
    Reverse(nums, 0, k - 1);
    Reverse(nums, k, nums.Length - 1);
}

private static void Reverse(int[] nums, int start, int end) {
    while (start < end) {
        (nums[start], nums[end]) = (nums[end], nums[start]);
        start++; end--;
    }
}
\`\`\`
Time: O(n), Space: O(1).`
          },
          {
            q: 'Find the max number.',
            short: "Scan once, keeping the largest value seen (or `nums.Max()`). O(n).",
            a: `\`\`\`csharp
public static int FindMax(int[] nums) {
    int max = nums[0];
    foreach (int num in nums) if (num > max) max = num;
    return max;
}
\`\`\``
          },
          {
            q: 'Reverse a number without converting to a string.',
            short: "Repeatedly take `x % 10`, append it with `rev = rev * 10 + digit`, and divide `x` by 10, checking for overflow.",
            explain: "Before multiplying `rev` by 10, check that it would not exceed `int.MaxValue` or `int.MinValue`; return 0 if it would. This works for negatives because C#'s `%` keeps the sign.",
            a: `\`\`\`csharp
public static int ReverseInteger(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10;
        x /= 10;
        // Check for 32-bit overflow
        if (rev > int.MaxValue / 10 || (rev == int.MaxValue / 10 && pop > 7)) return 0;
        if (rev < int.MinValue / 10 || (rev == int.MinValue / 10 && pop < -8)) return 0;
        rev = rev * 10 + pop;
    }
    return rev;
}
\`\`\``
          },
          {
            q: 'Find the second highest distinct number in an array.',
            short: "Track `first` and `second` in one pass, ignoring values equal to `first`. O(n), O(1).",
            a: `\`\`\`csharp
public static int? SecondHighest(int[] nums) {
    int? first = null, second = null;
    foreach (int n in nums) {
        if (first == null || n > first) {
            second = first;
            first = n;
        } else if (n != first && (second == null || n > second)) {
            second = n;
        }
    }
    return second;
}
\`\`\`
Time: O(n), Space: O(1).`
          },
          {
            q: 'Array modification (e.g., `[1, 2, 3, 4, 5, 6]` to `[5, 6, 1, 2, 3, 4]`).',
            short: "This is a right rotation by 2: element `i` moves to `(i + 2) % n`.",
            a: `\`\`\`csharp
// Equivalent to right-rotating by 2 positions
public static int[] ModifyArray(int[] nums, int shift = 2) {
    int[] result = new int[nums.Length];
    for (int i = 0; i < nums.Length; i++) {
        result[(i + shift) % nums.Length] = nums[i];
    }
    return result;
}
\`\`\``
          }
        ]
      },
      {
        name: 'Algorithms & Logic',
        questions: [
          {
            q: 'Valid Parentheses (LIFO).',
            short: "Push the expected closing bracket for each opener; every closer must match the popped value, and the stack must end empty. O(n).",
            a: `\`\`\`csharp
public static bool IsValidParentheses(string s) {
    Stack<char> stack = new();
    foreach (char c in s) {
        if (c == '(') stack.Push(')');
        else if (c == '{') stack.Push('}');
        else if (c == '[') stack.Push(']');
        else if (stack.Count == 0 || stack.Pop() != c) return false;
    }
    return stack.Count == 0;
}
\`\`\`
Time: O(n), Space: O(n).`
          },
          {
            q: 'Bubble Sort.',
            short: "Repeatedly swap adjacent out-of-order pairs, stopping early if a pass makes no swaps. O(n²).",
            a: `\`\`\`csharp
public static void BubbleSort(int[] arr) {
    for (int i = 0; i < arr.Length - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < arr.Length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
\`\`\`
Time: O(n²), Space: O(1).`
          },
          {
            q: 'Basic algorithms: Prime, Factorial, Fibonacci.',
            short: "Prime: trial-divide up to √n. Factorial: multiply 2..n. Fibonacci: iterate with two variables.",
            parts: [
              { q: "Is it prime?", a: "Handle n ≤ 3, reject multiples of 2 and 3, then test `i` and `i + 2` for i = 5, 11, 17… while `i * i <= n`. O(√n)." },
              { q: "Factorial?", a: "Loop multiplying 2..n into a `long` (or `BigInteger` for large n). O(n)." },
              { q: "Fibonacci?", a: "Keep `a, b = 0, 1` and roll forward n times. O(n) time, O(1) space; avoid naive recursion, which is O(2ⁿ)." }
            ],
            a: `\`\`\`csharp
// IsPrime
public static bool IsPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

// Factorial (Iterative)
public static long Factorial(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Fibonacci (O(n) Time, O(1) Space)
public static int Fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}
\`\`\``
          },
          {
            q: 'Number series prediction (finding the next number in a sequence).',
            short: "Test for a constant difference (arithmetic), then a constant ratio (geometric), and otherwise extrapolate from the last difference.",
            explain: "If every consecutive difference is equal, the next term is last + diff. Otherwise, if every consecutive ratio is equal, it is last × ratio. For other patterns (squares, Fibonacci-like), look at second differences or the sum of the previous terms, and ask the interviewer which patterns to support.",
            a: `\`\`\`csharp
public static int PredictNext(int[] series) {
    // Check Arithmetic Progression (AP)
    int diff = series[1] - series[0];
    bool isAP = true;
    for (int i = 2; i < series.Length; i++) {
        if (series[i] - series[i - 1] != diff) { isAP = false; break; }
    }
    if (isAP) return series[^1] + diff;

    // Check Geometric Progression (GP)
    if (series[0] != 0 && series[1] % series[0] == 0) {
        int ratio = series[1] / series[0];
        bool isGP = true;
        for (int i = 2; i < series.Length; i++) {
            if (series[i - 1] == 0 || series[i] / series[i - 1] != ratio) { isGP = false; break; }
        }
        if (isGP) return series[^1] * ratio;
    }

    // Default: polynomial second difference extrapolation
    return series[^1] + (series[^1] - series[^2]);
}
\`\`\``
          },
          {
            q: 'Logistics Challenge: Given unsorted logs from 3 highway sensors (ENTRY, MAINROAD, EXIT) with license plates and timestamps, determine how many complete highway journeys each vehicle made.',
            short: "Sort logs by time, then run a per-plate state machine ENTRY → MAINROAD → EXIT, counting a journey on each valid EXIT. O(N log N).",
            explain: "After sorting, keep a state per plate: 0 = none, 1 = entered, 2 = on the main road. ENTRY always (re)starts a journey, MAINROAD advances only from state 1, and EXIT counts a journey only from state 2, then resets. Out-of-order or missing readings do not produce false journeys. Sorting dominates at O(N log N); space is O(unique plates).",
            a: `**Problem Analysis**: A complete journey requires a vehicle to trigger \`ENTRY\` -> \`MAINROAD\` -> \`EXIT\` in chronological order (\`t_entry < t_main < t_exit\`).

\`\`\`csharp
public class SensorLog {
    public string Plate { get; set; }
    public string SensorType { get; set; } // "ENTRY", "MAINROAD", "EXIT"
    public DateTime Timestamp { get; set; }
}

public static Dictionary<string, int> CountCompletedJourneys(List<SensorLog> logs) {
    // 1. Sort all logs chronologically
    var sortedLogs = logs.OrderBy(l => l.Timestamp).ToList();
    
    // 2. Track vehicle state: 0 = None, 1 = Entered, 2 = On Mainroad
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
Time: O(N log N) sort + O(N) scan. Space: O(U) unique vehicles.`
          }
        ]
      }
    ]
  }
];
