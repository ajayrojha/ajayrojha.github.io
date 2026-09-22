import { DSA_PROBLEMS } from './interviewData';

// Commonly asked coding questions. Company tags reflect where each problem is
// frequently reported in public interview write-ups (LeetCode company tags,
// Glassdoor); they indicate popularity, not a guarantee of being asked.
export const COMMON_CODING_PROBLEMS = [
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description:
      'Given a string `s` containing just the characters `()[]{}`, decide whether it is valid: every opening bracket is closed by the same type of bracket, in the correct order.',
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([{}])"', output: 'true' }
    ],
    hints: [
      'The most recent unmatched opener must be closed first. Which data structure is last-in, first-out?',
      'Push the expected closing bracket when you see an opener; when you see a closer, it must equal the popped value.'
    ],
    approaches: [
      {
        name: 'Stack of expected closers',
        explanation:
          'Scan left to right. For each opener push its matching closer. For each closer, the stack must be non-empty and its top must equal that closer. The string is valid if the stack is empty at the end.'
      }
    ],
    solutions: {
      csharp: `public bool IsValid(string s) {
    var stack = new Stack<char>();
    foreach (char c in s) {
        if (c == '(') stack.Push(')');
        else if (c == '[') stack.Push(']');
        else if (c == '{') stack.Push('}');
        else if (stack.Count == 0 || stack.Pop() != c) return false;
    }
    return stack.Count == 0;
}`,
      javascript: `function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '[': ']', '{': '}' };
  for (const c of s) {
    if (pairs[c]) stack.push(pairs[c]);
    else if (stack.pop() !== c) return false;
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    pairs = {'(': ')', '[': ']', '{': '}'}
    stack = []
    for c in s:
        if c in pairs:
            stack.append(pairs[c])
        elif not stack or stack.pop() != c:
            return False
    return not stack`,
      java: `public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '[') stack.push(']');
        else if (c == '{') stack.push('}');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`
    }
  },
  {
    id: 'best-time-to-buy-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Arrays & Greedy',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Bloomberg', 'Goldman Sachs'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description:
      'Given `prices[i]`, the price of a stock on day `i`, return the maximum profit from buying on one day and selling on a later day. Return 0 if no profit is possible.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy at 1 (day 2), sell at 6 (day 5).' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices only fall, so no profitable trade exists.' }
    ],
    hints: [
      'For each day, the best sale is today\'s price minus the lowest price seen so far.',
      'Track the running minimum and the best profit in one pass.'
    ],
    approaches: [
      {
        name: 'One pass with running minimum',
        explanation:
          'Keep the cheapest price seen so far. For every day, profit = price - cheapest; keep the maximum. This avoids the O(n²) check of every buy/sell pair.'
      }
    ],
    solutions: {
      csharp: `public int MaxProfit(int[] prices) {
    int minPrice = int.MaxValue, best = 0;
    foreach (int price in prices) {
        minPrice = Math.Min(minPrice, price);
        best = Math.Max(best, price - minPrice);
    }
    return best;
}`,
      javascript: `function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }
  return best;
}`,
      python: `def maxProfit(prices: list[int]) -> int:
    min_price, best = float('inf'), 0
    for price in prices:
        min_price = min(min_price, price)
        best = max(best, price - min_price)
    return best`,
      java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, best = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        best = Math.max(best, price - minPrice);
    }
    return best;
}`
    }
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hash Sets',
    companies: ['Amazon', 'Apple', 'Adobe', 'Microsoft'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' }
    ],
    hints: ['A hash set answers "have I seen this before?" in O(1).', 'Sorting also works in O(n log n) with O(1) extra space.'],
    approaches: [
      {
        name: 'Hash set',
        explanation: 'Add each number to a set; if the add fails because the value is already present, return true.'
      }
    ],
    solutions: {
      csharp: `public bool ContainsDuplicate(int[] nums) {
    var seen = new HashSet<int>();
    foreach (int n in nums) {
        if (!seen.Add(n)) return true;
    }
    return false;
}`,
      javascript: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}`,
      python: `def containsDuplicate(nums: list[int]) -> bool:
    return len(set(nums)) != len(nums)`,
      java: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int n : nums) {
        if (!seen.add(n)) return true;
    }
    return false;
}`
    }
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Strings & Hashing',
    companies: ['Amazon', 'Bloomberg', 'Microsoft', 'Uber'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Given two strings `s` and `t` of lowercase letters, return `true` if `t` is an anagram of `s`.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    hints: ['Different lengths can never be anagrams.', 'Count letters with a 26-slot array: increment for s, decrement for t.'],
    approaches: [
      {
        name: 'Letter counts',
        explanation: 'Use one int[26]. Add counts for s and subtract for t; the strings are anagrams exactly when every slot ends at zero.'
      }
    ],
    solutions: {
      csharp: `public bool IsAnagram(string s, string t) {
    if (s.Length != t.Length) return false;
    var count = new int[26];
    for (int i = 0; i < s.Length; i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    return count.All(c => c == 0);
}`,
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every((c) => c === 0);
}`,
      python: `from collections import Counter

def isAnagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)`,
      java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}`
    }
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked Lists',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Meta', 'Bloomberg'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Given the `head` of a singly linked list, reverse the list and return the new head.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    hints: [
      'You need three references: previous, current, and next.',
      'Save next before you overwrite current.next, or you lose the rest of the list.'
    ],
    approaches: [
      {
        name: 'Iterative pointer reversal',
        explanation: 'Walk the list and point each node back at the previous one. When current becomes null, previous is the new head.'
      }
    ],
    solutions: {
      csharp: `public ListNode ReverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
      python: `def reverseList(head):
    prev, curr = None, head
    while curr:
        curr.next, prev, curr = prev, curr, curr.next
    return prev`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
    }
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked Lists',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Meta'],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    description: 'Merge two sorted linked lists `list1` and `list2` into one sorted list by splicing their nodes together, and return its head.',
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' }
    ],
    hints: ['A dummy head node removes the special case for the first node.', 'When one list runs out, attach the rest of the other.'],
    approaches: [
      {
        name: 'Dummy head + tail pointer',
        explanation: 'Repeatedly attach the smaller of the two front nodes to the tail. Append whatever remains at the end.'
      }
    ],
    solutions: {
      csharp: `public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
    var dummy = new ListNode(0);
    var tail = dummy;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }
        else { tail.next = list2; list2 = list2.next; }
        tail = tail.next;
    }
    tail.next = list1 ?? list2;
    return dummy.next;
}`,
      javascript: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }
    else { tail.next = list2; list2 = list2.next; }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`,
      python: `def mergeTwoLists(list1, list2):
    dummy = tail = ListNode(0)
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next, list1 = list1, list1.next
        else:
            tail.next, list2 = list2, list2.next
        tail = tail.next
    tail.next = list1 or list2
    return dummy.next`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }
        else { tail.next = list2; list2 = list2.next; }
        tail = tail.next;
    }
    tail.next = (list1 != null) ? list1 : list2;
    return dummy.next;
}`
    }
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    companies: ['Amazon', 'Google', 'Adobe', 'Apple'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'You can climb 1 or 2 steps at a time. In how many distinct ways can you reach the top of a staircase with `n` steps?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2.' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1.' }
    ],
    hints: ['To reach step n you came from step n-1 or n-2.', 'ways(n) = ways(n-1) + ways(n-2): it is Fibonacci.'],
    approaches: [
      {
        name: 'Bottom-up with two variables',
        explanation: 'Only the previous two answers are needed, so keep two variables instead of a whole DP array.'
      }
    ],
    solutions: {
      csharp: `public int ClimbStairs(int n) {
    int a = 1, b = 1; // ways to reach step 0 and step 1
    for (int i = 2; i <= n; i++) {
        (a, b) = (b, a + b);
    }
    return b;
}`,
      javascript: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
      python: `def climbStairs(n: int) -> int:
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
      java: `public int climbStairs(int n) {
    int a = 1, b = 1;
    for (int i = 2; i <= n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    return b;
}`
    }
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Arrays & Dynamic Programming',
    companies: ['Amazon', 'Microsoft', 'LinkedIn', 'Apple', 'Bloomberg'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Given an integer array `nums`, find the contiguous subarray with the largest sum and return that sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum, 6.' },
      { input: 'nums = [-1]', output: '-1' }
    ],
    hints: [
      'At each index, either extend the previous subarray or start fresh here.',
      'If the running sum becomes negative, it can only hurt what follows.'
    ],
    approaches: [
      {
        name: "Kadane's algorithm",
        explanation: 'current = max(num, current + num); best = max(best, current). Starting both at nums[0] handles all-negative arrays.'
      }
    ],
    solutions: {
      csharp: `public int MaxSubArray(int[] nums) {
    int current = nums[0], best = nums[0];
    for (int i = 1; i < nums.Length; i++) {
        current = Math.Max(nums[i], current + nums[i]);
        best = Math.Max(best, current);
    }
    return best;
}`,
      javascript: `function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    current = best = nums[0]
    for num in nums[1:]:
        current = max(num, current + num)
        best = max(best, current)
    return best`,
      java: `public int maxSubArray(int[] nums) {
    int current = nums[0], best = nums[0];
    for (int i = 1; i < nums.length; i++) {
        current = Math.max(nums[i], current + nums[i]);
        best = Math.max(best, current);
    }
    return best;
}`
    }
  },
  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Arrays & Prefix Sums',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Apple', 'Lyft'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) extra',
    description:
      'Return an array `answer` where `answer[i]` is the product of every element of `nums` except `nums[i]`. Do it in O(n) without using division.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
    ],
    hints: [
      'answer[i] = (product of everything left of i) × (product of everything right of i).',
      'Fill left products in one pass, then multiply in right products in a reverse pass.'
    ],
    approaches: [
      {
        name: 'Prefix and suffix products',
        explanation: 'First pass writes the running product of the left side into the output. Second pass walks from the right with a running suffix product and multiplies it in. The output array does not count as extra space.'
      }
    ],
    solutions: {
      csharp: `public int[] ProductExceptSelf(int[] nums) {
    int n = nums.Length;
    var answer = new int[n];
    answer[0] = 1;
    for (int i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1];
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    return answer;
}`,
      javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  for (let i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1];
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}`,
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    answer = [1] * n
    for i in range(1, n):
        answer[i] = answer[i - 1] * nums[i - 1]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer`,
      java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] answer = new int[n];
    answer[0] = 1;
    for (int i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1];
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }
    return answer;
}`
    }
  },
  {
    id: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Two Pointers & Sorting',
    companies: ['Meta', 'Amazon', 'Microsoft', 'Bloomberg', 'Adobe'],
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) extra (excluding sort)',
    description: 'Return all unique triplets `[a, b, c]` in `nums` such that `a + b + c == 0`. The answer must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
    ],
    hints: [
      'Sort first. Fix one number, then the problem becomes Two Sum on a sorted range.',
      'Skip equal neighbours for the fixed number and after each match to avoid duplicates.'
    ],
    approaches: [
      {
        name: 'Sort + two pointers',
        explanation: 'For each index i (skipping duplicates), move left/right pointers inward: too small moves left up, too big moves right down, a match is recorded and both pointers skip past duplicates.'
      }
    ],
    solutions: {
      csharp: `public IList<IList<int>> ThreeSum(int[] nums) {
    Array.Sort(nums);
    var result = new List<IList<int>>();
    for (int i = 0; i < nums.Length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.Length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) left++;
            else if (sum > 0) right--;
            else {
                result.Add(new List<int> { nums[i], nums[left], nums[right] });
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            }
        }
    }
    return result;
}`,
      javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      }
    }
  }
  return result;
}`,
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
    return result`,
      java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) left++;
            else if (sum > 0) right--;
            else {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            }
        }
    }
    return result;
}`
    }
  },
  {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    companies: ['Amazon', 'Bloomberg', 'Microsoft', 'Meta', 'Adobe'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, alphabet))',
    description: 'Given a string `s`, return the length of the longest substring that contains no repeated characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: '"abc"' },
      { input: 's = "pwwkew"', output: '3', explanation: '"wke" (a substring, not "pwke", which is a subsequence).' }
    ],
    hints: [
      'Keep a window [left, right] that never contains a repeat.',
      'Remember each character\'s last index so left can jump straight past a repeat.'
    ],
    approaches: [
      {
        name: 'Sliding window with last-seen index',
        explanation: 'Move right across the string. If the character was last seen inside the window, move left to one past that position (never backwards). Track the widest window.'
      }
    ],
    solutions: {
      csharp: `public int LengthOfLongestSubstring(string s) {
    var lastSeen = new Dictionary<char, int>();
    int best = 0, left = 0;
    for (int right = 0; right < s.Length; right++) {
        if (lastSeen.TryGetValue(s[right], out int prev) && prev >= left) {
            left = prev + 1;
        }
        lastSeen[s[right]] = right;
        best = Math.Max(best, right - left + 1);
    }
    return best;
}`,
      javascript: `function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let best = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    const prev = lastSeen.get(s[right]);
    if (prev !== undefined && prev >= left) left = prev + 1;
    lastSeen.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    last_seen = {}
    best = left = 0
    for right, ch in enumerate(s):
        if last_seen.get(ch, -1) >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        best = max(best, right - left + 1)
    return best`,
      java: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int best = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        Integer prev = lastSeen.get(s.charAt(right));
        if (prev != null && prev >= left) left = prev + 1;
        lastSeen.put(s.charAt(right), right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}`
    }
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Strings & Hashing',
    companies: ['Amazon', 'Meta', 'Uber', 'Bloomberg', 'Microsoft'],
    timeComplexity: 'O(n · k log k)',
    spaceComplexity: 'O(n · k)',
    description: 'Given an array of strings `strs`, group the anagrams together. Return the groups in any order.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }
    ],
    hints: ['Anagrams share the same letters, so they share a canonical key.', 'Sorting each word gives a key; a 26-count signature avoids the sort.'],
    approaches: [
      {
        name: 'Hash map keyed by sorted word',
        explanation: 'For each word, sort its characters to build a key and append the word to that key\'s list. Return the map\'s values. (n words of length k.)'
      }
    ],
    solutions: {
      csharp: `public IList<IList<string>> GroupAnagrams(string[] strs) {
    var groups = new Dictionary<string, IList<string>>();
    foreach (var word in strs) {
        var chars = word.ToCharArray();
        Array.Sort(chars);
        var key = new string(chars);
        if (!groups.TryGetValue(key, out var list)) groups[key] = list = new List<string>();
        list.Add(word);
    }
    return groups.Values.ToList();
}`,
      javascript: `function groupAnagrams(strs) {
  const groups = new Map();
  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}`,
      python: `from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for word in strs:
        groups[''.join(sorted(word))].append(word)
    return list(groups.values())`,
      java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    for (String word : strs) {
        char[] chars = word.toCharArray();
        Arrays.sort(chars);
        groups.computeIfAbsent(new String(chars), k -> new ArrayList<>()).add(word);
    }
    return new ArrayList<>(groups.values());
}`
    }
  },
  {
    id: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Hashing & Bucket Sort',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements, in any order.',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    hints: [
      'Count frequencies with a hash map first.',
      'A frequency can be at most n, so bucket numbers by frequency and read buckets from high to low.'
    ],
    approaches: [
      {
        name: 'Count + bucket sort',
        explanation: 'bucket[f] holds the numbers that appear f times. Walk buckets from n down to 1 collecting numbers until you have k. A size-k min-heap (O(n log k)) is the other common answer.'
      }
    ],
    solutions: {
      csharp: `public int[] TopKFrequent(int[] nums, int k) {
    var counts = new Dictionary<int, int>();
    foreach (int n in nums) counts[n] = counts.GetValueOrDefault(n) + 1;

    var buckets = new List<int>[nums.Length + 1];
    foreach (var (num, freq) in counts) (buckets[freq] ??= new List<int>()).Add(num);

    var result = new List<int>();
    for (int f = buckets.Length - 1; f > 0 && result.Count < k; f--) {
        if (buckets[f] != null) result.AddRange(buckets[f]);
    }
    return result.Take(k).ToArray();
}`,
      javascript: `function topKFrequent(nums, k) {
  const counts = new Map();
  for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of counts) buckets[freq].push(num);

  const result = [];
  for (let f = buckets.length - 1; f > 0 && result.length < k; f--) {
    result.push(...buckets[f]);
  }
  return result.slice(0, k);
}`,
      python: `from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in Counter(nums).items():
        buckets[freq].append(num)
    result = []
    for f in range(len(buckets) - 1, 0, -1):
        result.extend(buckets[f])
        if len(result) >= k:
            break
    return result[:k]`,
      java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> counts = new HashMap<>();
    for (int n : nums) counts.merge(n, 1, Integer::sum);

    List<Integer>[] buckets = new List[nums.length + 1];
    for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
        if (buckets[e.getValue()] == null) buckets[e.getValue()] = new ArrayList<>();
        buckets[e.getValue()].add(e.getKey());
    }

    int[] result = new int[k];
    int idx = 0;
    for (int f = buckets.length - 1; f > 0 && idx < k; f--) {
        if (buckets[f] == null) continue;
        for (int num : buckets[f]) {
            if (idx == k) break;
            result[idx++] = num;
        }
    }
    return result;
}`
    }
  },
  {
    id: 'kth-largest-element',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    category: 'Heaps & Quickselect',
    companies: ['Meta', 'Amazon', 'Microsoft', 'LinkedIn', 'Spotify'],
    timeComplexity: 'O(n log k) heap · O(n) avg quickselect',
    spaceComplexity: 'O(k) heap · O(1) quickselect',
    description: 'Return the `k`th largest element in the unsorted array `nums` (the kth largest in sorted order, not the kth distinct).',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }
    ],
    hints: [
      'Sorting is O(n log n). Can you avoid ordering everything?',
      'A min-heap holding the k largest seen so far has the answer at its top.',
      'Quickselect partitions around a pivot and only recurses into one side.'
    ],
    approaches: [
      {
        name: 'Size-k min-heap',
        explanation: 'Push every number; whenever the heap grows past k, pop the smallest. The top is the kth largest. The JavaScript version uses quickselect because JS has no built-in heap.'
      }
    ],
    solutions: {
      csharp: `public int FindKthLargest(int[] nums, int k) {
    var minHeap = new PriorityQueue<int, int>();
    foreach (int n in nums) {
        minHeap.Enqueue(n, n);
        if (minHeap.Count > k) minHeap.Dequeue();
    }
    return minHeap.Peek();
}`,
      javascript: `// Quickselect: average O(n)
function findKthLargest(nums, k) {
  const target = nums.length - k; // index in ascending order
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const p = partition(nums, lo, hi);
    if (p === target) return nums[p];
    if (p < target) lo = p + 1;
    else hi = p - 1;
  }
  return -1;
}

function partition(a, lo, hi) {
  const r = lo + Math.floor(Math.random() * (hi - lo + 1));
  [a[r], a[hi]] = [a[hi], a[r]];
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}`,
      python: `import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]`,
      java: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int n : nums) {
        minHeap.offer(n);
        if (minHeap.size() > k) minHeap.poll();
    }
    return minHeap.peek();
}`
    }
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Graphs (DFS / BFS)',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Google', 'Bloomberg'],
    timeComplexity: 'O(rows × cols)',
    spaceComplexity: 'O(rows × cols) recursion worst case',
    description:
      'Given a grid of `\'1\'` (land) and `\'0\'` (water), count the islands. An island is land connected horizontally or vertically.',
    examples: [
      {
        input: 'grid = [["1","1","0","0"],["1","1","0","0"],["0","0","1","0"],["0","0","0","1"]]',
        output: '3'
      }
    ],
    hints: [
      'Each time you find unvisited land, you have found a new island.',
      'Flood-fill (DFS or BFS) from it and mark every connected cell as visited, e.g. by setting it to "0".'
    ],
    approaches: [
      {
        name: 'Flood fill (DFS)',
        explanation: 'Scan every cell. On a "1", increment the count and sink the whole island with DFS so it is never counted again. Use BFS or union-find if recursion depth is a concern.'
      }
    ],
    solutions: {
      csharp: `public int NumIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.Length; r++)
        for (int c = 0; c < grid[0].Length; c++)
            if (grid[r][c] == '1') { count++; Sink(grid, r, c); }
    return count;
}

private void Sink(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.Length || c >= grid[0].Length || grid[r][c] != '1') return;
    grid[r][c] = '0';
    Sink(grid, r + 1, c); Sink(grid, r - 1, c);
    Sink(grid, r, c + 1); Sink(grid, r, c - 1);
}`,
      javascript: `function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  const sink = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
  };
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; sink(r, c); }
    }
  }
  return count;
}`,
      python: `def numIslands(grid: list[list[str]]) -> int:
    rows, cols = len(grid), len(grid[0])

    def sink(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                sink(r, c)
    return count`,
      java: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++)
        for (int c = 0; c < grid[0].length; c++)
            if (grid[r][c] == '1') { count++; sink(grid, r, c); }
    return count;
}

