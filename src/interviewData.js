export const DSA_PROBLEMS = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hash Maps',
    companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Microsoft'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    hints: [
      'Can you solve it in a single pass using a hash map to store complements?',
      'For each number x, calculate complement = target - x. Check if complement already exists in the map.',
      'Store key = number, value = index.'
    ],
    approaches: [
      {
        name: 'Hash Map (Single Pass)',
        explanation: 'We iterate through the array once. For each element `nums[i]`, we compute `target - nums[i]`. If the complement exists in our map, we immediately return the stored index and current index. Otherwise, we record the current number and index in the map.'
      }
    ],
    solutions: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`
    }
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    category: 'Design & Linked Lists',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    timeComplexity: 'O(1) for get & put',
    spaceComplexity: 'O(capacity)',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with `get(key)` and `put(key, value)` both running in O(1) average time complexity.',
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'Cache capacity is 2. Evicts least recently accessed items when capacity is exceeded.'
      }
    ],
    hints: [
      'To achieve O(1) lookup, use a Hash Map.',
      'To achieve O(1) removal and insertion of the most/least recently used items, use a Doubly Linked List with dummy head and tail nodes.',
      'When an item is accessed (get/put), move its node to the head of the list. When capacity is exceeded, remove the node from the tail.'
    ],
    approaches: [
      {
        name: 'Hash Map + Doubly Linked List',
        explanation: 'The Hash Map maps keys directly to Doubly Linked List nodes. The Doubly Linked List maintains access order. Head represents the most recently used, and tail represents the least recently used. Dummy head and tail nodes eliminate null edge cases.'
      }
    ],
    solutions: {
      javascript: `class Node {
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _insertAtHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._insertAtHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    }
    const newNode = new Node(key, value);
    this._insertAtHead(newNode);
    this.map.set(key, newNode);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }
}`,
      python: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            self._remove(self.cache[key])
            self._insert(self.cache[key])
            return self.cache[key].val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._insert(node)
        self.cache[key] = node
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      java: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    private int capacity;
    private Map<Integer, Node> map = new HashMap<>();
    private Node head = new Node(0, 0), tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insert(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        Node node = new Node(key, value);
        insert(node);
        map.put(key, node);
        if (map.size() > capacity) {
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key);
        }
    }
}`
    }
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers & Arrays',
    companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Goldman Sachs'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are trapped.'
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9',
        explanation: 'Water trapped across troughs totals 9 units.'
      }
    ],
    hints: [
      'The water trapped above any bar `i` is determined by `min(maxLeft, maxRight) - height[i]`.',
      'Instead of computing prefix and suffix max arrays (which takes O(n) space), can you use two pointers moving inward from left and right?'
    ],
    approaches: [
      {
        name: 'Two Pointers (Optimal)',
        explanation: 'Initialize `left = 0`, `right = n - 1`, `leftMax = 0`, `rightMax = 0`. Whichever side has a smaller max boundary dictates the trapped water level, because the opposite side is guaranteed to be taller or equal.'
      }
    ],
    solutions: {
      javascript: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  return water;
}`,
      python: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    l, r = 0, len(height) - 1
    l_max, r_max = height[l], height[r]
    res = 0
    while l < r:
        if l_max < r_max:
            l += 1
            l_max = max(l_max, height[l])
            res += l_max - height[l]
        else:
            r -= 1
            r_max = max(r_max, height[r])
            res += r_max - height[r]
    return res`,
      java: `public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`
    }
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs & Topological Sort',
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber', 'Twitter'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`. Return `true` if you can finish all courses, or `false` otherwise.',
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation: 'There are 2 courses to take. To take course 1 you should have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        output: 'false',
        explanation: 'There are 2 courses to take. Course 1 requires 0, and course 0 requires 1. A cycle exists!'
      }
    ],
    hints: [
      'This problem is equivalent to finding if a cycle exists in a directed graph.',
      'You can use BFS (Kahn\'s Algorithm with in-degrees) or DFS with 3-color cycle detection (unvisited, visiting, visited).'
    ],
    approaches: [
      {
        name: 'Kahn\'s Algorithm (BFS In-Degree)',
        explanation: 'Compute in-degrees for all nodes. Queue all nodes with in-degree 0. While processing, decrement neighbors\' in-degrees and queue nodes that reach 0. If total visited count equals numCourses, no cycle exists.'
      }
    ],
    solutions: {
      javascript: `function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adj = Array.from({ length: numCourses }, () => []);

  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return count === numCourses;
}`,
      python: `from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    in_degree = [0] * numCourses
    adj = [[] for _ in range(numCourses)]
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1
        
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    visited = 0
    while q:
        curr = q.popleft()
        visited += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)
                
    return visited == numCourses`,
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    int[] inDegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    
    for (int[] p : prerequisites) {
        adj.get(p[1]).add(p[0]);
        inDegree[p[0]]++;
    }
    
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) queue.offer(i);
    }
    
    int count = 0;
    while (!queue.isEmpty()) {
        int node = queue.poll();
        count++;
        for (int neighbor : adj.get(node)) {
            if (--inDegree[neighbor] == 0) queue.offer(neighbor);
        }
    }
    return count == numCourses;
}`
    }
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Intervals & Sorting',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Bloomberg'],
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      }
    ],
    hints: [
      'Sorting intervals by their starting times makes overlap detection trivial.',
      'Iterate through the sorted intervals. If the current interval start is <= last merged interval end, expand the end: `last.end = max(last.end, current.end)`.'
    ],
    approaches: [
      {
        name: 'Sort & Linear Merge',
        explanation: 'Sort by interval start time. Keep track of merged list. Compare each new interval with the tail of the merged list.'
      }
    ],
    solutions: {
      javascript: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}`,
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`,
      java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> merged = new ArrayList<>();
    for (int[] interval : intervals) {
        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
            merged.add(interval);
        } else {
            merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`
    }
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    companies: ['Amazon', 'Microsoft', 'Google', 'Apple', 'Meta'],
    timeComplexity: 'O(amount * n)',
    spaceComplexity: 'O(amount)',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.',
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total).'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
        explanation: 'Amount 3 cannot be formed with denomination 2.'
      }
    ],
    hints: [
      'Think bottom-up DP. Let `dp[i]` be minimum coins to make amount `i`.',
      'For every coin `c`, `dp[i] = min(dp[i], dp[i - c] + 1)`.',
      'Initialize array with `Infinity` (or `amount + 1`) and `dp[0] = 0`.'
    ],
    approaches: [
      {
        name: 'Bottom-Up Tabulation',
        explanation: 'Compute `dp[1...amount]` iteratively by checking all valid coin denominations.'
      }
    ],
    solutions: {
      javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    }
  }
];

export const SYSTEM_DESIGN_TOPICS = [
  {
    id: 'tinyurl',
    title: 'Design a URL Shortener (TinyURL)',
    scale: '100M URLs created/day · 1B redirects/day',
    difficulty: 'Foundational',
    tags: ['Hashing', 'Base62', 'Caching', 'Database Sharding'],
    overview: 'Design a scalable service that converts long URLs into unique short aliases (e.g. `tinyurl.com/a9Z1xP`) and redirects HTTP GET requests with minimal latency (<15ms).',
    requirements: {
      functional: [
        'Given a long URL, generate a unique short alias (6-8 characters).',
        'When accessing a short alias, redirect the user to the original long URL with 301/302 HTTP status.',
        'Support optional custom aliases and expiration timestamps.',
        'Track analytics (click counts, referrers, geolocations).'
      ],
      nonFunctional: [
        'High availability (99.99%) - redirection service cannot go down.',
        'Ultra-low read latency (< 15ms).',
        'Read-heavy system: 10:1 Read to Write ratio.',
        'Short links must not be easily guessable (security/scraping defense).'
      ]
    },
    capacityEstimation: [
      { metric: 'Write QPS', value: '100M / 86,400s ≈ 1,160 writes/sec (Peak ~2,500/s)' },
      { metric: 'Read QPS', value: '1B / 86,400s ≈ 11,600 reads/sec (Peak ~25,000/s)' },
      { metric: 'Storage (5 Years)', value: '100M * 365 * 5 = 182.5B URLs * 500 bytes ≈ ~91 TB' },
      { metric: 'Cache RAM (80/20 Rule)', value: '20% of daily reads (200M * 500B) ≈ 100 GB RAM needed in Redis' }
    ],
    architecture: [
      {
        component: 'API Gateway & Load Balancer (Nginx/Envoy)',
        role: 'SSL termination, rate limiting by IP/token, round-robin routing to stateless App Servers.'
      },
      {
        component: 'Shortening Service (Application Nodes)',
        role: 'Generates Base62 tokens using Key Generation Service (KGS) or distributed sequence IDs (Snowflake).'
      },
      {
        component: 'Distributed Key Generation Service (KGS)',
        role: 'Pre-generates 7-character Base62 keys (62^7 ≈ 3.5 Trillion unique strings) and serves unused keys in batches to App Servers.'
      },
      {
        component: 'Distributed Cache (Redis Cluster)',
        role: 'Stores Hot ShortURL -> LongURL mappings in RAM with LRU eviction policy to satisfy 80% of reads under 5ms.'
      },
      {
        component: 'Persistent DB (Cassandra / DynamoDB or Sharded PostgreSQL)',
        role: 'Stores mapping: `{ short_key (PK), long_url, user_id, created_at, expires_at }`. NoSQL is chosen for massive linear write scalability and simple key-value lookups.'
      },
      {
        component: 'Async Analytics Pipeline (Kafka -> Flink -> ClickHouse)',
        role: 'Decouples click analytics from the critical redirect path to preserve read latency.'
      }
    ],
    deepDives: [
      {
        title: 'MD5 Hashing vs Pre-generated Key Generation (KGS)',
        content: 'MD5 creates a 128-bit hash. Taking the first 7 Base62 characters causes collisions (Birthday Paradox). Handling collisions requires DB lookups and appending salts. A dedicated KGS service that generates unique keys offline and stores them in memory completely eliminates collisions.'
      },
      {
        title: '301 Permanent Redirect vs 302 Temporary Redirect',
        content: '301 tells browsers to cache the redirect locally, reducing server load on subsequent clicks, but prevents the server from collecting accurate click analytics. 302 forces every request to hit the server, ideal for analytics and monetization.'
      }
    ]
  },
  {
    id: 'rate-limiter',
    title: 'Design a Distributed Rate Limiter',
    scale: '1M requests/sec · Distributed across multi-region clusters',
    difficulty: 'Advanced',
    tags: ['Redis', 'Token Bucket', 'Concurrency', 'Lua Scripts', 'Sliding Window'],
    overview: 'Design an ultra-fast, distributed rate limiting service or middleware to protect downstream microservices from DDoS attacks, API abuse, and runaway resource consumption.',
    requirements: {
      functional: [
        'Limit requests based on client IP, user ID, API token, or endpoint path.',
        'Return HTTP 429 Too Many Requests with `Retry-After` and `X-RateLimit-*` headers when threshold is exceeded.',
        'Support configurable rules (e.g. Tier 1 = 100 req/min, Tier 2 = 1000 req/min).'
      ],
      nonFunctional: [
        'Sub-millisecond latency impact (< 1ms).',
        'Accurate rate tracking across multiple distributed server instances without race conditions.',
        'High fault tolerance: soft-fail (allow traffic through if limiter service is down).'
      ]
    },
    capacityEstimation: [
      { metric: 'Throughput', value: '1,000,000 requests/second' },
      { metric: 'Memory Footprint', value: '50M active users * 64 bytes/record ≈ 3.2 GB RAM (Comfortably fits in small Redis cluster)' }
    ],
    architecture: [
      {
        component: 'Client / API Gateway Middleware',
        role: 'Intercepts incoming HTTP requests, extracts identifiers (API key / IP), queries limiter.'
      },
      {
        component: 'In-Memory Redis Cache with Lua Scripting',
        role: 'Performs atomic check-and-increment operations using Lua scripts to prevent distributed race conditions.'
      },
      {
        component: 'Rate Limit Rule Engine & Config Store',
        role: 'Syncs dynamic tier limits from etcd / ZooKeeper to local worker memory caches.'
      }
    ],
    deepDives: [
      {
        title: 'Algorithm Comparison: Token Bucket vs Sliding Window Counter',
        content: 'Token Bucket allows bursts of traffic while enforcing average rate, and has O(1) memory. Sliding Window Counter merges previous window and current window weights to prevent burst spikes at boundary borders without the high memory cost of Sliding Window Log.'
      },
      {
        title: 'Solving Distributed Race Conditions with Redis Lua',
        content: 'When two servers query and increment Redis simultaneously, read-modify-write causes under-counting. Executing the check-and-refill logic in a Redis Lua script guarantees single-threaded atomicity.'
      }
    ]
  },
  {
    id: 'chat-system',
    title: 'Design a Real-Time Chat App (WhatsApp/Slack)',
    scale: '500M Daily Active Users · 50 Billion messages/day',
    difficulty: 'Advanced',
    tags: ['WebSockets', 'Kafka', 'Cassandra', 'Presence Service', 'Push Notifications'],
    overview: 'Design a highly reliable, low-latency 1-on-1 and group messaging system supporting online/offline message delivery, read receipts, and active user presence.',
    requirements: {
      functional: [
        'Real-time 1-on-1 and group chat (up to 500 members).',
        'Delivery status: Sent, Delivered (double check), Read (blue check).',
        'Online/Offline presence indicator and Last Seen timestamps.',
        'Media attachments (images/videos) and push notifications for offline users.'
      ],
      nonFunctional: [
        'Ultra-low latency (< 100ms end-to-end message delivery).',
        'Zero message loss (at-least-once delivery with client-side deduplication).',
        'End-to-End Encryption (E2EE) key exchange architecture.'
      ]
    },
    capacityEstimation: [
      { metric: 'Daily Messages', value: '50 Billion messages / 86,400s ≈ ~580k msg/sec (Peak ~1.5M/s)' },
      { metric: 'Storage (1 Year)', value: '50B * 365 * 200 bytes per message ≈ 3.65 Petabytes/year' }
    ],
    architecture: [
      {
        component: 'WebSocket Gateways (Chat Connection Servers)',
        role: 'Maintains long-lived bidirectional TCP/WebSocket connections with active mobile/web clients.'
      },
      {
        component: 'Session / Presence Service (Redis Cluster)',
        role: 'Maps `user_id -> connected_gateway_server_ip` with heartbeats for accurate routing and presence.'
      },
      {
        component: 'Message Broker (Apache Kafka / Pulsar)',
        role: 'Buffers high-velocity message streams and distributes to group fan-out queues and storage workers.'
      },
      {
        component: 'Message Store (Apache Cassandra / ScyllaDB)',
        role: 'Partitioned by `(chat_room_id, bucket_date)` and sorted by `message_id (TimeUUID)` for ultra-fast sequential time-range queries.'
      },
      {
        component: 'Push Notification Service (APNs / FCM)',
        role: 'Notifies offline recipients when new messages arrive.'
      }
    ],
    deepDives: [
      {
        title: 'Why WebSockets over HTTP Long Polling?',
        content: 'Long polling creates overhead with repeated HTTP handshakes and headers. WebSockets maintain a lightweight persistent TCP connection with minimal 2-byte framing overhead, essential for millions of active mobile connections.'
      },
      {
        title: 'Group Chat Fan-out Strategies',
        content: 'For small groups (<500 members), fan-out on write places message copies into each member\'s inbox queue. For massive channels (10k+), fan-out on read pulls from a single channel partition to prevent storage explosion.'
      }
    ]
  },
  {
    id: 'video-streaming',
    title: 'Design a Video Streaming Platform (YouTube/Netflix)',
    scale: '2 Billion Monthly Users · 500 Hours of video uploaded/min',
    difficulty: 'Expert',
    tags: ['CDN', 'HLS/DASH', 'Transcoding Pipeline', 'Blob Storage', 'Adaptive Bitrate'],
    overview: 'Design an end-to-end global video ingestion, transcoding, and content delivery system with adaptive bitrate playback and high-speed search.',
    requirements: {
      functional: [
        'Upload videos up to 4K resolution with resumable uploads.',
        'Transcode uploaded raw footage into multiple resolutions (1080p, 720p, 480p) and formats (HLS/DASH).',
        'Stream videos smoothly across global users with minimal buffering and adaptive bitrate switching.',
        'Search and recommendation feed.'
      ],
      nonFunctional: [
        'High availability and worldwide low-latency playback.',
        'Cost-efficient storage and bandwidth optimization.',
        'Content copyright & compliance inspection pipeline.'
      ]
    },
    capacityEstimation: [
      { metric: 'Upload Rate', value: '500 hrs/min = 30,000 hrs video/hr uploaded' },
      { metric: 'Egress Bandwidth', value: '1B daily video views * 200MB avg ≈ 200 PB/day (requires heavy Edge CDN caching)' }
    ],
    architecture: [
      {
        component: 'Blob Storage (AWS S3 / GCP Cloud Storage)',
        role: 'Stores raw master video files and encoded chunk playlists.'
      },
      {
        component: 'Distributed Transcoding Cluster (FFmpeg on Kubernetes Workers)',
        role: 'Splits raw video into 5-second GOP segments, encodes in parallel across multiple bitrates (1080p, 720p, 480p, 360p), generates master `.m3u8` index playlists.'
      },
      {
        component: 'Global CDN (Cloudflare / Akamai / Fastly)',
        role: 'Caches video chunks close to ISP edge servers, fulfilling >95% of video chunk requests without hitting origin storage.'
      },
      {
        component: 'Metadata DB (PostgreSQL / CockroachDB)',
        role: 'Stores user accounts, video metadata, view counts, and engagement stats.'
      }
    ],
    deepDives: [
      {
        title: 'Adaptive Bitrate Streaming (HLS vs DASH)',
        content: 'Client video players inspect network bandwidth every few seconds. If WiFi fluctuates, player dynamically requests the next 5-second chunk at a lower bitrate (e.g. dropping from 1080p to 720p) without stalling video playback.'
      }
    ]
  }
];