private void sink(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0';
    sink(grid, r + 1, c); sink(grid, r - 1, c);
    sink(grid, r, c + 1); sink(grid, r, c - 1);
}`
    }
  },
  {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees (BFS)',
    companies: ['Amazon', 'Meta', 'Microsoft', 'LinkedIn', 'Bloomberg'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Return the level order traversal of a binary tree\'s node values: left to right, level by level.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = []', output: '[]' }
    ],
    hints: ['Breadth-first search uses a queue.', 'Record the queue size at the start of each level so you know where the level ends.'],
    approaches: [
      {
        name: 'BFS, one level at a time',
        explanation: 'While the queue is not empty, take exactly levelSize nodes off it, collect their values, and enqueue their children.'
      }
    ],
    solutions: {
      csharp: `public IList<IList<int>> LevelOrder(TreeNode root) {
    var result = new List<IList<int>>();
    if (root == null) return result;
    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);
    while (queue.Count > 0) {
        int size = queue.Count;
        var level = new List<int>(size);
        for (int i = 0; i < size; i++) {
            var node = queue.Dequeue();
            level.Add(node.val);
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
        result.Add(level);
    }
    return result;
}`,
      javascript: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  let level = [root];
  while (level.length) {
    result.push(level.map((node) => node.val));
    const next = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return result;
}`,
      python: `from collections import deque

def levelOrder(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
      java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`
    }
  },
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Trees (DFS)',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Bloomberg'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description:
      'Decide whether a binary tree is a valid BST: every node\'s left subtree holds only smaller values, its right subtree only larger values, and both subtrees are BSTs too.',
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: '4 is in the right subtree of 5 but is smaller than 5.' }
    ],
    hints: [
      'Checking only a node against its direct children is not enough.',
      'Pass down the allowed (low, high) range; each node narrows it for its children.'
    ],
    approaches: [
      {
        name: 'DFS with value bounds',
        explanation: 'Recurse with the open interval (low, high). A node is valid if low < val < high; the left child gets (low, val) and the right child gets (val, high). An in-order traversal that must be strictly increasing also works.'
      }
    ],
    solutions: {
      csharp: `public bool IsValidBST(TreeNode root) => Valid(root, long.MinValue, long.MaxValue);

private bool Valid(TreeNode node, long low, long high) {
    if (node == null) return true;
    if (node.val <= low || node.val >= high) return false;
    return Valid(node.left, low, node.val) && Valid(node.right, node.val, high);
}`,
      javascript: `function isValidBST(root, low = -Infinity, high = Infinity) {
  if (!root) return true;
  if (root.val <= low || root.val >= high) return false;
  return isValidBST(root.left, low, root.val) && isValidBST(root.right, root.val, high);
}`,
      python: `def isValidBST(root, low=float('-inf'), high=float('inf')) -> bool:
    if not root:
        return True
    if not (low < root.val < high):
        return False
    return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)`,
      java: `public boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean valid(TreeNode node, long low, long high) {
    if (node == null) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
}`
    }
  },
  {
    id: 'lowest-common-ancestor',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'Medium',
    category: 'Trees (DFS)',
    companies: ['Meta', 'Amazon', 'Microsoft', 'LinkedIn', 'Google'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description:
      'Given a binary tree and two nodes `p` and `q` in it, return their lowest common ancestor: the deepest node that has both as descendants (a node counts as its own descendant).',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3' },
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4', output: '5' }
    ],
    hints: [
      'Ask each subtree: "did you find p or q?"',
      'If both the left and right subtrees report a hit, the current node is the answer.'
    ],
    approaches: [
      {
        name: 'Post-order DFS',
        explanation: 'Return the node if it is p or q. Otherwise search both sides: if both return non-null, this node is the LCA; if only one does, pass that result up.'
      }
    ],
    solutions: {
      csharp: `public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    var left = LowestCommonAncestor(root.left, p, q);
    var right = LowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left ?? right;
}`,
      javascript: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
      python: `def lowestCommonAncestor(root, p, q):
    if not root or root is p or root is q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left or right`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`
    }
  },
  {
    id: 'search-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    companies: ['Meta', 'Amazon', 'Microsoft', 'LinkedIn', 'Bloomberg'],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description:
      'A sorted array of distinct integers was rotated at an unknown pivot (e.g. `[0,1,2,4,5,6,7]` became `[4,5,6,7,0,1,2]`). Return the index of `target`, or -1, in O(log n).',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    hints: [
      'At any midpoint, at least one half (left or right) is still sorted.',
      'Check whether the target lies inside the sorted half; if so search there, otherwise search the other half.'
    ],
    approaches: [
      {
        name: 'Modified binary search',
        explanation: 'If nums[lo] <= nums[mid], the left half is sorted: go left when nums[lo] <= target < nums[mid], else go right. Otherwise the right half is sorted: go right when nums[mid] < target <= nums[hi], else go left.'
      }
    ],
    solutions: {
      csharp: `public int Search(int[] nums, int target) {
    int lo = 0, hi = nums.Length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`,
      javascript: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}`,
      python: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
      java: `public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}`
    }
  },
  {
    id: 'min-stack',
    title: 'Min Stack',
    difficulty: 'Medium',
    category: 'Stacks & Design',
    companies: ['Amazon', 'Bloomberg', 'Microsoft', 'Google'],
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(n)',
    description: 'Design a stack that supports `push`, `pop`, `top`, and `getMin` (retrieve the minimum element), all in constant time.',
    examples: [
      {
        input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
        output: '-3, 0, -2'
      }
    ],
    hints: ['The minimum can change on every push and pop.', 'Store, alongside each value, the minimum of the stack at the time it was pushed.'],
    approaches: [
      {
        name: 'Stack of (value, minSoFar) pairs',
        explanation: 'Each entry remembers the minimum beneath it, so popping automatically restores the previous minimum. A second "min stack" is an equivalent alternative.'
      }
    ],
    solutions: {
      csharp: `public class MinStack {
    private readonly Stack<(int Val, int Min)> _stack = new();

    public void Push(int val) {
        int min = _stack.Count == 0 ? val : Math.Min(val, _stack.Peek().Min);
        _stack.Push((val, min));
    }

    public void Pop() => _stack.Pop();
    public int Top() => _stack.Peek().Val;
    public int GetMin() => _stack.Peek().Min;
}`,
      javascript: `class MinStack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    const min = this.stack.length ? Math.min(val, this.getMin()) : val;
    this.stack.push([val, min]);
  }
  pop() {
    this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1][0];
  }
  getMin() {
    return this.stack[this.stack.length - 1][1];
  }
}`,
      python: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        current_min = min(val, self.stack[-1][1]) if self.stack else val
        self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]`,
      java: `class MinStack {
    private final Deque<int[]> stack = new ArrayDeque<>();

    public void push(int val) {
        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
        stack.push(new int[] { val, min });
    }

    public void pop() { stack.pop(); }
    public int top() { return stack.peek()[0]; }
    public int getMin() { return stack.peek()[1]; }
}`
    }
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    category: 'Heaps & Linked Lists',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Uber'],
    timeComplexity: 'O(N log k)',
    spaceComplexity: 'O(k)',
    description: 'Given an array of `k` sorted linked lists, merge them into one sorted linked list and return its head. N is the total number of nodes.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    hints: [
      'Merging lists one by one is O(N·k). Can you always pick the smallest front node faster?',
      'A min-heap of the k current heads gives the next node in O(log k).',
      'Alternatively, merge lists in pairs (divide and conquer) for the same O(N log k).'
    ],
    approaches: [
      {
        name: 'Min-heap of list heads',
        explanation: 'Put each non-empty head in a min-heap keyed by value. Repeatedly pop the smallest, append it, and push its next node. The JavaScript version merges pairs instead, since JS has no built-in heap.'
      }
    ],
    solutions: {
      csharp: `public ListNode MergeKLists(ListNode[] lists) {
    var heap = new PriorityQueue<ListNode, int>();
    foreach (var head in lists) if (head != null) heap.Enqueue(head, head.val);

    var dummy = new ListNode(0);
    var tail = dummy;
    while (heap.Count > 0) {
        var node = heap.Dequeue();
        tail.next = node;
        tail = node;
        if (node.next != null) heap.Enqueue(node.next, node.next.val);
    }
    return dummy.next;
}`,
      javascript: `// Divide and conquer: merge lists in pairs, O(N log k)
function mergeKLists(lists) {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      merged.push(mergeTwo(lists[i], lists[i + 1] || null));
    }
    lists = merged;
  }
  return lists[0];
}