export const BEHAVIORAL_QUESTIONS = [
  {
    id: 'conflict-resolution',
    category: 'Conflict & Collaboration',
    question: 'Tell me about a time you had a technical disagreement with a colleague or senior engineer. How did you resolve it?',
    interviewerLookingFor: [
      'Emotional maturity and professional detachment.',
      'Data-driven decision making rather than ego battles.',
      'Ability to disagree and commit once a decision is made.',
      'Long-term relationship preservation with team members.'
    ],
    starGuide: {
      situation: 'Describe the project context, technical challenge, and what the two competing technical opinions were.',
      task: 'Explain your responsibility and why finding the right architectural consensus was critical for the deadline and reliability.',
      action: 'Detail the concrete steps: creating a proof-of-concept (POC), benchmark metrics, writing an RFC document, and facilitating a constructive discussion.',
      result: 'Highlight the outcome: agreed architecture, performance metrics improvement, team cohesion, and what you learned.'
    },
    sampleAnswer: `**Situation**: During a major migration of our payment processing service at my previous company, a senior architect wanted to use an asynchronous event-driven architecture with Apache Kafka, while I advocated for synchronous REST/gRPC calls with a robust saga pattern due to strict PCI compliance and audit logging constraints.

**Task**: As the lead engineer for the transaction pipeline, I needed to ensure we met our 150ms latency SLA while maintaining strict transaction isolation without stalling the team's sprint velocity.

**Action**: Rather than debating theoretical trade-offs in meetings, I proposed building a quick 2-day prototype comparing both approaches under simulated 5x peak loads. I wrote a brief RFC summarizing quantitative criteria: end-to-end latency, error recovery complexity, and operational monitoring overhead. We reviewed the benchmark results together: while Kafka excelled at throughput, the recovery saga complexity for failed credit card charges increased debugging latency. We agreed on a hybrid solution: gRPC for the synchronous payment authorization, and Kafka for asynchronous ledger recording and email receipts.

**Result**: We delivered the payment service 2 weeks ahead of schedule with 99.99% uptime during Black Friday, processing over $12M in transactions with zero duplicate charges. The architect and I developed a strong mutual respect and co-authored our team's engineering RFC guidelines.`
  },
  {
    id: 'project-failure',
    category: 'Failure & Ownership',
    question: 'Describe a project or feature that failed or did not go as planned. What happened, and what did you learn?',
    interviewerLookingFor: [
      'Radical ownership without blaming external parties.',
      'Root cause analysis and systemic improvements.',
      'Resilience and actionable takeaways implemented in future projects.'
    ],
    starGuide: {
      situation: 'Set up an ambitious project with real stakes.',
      task: 'Define your ownership and what the goal was.',
      action: 'Explain what went wrong, how you detected the failure, immediate triage/rollback, and post-mortem.',
      result: 'Explain the safeguards, automated tests, or process changes introduced to guarantee it never happens again.'
    },
    sampleAnswer: `**Situation**: We launched a new real-time notifications engine aimed at improving user engagement across 3 million mobile users.

**Task**: I was the primary backend developer responsible for the push dispatch microservice.

**Action**: Shortly after rollout, we noticed database CPU spikes reaching 98%, causing a 4-minute outage on our main API. I immediately triggered a rollback to the previous stable release. During the post-mortem, I identified that the new notification broadcast loop caused an N+1 query pattern because we hadn't properly batched recipient preference lookups under production-level concurrency. I wrote a blameless post-mortem document, introduced Redis batching with pipeline lookups, and added automated load-testing stages in our CI/CD pipeline simulating 10,000 concurrent push requests.

**Result**: In the subsequent launch, our service handled the full 3M notification blast with CPU staying below 32%. More importantly, the load-testing CI gate I created was adopted across all 6 backend services in our engineering org.`
  },
  {
    id: 'ambiguity',
    category: 'Ambiguity & Initiative',
    question: 'How do you handle working on a project with vague or constantly shifting requirements?',
    interviewerLookingFor: [
      'Proactive requirement gathering and stakeholder alignment.',
      'Iterative delivery and rapid feedback loops.',
      'Ability to turn abstract business needs into clear technical milestones.'
    ],
    starGuide: {
      situation: 'Describe an ambiguous business problem with limited specifications.',
      task: 'Your role in driving clarity and creating a technical roadmap.',
      action: 'Iterative prototypes, user interviews, agile feedback loops, and scope boundary definitions.',
      result: 'Successful deliverable, customer satisfaction, and team velocity.'
    },
    sampleAnswer: `**Situation**: Our product team wanted to build an 'AI-powered smart search' for our enterprise SaaS app, but there was no formal PRD, technical spec, or definition of what 'smart' meant to customers.

**Task**: I took the initiative as tech lead to bridge the gap between product aspirations and technical feasibility.

**Action**: I scheduled a 30-minute discovery workshop with product managers and customer success leads to identify top customer pain points. We discovered customers struggled with misspelled terms and synonym searches. Instead of immediately building complex ML models, I proposed an incremental 3-phase plan: Phase 1 implemented fuzzy Elasticsearch queries and synonym token filters in 2 weeks; Phase 2 tested semantic vector embeddings on a 10% beta cohort; Phase 3 tracked click-through rate (CTR) telemetry.

**Result**: Phase 1 improved search CTR by 28% in the first month. By delivering iteratively, we saved 3 months of unnecessary model training costs and established a data-driven feature validation playbook.`
  },
  {
    id: 'leadership',
    category: 'Leadership & Mentorship',
    question: 'Tell me about a time you mentored a junior engineer or helped elevate the technical quality of your team.',
    interviewerLookingFor: [
      'Empathy, patient communication, and mentorship approach.',
      'Focus on empowering others rather than simply writing code yourself.',
      'Tangible growth of the mentee and long-term team impact.'
    ],
    starGuide: {
      situation: 'Describe joining or leading a team with a junior engineer struggling with a concept or project.',
      task: 'Your goal in coaching them toward independence.',
      action: 'Pair programming, constructive PR reviews, breaking down complex tasks, building confidence.',
      result: 'Mentee promotion/success, autonomous code ownership, and elevated team velocity.'
    },
    sampleAnswer: `**Situation**: A junior engineer joined our backend team and was assigned to build their first high-throughput gRPC service. They were hesitant to ask questions during standup and were falling behind on their deliverable.

**Task**: I wanted to support their growth, help them build confidence with concurrency and testing, and ensure their feature launched on time.

**Action**: I scheduled regular 1-on-1 pairing sessions where I used the 'driver-navigator' approach—having them type and formulate the solutions while I asked guiding questions about edge cases and error handling. I also shared my own early career debugging mistakes to normalize the learning curve. For code reviews, I focused on explaining the 'why' behind architectural comments and recommended targeted resources on Go concurrency patterns.

**Result**: The engineer successfully shipped the microservice with 95% unit test coverage. Within 6 months, they were independently designing and leading features, and they later became the onboarding mentor for our next round of new hires.`
  }
];

export const FRONTEND_CORE_TOPICS = [
  {
    id: 'react-fiber',
    title: 'React Fiber Architecture & Reconciliation',
    category: 'React Internals',
    difficulty: 'Advanced',
    summary: 'How React breaks rendering work into incremental units, handles priority scheduling, and computes Virtual DOM diffs.',
    keyPoints: [
      'Stack Reconciler vs Fiber: The legacy reconciler was synchronous and recursive (blocking main thread). Fiber represents a virtual stack frame as a linked list of Fiber nodes, allowing work to be paused, prioritized, and resumed.',
      'Two Phases of React:\n1. Render Phase (Asynchronous & interruptible): Computes diffs, calls hooks/render functions, builds workInProgress tree.\n2. Commit Phase (Synchronous): Updates the actual DOM in one atomic pass (componentDidMount, useLayoutEffect, then useEffect).',
      'Diffing Heuristics: O(n) heuristic algorithm based on element types and stable key props.',
      'Concurrent Features: useTransition, useDeferredValue, and Suspense leverage Fiber priority lanes (SyncLane, InputContinuousLane, DefaultLane, IdleLane).'
    ],
    codeSnippet: `// Concept of a Fiber Node structure
const fiberNode = {
  type: 'div',
  key: null,
  props: { className: 'card' },
  stateNode: domElement, // reference to real DOM
  child: childFiber,     // first child
  sibling: siblingFiber, // next sibling
  return: parentFiber,   // parent fiber
  alternate: currentFiber, // double buffering workInProgress
  lanes: 1,              // priority lane
};`
  },
  {
    id: 'event-loop',
    title: 'JavaScript Event Loop & Microtask Queue',
    category: 'JavaScript Core',
    difficulty: 'Foundational',
    summary: 'Understand single-threaded execution, Call Stack, Task (Macrotask) Queue, Microtask Queue, and requestAnimationFrame rendering ticks.',
    keyPoints: [
      'Call Stack: Executes synchronous bytecode one frame at a time.',
      'Microtasks: Executed immediately after the current stack empties, BEFORE any macrotask or DOM repaint. Examples: Promise.then/catch/finally, queueMicrotask, MutationObserver.',
      'Macrotasks (Tasks): Picked from the queue one at a time per event loop turn. Examples: setTimeout, setInterval, setImmediate, I/O, UI event handlers.',
      'Rendering Pipeline: requestAnimationFrame fires right before the browser calculates layout and paints to the screen.'
    ],
    codeSnippet: `console.log('1: Sync Start');

setTimeout(() => {
  console.log('4: Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('2: Microtask 1');
}).then(() => {
  console.log('3: Microtask 2');
});

console.log('1.5: Sync End');

// Output order:
// 1: Sync Start -> 1.5: Sync End -> 2: Microtask 1 -> 3: Microtask 2 -> 4: Macrotask`
  },
  {
    id: 'core-web-vitals',
    title: 'Web Performance & Core Web Vitals (CWV)',
    category: 'Performance',
    difficulty: 'Intermediate',
    summary: 'Key user-centric metrics for measuring page speed, visual stability, and interaction responsiveness.',
    keyPoints: [
      'LCP (Largest Contentful Paint): Measures loading performance. Good: < 2.5s. Optimize with image CDN compression (AVIF/WebP), preloading critical assets (<link rel="preload">), SSR/SSG.',
      'INP (Interaction to Next Paint): Measures user interface responsiveness to clicks/taps (replaces FID). Good: < 200ms. Optimize by yielding to the main thread with requestIdleCallback, scheduler.yield(), and debouncing heavy handlers.',
      'CLS (Cumulative Layout Shift): Measures visual stability. Good: < 0.1. Optimize by always specifying explicit width & height or aspect-ratio on images/iframes, reserving space for ads and dynamic content.'
    ],
    codeSnippet: `<!-- Preloading hero image for optimal LCP -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">

<style>
  /* Preventing CLS on media containers */
  .aspect-box {
    aspect-ratio: 16 / 9;
    width: 100%;
    background: #1e293b;
  }
</style>`
  },
  {
    id: 'web-security',
    title: 'Web Security: XSS, CSRF, CSP & CORS',
    category: 'Security',
    difficulty: 'Intermediate',
    summary: 'Deep dive into critical client-server security vulnerabilities and mitigation strategies.',
    keyPoints: [
      'XSS (Cross-Site Scripting): Stored, Reflected, or DOM-based injection of malicious scripts. Defense: Contextual output encoding, DOMPurify sanitization, avoid dangerouslySetInnerHTML.',
      'CSRF (Cross-Site Request Forgery): Unauthorized commands executed from a trusted user session. Defense: SameSite=Strict/Lax cookies, Anti-CSRF synchronization tokens, custom request headers (X-Requested-With).',
      'CSP (Content Security Policy): HTTP header restricting where scripts, styles, images, and fonts can load from (script-src \'self\' https://trusted.cdn).',
      'CORS (Cross-Origin Resource Sharing): Browser security mechanism checking headers on cross-origin requests (Origin, Access-Control-Allow-Origin, preflight OPTIONS requests).'
    ],
    codeSnippet: `// Example secure HTTP Response Headers:
// Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com
// Set-Cookie: session_id=xyz123; Secure; HttpOnly; SameSite=Strict; Path=/
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY`
  }
];