function mergeTwo(a, b) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (a && b) {
    if (a.val <= b.val) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a || b;
  return dummy.next;
}`,
      python: `import heapq

def mergeKLists(lists):
    heap = [(head.val, i, head) for i, head in enumerate(lists) if head]
    heapq.heapify(heap)
    dummy = tail = ListNode(0)
    while heap:
        _, i, node = heapq.heappop(heap)
        tail.next = tail = node
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
      java: `public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
    for (ListNode head : lists) if (head != null) heap.offer(head);

    ListNode dummy = new ListNode(0), tail = dummy;
    while (!heap.isEmpty()) {
        ListNode node = heap.poll();
        tail.next = node;
        tail = node;
        if (node.next != null) heap.offer(node.next);
    }
    return dummy.next;
}`
    }
  }
];

// C# versions of the original six problems in interviewData.js
const CSHARP_FOR_CORE_PROBLEMS = {
  'two-sum': `public int[] TwoSum(int[] nums, int target) {
    var seen = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (seen.TryGetValue(complement, out int j)) return new[] { j, i };
        seen[nums[i]] = i;
    }
    return Array.Empty<int>();
}`,
  'lru-cache': `public class LRUCache {
    private readonly int _capacity;
    private readonly Dictionary<int, LinkedListNode<(int Key, int Value)>> _map = new();
    private readonly LinkedList<(int Key, int Value)> _order = new(); // front = most recent

    public LRUCache(int capacity) => _capacity = capacity;

    public int Get(int key) {
        if (!_map.TryGetValue(key, out var node)) return -1;
        _order.Remove(node);
        _order.AddFirst(node);
        return node.Value.Value;
    }

    public void Put(int key, int value) {
        if (_map.TryGetValue(key, out var existing)) {
            _order.Remove(existing);
        } else if (_map.Count == _capacity) {
            var lru = _order.Last!;
            _order.RemoveLast();
            _map.Remove(lru.Value.Key);
        }
        _map[key] = _order.AddFirst((key, value));
    }
}`,
  'trapping-rain-water': `public int Trap(int[] height) {
    int left = 0, right = height.Length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            leftMax = Math.Max(leftMax, height[left]);
            water += leftMax - height[left];
            left++;
        } else {
            rightMax = Math.Max(rightMax, height[right]);
            water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
  'course-schedule': `public bool CanFinish(int numCourses, int[][] prerequisites) {
    var graph = new List<int>[numCourses];
    var inDegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) graph[i] = new List<int>();
    foreach (var p in prerequisites) {
        graph[p[1]].Add(p[0]);
        inDegree[p[0]]++;
    }

    var queue = new Queue<int>();
    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) queue.Enqueue(i);

    int taken = 0;
    while (queue.Count > 0) {
        int course = queue.Dequeue();
        taken++;
        foreach (int next in graph[course]) {
            if (--inDegree[next] == 0) queue.Enqueue(next);
        }
    }
    return taken == numCourses;
}`,
  'merge-intervals': `public int[][] Merge(int[][] intervals) {
    Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
    var merged = new List<int[]>();
    foreach (var interval in intervals) {
        if (merged.Count > 0 && interval[0] <= merged[^1][1]) {
            merged[^1][1] = Math.Max(merged[^1][1], interval[1]);
        } else {
            merged.Add(interval);
        }
    }
    return merged.ToArray();
}`,
  'coin-change': `public int CoinChange(int[] coins, int amount) {
    var dp = new int[amount + 1];
    Array.Fill(dp, amount + 1); // "infinity"
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        foreach (int coin in coins) {
            if (coin <= a) dp[a] = Math.Min(dp[a], dp[a - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
};

// Every problem shown on the Algorithms tab
export const ALL_CODING_PROBLEMS = [
  ...DSA_PROBLEMS.map((p) =>
    CSHARP_FOR_CORE_PROBLEMS[p.id]
      ? { ...p, solutions: { csharp: CSHARP_FOR_CORE_PROBLEMS[p.id], ...p.solutions } }
      : p
  ),
  ...COMMON_CODING_PROBLEMS
];

// Companies sorted by how many problems they are tagged on
export const CODING_COMPANIES = Object.entries(
  ALL_CODING_PROBLEMS.flatMap((p) => p.companies).reduce((acc, c) => {
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([name]) => name);