export const FLASHCARDS_DATA = [
  {
    id: 'fc-1',
    category: 'Algorithms',
    question: 'What is the worst-case and average-case time complexity of QuickSort?',
    answer: 'Average: O(n log n). Worst-case: O(n²) when the pivot chosen is consistently the smallest or largest element (e.g. already sorted array with naive first-element pivot).'
  },
  {
    id: 'fc-2',
    category: 'System Design',
    question: 'What is the CAP Theorem and what are the trade-offs in a network partition?',
    answer: 'In a distributed data store, you can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance. Since network partitions (P) are inevitable in real networks, systems must choose between CP (rejecting writes/reads to maintain consistency) or AP (returning stale data to stay available).'
  },
  {
    id: 'fc-3',
    category: 'Web & Protocols',
    question: 'What are the key improvements in HTTP/2 vs HTTP/1.1?',
    answer: '1. Multiplexing over a single TCP connection (eliminates Head-of-Line blocking at application layer)\n2. Binary framing instead of plain text\n3. HPACK header compression\n4. Server Push capabilities.'
  },
  {
    id: 'fc-4',
    category: 'Databases',
    question: 'What is the difference between Clustered and Non-Clustered Indexes?',
    answer: 'Clustered Index determines the physical order of data rows on disk (only 1 per table, typically Primary Key). Non-Clustered Index is a separate B-tree structure holding pointers/keys referencing the physical data rows.'
  },
  {
    id: 'fc-5',
    category: 'JavaScript',
    question: 'What is the difference between == and === in JavaScript?',
    answer: '== performs abstract type coercion before comparing (e.g. 0 == false is true). === is strict equality and checks both value and type without type conversion (0 === false is false).'
  },
  {
    id: 'fc-6',
    category: 'System Design',
    question: 'Explain Consistent Hashing and why it is used in distributed caches.',
    answer: 'Consistent Hashing maps servers and keys to a circular 360° hash ring. When a server node is added or removed, only k / N keys need to be remapped on average (instead of nearly all keys with hash(key) % N), minimizing cache stampedes and rebalancing costs.'
  },
  {
    id: 'fc-7',
    category: 'Algorithms',
    question: 'When should you use Dijkstra\'s algorithm vs Bellman-Ford?',
    answer: 'Use Dijkstra (O((V + E) log V)) when edge weights are strictly non-negative. Use Bellman-Ford (O(V * E)) when graphs may contain negative edge weights or when you need to detect negative weight cycles.'
  },
  {
    id: 'fc-8',
    category: 'React',
    question: 'What is the difference between useMemo and useCallback?',
    answer: 'useMemo caches the calculated result of a function (const val = useMemo(() => compute(a), [a])). useCallback caches the function instance itself to prevent unnecessary re-renders of child components receiving callbacks.'
  },
  {
    id: 'fc-9',
    category: 'Databases',
    question: 'What are the ACID properties in database transactions?',
    answer: '• Atomicity: All or nothing execution.\n• Consistency: Database moves from one valid state to another satisfying all schema rules.\n• Isolation: Concurrent transactions do not interfere.\n• Durability: Committed transactions persist even in system crashes.'
  },
  {
    id: 'fc-10',
    category: 'System Design',
    question: 'What is Database Sharding and what are common sharding keys?',
    answer: 'Sharding splits a massive database horizontally across multiple physical machines. Common partitioning schemes include Range-Based (by date/letter), Hash-Based (e.g. hash(user_id) % shards), and Directory-Based lookup tables.'
  },
  {
    id: 'fc-11',
    category: 'Networking',
    question: 'What happens during a TCP 3-Way Handshake?',
    answer: '1. Client sends SYN (Synchronize sequence number)\n2. Server responds with SYN-ACK (Acknowledge + server sequence)\n3. Client sends ACK. Connection is established!'
  },
  {
    id: 'fc-12',
    category: 'Security',
    question: 'What is the purpose of the HttpOnly cookie flag?',
    answer: 'HttpOnly blocks client-side scripts (document.cookie) from reading the cookie in the browser, providing strong protection against session token theft via Cross-Site Scripting (XSS).'
  }
];

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 'mock-1',
    type: 'DSA',
    topic: 'Arrays & Two Pointers',
    timeLimitSeconds: 600,
    title: 'Explain and Solve: Two Sum with O(n) time complexity',
    question: 'Given an integer array `nums` and target `target`, explain how you achieve an optimal single-pass solution. What edge cases must be handled (negative numbers, duplicates, no solution)?',
    rubric: [
      'Identified optimal hash map complement approach (10 pts)',
      'Accurate time and space complexity analysis (5 pts)',
      'Handled duplicate values and edge cases (5 pts)'
    ],
    sampleSolution: 'Using a hash map to record complement `target - num` as we iterate. Time: O(n), Space: O(n).'
  },
  {
    id: 'mock-2',
    type: 'System Design',
    topic: 'Architecture & Scalability',
    timeLimitSeconds: 900,
    title: 'Design a Distributed Rate Limiter for 100k req/sec',
    question: 'How would you architect a rate limiter to protect downstream services? Compare Token Bucket with Sliding Window Log and explain how to avoid race conditions in a distributed cluster.',
    rubric: [
      'Detailed Token Bucket / Sliding Window Counter algorithm (10 pts)',
      'Identified Redis Lua scripts or atomic transactions for concurrency (10 pts)',
      'Discussed soft-failing vs hard-failing error strategies (5 pts)'
    ],
    sampleSolution: 'Redis with Lua script executing atomic sliding window or token refill calculation.'
  },
  {
    id: 'mock-3',
    type: 'Behavioral',
    topic: 'STAR Method',
    timeLimitSeconds: 420,
    title: 'Tell me about a time you had to make a high-stakes engineering trade-off under a tight deadline.',
    question: 'Structure your answer using the STAR framework (Situation, Task, Action, Result). Emphasize technical risk evaluation, communication with stakeholders, and post-launch follow-up.',
    rubric: [
      'Clear structured STAR delivery (8 pts)',
      'Demonstrated accountability and technical pragmatism (6 pts)',
      'Quantified business or technical outcome (6 pts)'
    ],
    sampleSolution: 'Structured explanation highlighting metrics, trade-offs made, and technical debt repayment plan.'
  }
];
