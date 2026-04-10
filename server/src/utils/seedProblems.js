const dotenv   = require('dotenv')
const path     = require('path')
const mongoose = require('mongoose')
const Problem  = require('../models/Problem')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const problems = [

  // ─── ARRAYS ───────────────────────────────────────────────
  {
    title:'Two Sum', slug:'two-sum', difficulty:'Easy',
    tags:['Arrays','HashMap'], companies:['Google','Amazon','Meta','Microsoft'],
    description:'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples:[
      { input:'nums = [2,7,11,15], target = 9', output:'[0,1]', explanation:'nums[0] + nums[1] = 2 + 7 = 9' },
      { input:'nums = [3,2,4], target = 6',     output:'[1,2]', explanation:'nums[1] + nums[2] = 2 + 4 = 6' },
    ],
    constraints:['2 ≤ nums.length ≤ 10⁴','−10⁹ ≤ nums[i] ≤ 10⁹','Only one valid answer exists'],
    starterCode:{ javascript:'function twoSum(nums, target) {\n  \n}', python:'def two_sum(nums, target):\n    pass', java:'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}', cpp:'vector<int> twoSum(vector<int>& nums, int target) {\n    return {};\n}' },
    solution:{ approach:'Use a HashMap. For each number, check if its complement (target - num) exists in the map. If yes, return both indices. If no, add current number to map.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[2,7,11,15], 9', expected:'[0,1]' },{ input:'[3,2,4], 6', expected:'[1,2]' },{ input:'[3,3], 6', expected:'[0,1]', isHidden:true }],
    xpReward:30, isDaily:false,
  },

  {
    title:'Best Time to Buy and Sell Stock', slug:'best-time-to-buy-and-sell-stock', difficulty:'Easy',
    tags:['Arrays','Sliding Window'], companies:['Amazon','Google','Goldman Sachs','Microsoft'],
    description:'You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples:[
      { input:'prices = [7,1,5,3,6,4]', output:'5', explanation:'Buy on day 2 (price=1), sell on day 5 (price=6), profit = 6-1 = 5.' },
      { input:'prices = [7,6,4,3,1]',   output:'0', explanation:'No profit possible.' },
    ],
    constraints:['1 ≤ prices.length ≤ 10⁵','0 ≤ prices[i] ≤ 10⁴'],
    starterCode:{ javascript:'function maxProfit(prices) {\n  \n}', python:'def max_profit(prices):\n    pass', java:'class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}', cpp:'int maxProfit(vector<int>& prices) {\n    return 0;\n}' },
    solution:{ approach:'Track minimum price seen so far and maximum profit. For each price, update min price and check if current price - min price > max profit.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[7,1,5,3,6,4]', expected:'5' },{ input:'[7,6,4,3,1]', expected:'0' },{ input:'[1,2]', expected:'1', isHidden:true }],
    xpReward:30,
  },

  {
    title:'Contains Duplicate', slug:'contains-duplicate', difficulty:'Easy',
    tags:['Arrays','HashMap'], companies:['Amazon','Google','Apple'],
    description:'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    examples:[
      { input:'nums = [1,2,3,1]', output:'true'  },
      { input:'nums = [1,2,3,4]', output:'false' },
    ],
    constraints:['1 ≤ nums.length ≤ 10⁵','−10⁹ ≤ nums[i] ≤ 10⁹'],
    starterCode:{ javascript:'function containsDuplicate(nums) {\n  \n}', python:'def contains_duplicate(nums):\n    pass', java:'class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n}', cpp:'bool containsDuplicate(vector<int>& nums) {\n    return false;\n}' },
    solution:{ approach:'Use a Set. Add each number — if it already exists in the Set, return true.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[1,2,3,1]', expected:'true' },{ input:'[1,2,3,4]', expected:'false' },{ input:'[1,1,1,3,3,4,3,2,4,2]', expected:'true', isHidden:true }],
    xpReward:30,
  },

  {
    title:'Product of Array Except Self', slug:'product-of-array-except-self', difficulty:'Medium',
    tags:['Arrays','Prefix Sum'], companies:['Amazon','Microsoft','Google','Facebook'],
    description:'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.',
    examples:[
      { input:'nums = [1,2,3,4]', output:'[24,12,8,6]'  },
      { input:'nums = [-1,1,0,-3,3]', output:'[0,0,9,0,0]' },
    ],
    constraints:['2 ≤ nums.length ≤ 10⁵','Must run in O(n) without division'],
    starterCode:{ javascript:'function productExceptSelf(nums) {\n  \n}', python:'def product_except_self(nums):\n    pass', java:'class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[]{};\n    }\n}', cpp:'vector<int> productExceptSelf(vector<int>& nums) {\n    return {};\n}' },
    solution:{ approach:'Two pass: left prefix products then right suffix products. No division needed.', timeComplexity:'O(n)', spaceComplexity:'O(1) extra' },
    testCases:[{ input:'[1,2,3,4]', expected:'[24,12,8,6]' },{ input:'[-1,1,0,-3,3]', expected:'[0,0,9,0,0]' }],
    xpReward:50,
  },

  {
    title:'Maximum Subarray', slug:'maximum-subarray', difficulty:'Medium',
    tags:['Arrays','DP'], companies:['Amazon','Google','Microsoft','Adobe'],
    description:'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    examples:[
      { input:'nums = [-2,1,-3,4,-1,2,1,-5,4]', output:'6', explanation:'[4,-1,2,1] has the largest sum = 6.' },
      { input:'nums = [1]', output:'1' },
    ],
    constraints:['1 ≤ nums.length ≤ 10⁵','−10⁴ ≤ nums[i] ≤ 10⁴'],
    starterCode:{ javascript:'function maxSubArray(nums) {\n  \n}', python:'def max_sub_array(nums):\n    pass', java:'class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}', cpp:'int maxSubArray(vector<int>& nums) {\n    return 0;\n}' },
    solution:{ approach:"Kadane's algorithm: track current sum and max sum. If current sum goes negative, reset to 0.", timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[-2,1,-3,4,-1,2,1,-5,4]', expected:'6' },{ input:'[1]', expected:'1' },{ input:'[5,4,-1,7,8]', expected:'23', isHidden:true }],
    xpReward:50,
  },

  {
    title:'Merge Intervals', slug:'merge-intervals', difficulty:'Medium',
    tags:['Arrays','Sorting'], companies:['Google','Facebook','Microsoft','Twitter'],
    description:'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples:[
      { input:'intervals = [[1,3],[2,6],[8,10],[15,18]]', output:'[[1,6],[8,10],[15,18]]', explanation:'[1,3] and [2,6] overlap → [1,6]' },
      { input:'intervals = [[1,4],[4,5]]', output:'[[1,5]]' },
    ],
    constraints:['1 ≤ intervals.length ≤ 10⁴'],
    starterCode:{ javascript:'function merge(intervals) {\n  \n}', python:'def merge(intervals):\n    pass', java:'class Solution {\n    public int[][] merge(int[][] intervals) {\n        return new int[][]{};\n    }\n}', cpp:'vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    return {};\n}' },
    solution:{ approach:'Sort by start. Iterate and merge if current start <= previous end.', timeComplexity:'O(n log n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[[1,3],[2,6],[8,10],[15,18]]', expected:'[[1,6],[8,10],[15,18]]' },{ input:'[[1,4],[4,5]]', expected:'[[1,5]]' }],
    xpReward:50,
  },

  {
    title:'3Sum', slug:'three-sum', difficulty:'Medium',
    tags:['Arrays','Two Pointers'], companies:['Amazon','Google','Microsoft','Adobe'],
    description:'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nThe solution set must not contain duplicate triplets.',
    examples:[
      { input:'nums = [-1,0,1,2,-1,-4]', output:'[[-1,-1,2],[-1,0,1]]' },
      { input:'nums = [0,0,0]',          output:'[[0,0,0]]' },
    ],
    constraints:['3 ≤ nums.length ≤ 3000'],
    starterCode:{ javascript:'function threeSum(nums) {\n  \n}', python:'def three_sum(nums):\n    pass', java:'class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<int>> threeSum(vector<int>& nums) {\n    return {};\n}' },
    solution:{ approach:'Sort array. Fix first element, use two pointers for the remaining two. Skip duplicates.', timeComplexity:'O(n²)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[-1,0,1,2,-1,-4]', expected:'[[-1,-1,2],[-1,0,1]]' },{ input:'[0,0,0]', expected:'[[0,0,0]]' }],
    xpReward:50,
  },

  {
    title:'Trapping Rain Water', slug:'trapping-rain-water', difficulty:'Hard',
    tags:['Arrays','Two Pointers','Stack'], companies:['Google','Amazon','Meta','Uber'],
    description:'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples:[
      { input:'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output:'6', explanation:'6 units of rain water are trapped.' },
      { input:'height = [4,2,0,3,2,5]', output:'9' },
    ],
    constraints:['n == height.length','1 ≤ n ≤ 2×10⁴'],
    starterCode:{ javascript:'function trap(height) {\n  \n}', python:'def trap(height):\n    pass', java:'class Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}', cpp:'int trap(vector<int>& height) {\n    return 0;\n}' },
    solution:{ approach:'Two pointers. Track maxLeft and maxRight. Water = min(maxL, maxR) - height[i].', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[0,1,0,2,1,0,1,3,2,1,2,1]', expected:'6' },{ input:'[4,2,0,3,2,5]', expected:'9', isHidden:true }],
    xpReward:80,
  },

  // ─── TWO POINTERS ──────────────────────────────────────────
  {
    title:'Valid Palindrome', slug:'valid-palindrome', difficulty:'Easy',
    tags:['Two Pointers','Strings'], companies:['Facebook','Microsoft','Amazon'],
    description:'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    examples:[
      { input:"s = 'A man, a plan, a canal: Panama'", output:'true' },
      { input:"s = 'race a car'", output:'false' },
    ],
    constraints:['1 ≤ s.length ≤ 2×10⁵'],
    starterCode:{ javascript:'function isPalindrome(s) {\n  \n}', python:'def is_palindrome(s):\n    pass', java:'class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}', cpp:'bool isPalindrome(string s) {\n    return false;\n}' },
    solution:{ approach:'Two pointers from both ends. Skip non-alphanumeric, compare lowercase characters.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:"'A man, a plan, a canal: Panama'", expected:'true' },{ input:"'race a car'", expected:'false' }],
    xpReward:30,
  },

  {
    title:'Container With Most Water', slug:'container-with-most-water', difficulty:'Medium',
    tags:['Arrays','Two Pointers'], companies:['Google','Amazon','Bloomberg'],
    description:'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container that contains the most water.',
    examples:[
      { input:'height = [1,8,6,2,5,4,8,3,7]', output:'49', explanation:'Lines at index 1 and 8, height = min(8,7) × width = 7×7 = 49.' },
      { input:'height = [1,1]', output:'1' },
    ],
    constraints:['n == height.length','2 ≤ n ≤ 10⁵'],
    starterCode:{ javascript:'function maxArea(height) {\n  \n}', python:'def max_area(height):\n    pass', java:'class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}', cpp:'int maxArea(vector<int>& height) {\n    return 0;\n}' },
    solution:{ approach:'Two pointers. Calculate area = min(left, right) × (right - left). Move the shorter pointer inward.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[1,8,6,2,5,4,8,3,7]', expected:'49' },{ input:'[1,1]', expected:'1' }],
    xpReward:50,
  },

  // ─── SLIDING WINDOW ────────────────────────────────────────
  {
    title:'Longest Substring Without Repeating Characters', slug:'longest-substring-without-repeating-characters', difficulty:'Medium',
    tags:['Strings','Sliding Window','HashMap'], companies:['Amazon','Google','Microsoft','Facebook'],
    description:'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples:[
      { input:"s = 'abcabcbb'", output:'3', explanation:"The answer is 'abc', with the length of 3." },
      { input:"s = 'bbbbb'",    output:'1' },
    ],
    constraints:['0 ≤ s.length ≤ 5×10⁴'],
    starterCode:{ javascript:'function lengthOfLongestSubstring(s) {\n  \n}', python:'def length_of_longest_substring(s):\n    pass', java:'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}', cpp:'int lengthOfLongestSubstring(string s) {\n    return 0;\n}' },
    solution:{ approach:'Sliding window with HashMap. Track last seen index of each character. Move left pointer when duplicate found.', timeComplexity:'O(n)', spaceComplexity:'O(min(m,n))' },
    testCases:[{ input:"'abcabcbb'", expected:'3' },{ input:"'bbbbb'", expected:'1' },{ input:"'pwwkew'", expected:'3', isHidden:true }],
    xpReward:50,
  },

  {
    title:'Minimum Window Substring', slug:'minimum-window-substring', difficulty:'Hard',
    tags:['Strings','Sliding Window','HashMap'], companies:['Facebook','Google','Uber','LinkedIn'],
    description:'Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.\n\nIf there is no such substring, return the empty string "".',
    examples:[
      { input:"s = 'ADOBECODEBANC', t = 'ABC'", output:"'BANC'", explanation:'The minimum window with A, B, C is BANC.' },
      { input:"s = 'a', t = 'a'", output:"'a'" },
    ],
    constraints:['1 ≤ s.length, t.length ≤ 10⁵'],
    starterCode:{ javascript:'function minWindow(s, t) {\n  \n}', python:'def min_window(s, t):\n    pass', java:'class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}', cpp:'string minWindow(string s, string t) {\n    return "";\n}' },
    solution:{ approach:'Sliding window with frequency maps. Expand right until all chars found, then shrink left. Track minimum window.', timeComplexity:'O(s + t)', spaceComplexity:'O(s + t)' },
    testCases:[{ input:"'ADOBECODEBANC', 'ABC'", expected:"'BANC'" },{ input:"'a', 'a'", expected:"'a'" }],
    xpReward:80,
  },

  // ─── STACK ─────────────────────────────────────────────────
  {
    title:'Valid Parentheses', slug:'valid-parentheses', difficulty:'Easy',
    tags:['Stack','Strings'], companies:['Amazon','Google','Microsoft','Facebook'],
    description:'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets in the correct order.',
    examples:[
      { input:"s = '()'",     output:'true'  },
      { input:"s = '()[]{}'", output:'true'  },
      { input:"s = '(]'",     output:'false' },
    ],
    constraints:['1 ≤ s.length ≤ 10⁴'],
    starterCode:{ javascript:'function isValid(s) {\n  \n}', python:'def is_valid(s):\n    pass', java:'class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}', cpp:'bool isValid(string s) {\n    return false;\n}' },
    solution:{ approach:'Stack. Push opening brackets. For closing brackets, check if top of stack matches.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:"'()'", expected:'true' },{ input:"'()[]{}'", expected:'true' },{ input:"'(]'", expected:'false', isHidden:true }],
    xpReward:30,
  },

  {
    title:'Daily Temperatures', slug:'daily-temperatures', difficulty:'Medium',
    tags:['Stack','Arrays'], companies:['Amazon','Google','Uber'],
    description:'Given an array of integers `temperatures` representing the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.',
    examples:[
      { input:'temperatures = [73,74,75,71,69,72,76,73]', output:'[1,1,4,2,1,1,0,0]' },
      { input:'temperatures = [30,40,50,60]', output:'[1,1,1,0]' },
    ],
    constraints:['1 ≤ temperatures.length ≤ 10⁵'],
    starterCode:{ javascript:'function dailyTemperatures(temperatures) {\n  \n}', python:'def daily_temperatures(temperatures):\n    pass', java:'class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        return new int[]{};\n    }\n}', cpp:'vector<int> dailyTemperatures(vector<int>& temperatures) {\n    return {};\n}' },
    solution:{ approach:'Monotonic stack. Store indices. Pop when current temp > stack top temp, record difference.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[73,74,75,71,69,72,76,73]', expected:'[1,1,4,2,1,1,0,0]' },{ input:'[30,40,50,60]', expected:'[1,1,1,0]' }],
    xpReward:50,
  },

  {
    title:'Min Stack', slug:'min-stack', difficulty:'Medium',
    tags:['Stack','Design'], companies:['Amazon','Google','Microsoft'],
    description:'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class with `push`, `pop`, `top`, and `getMin` methods.',
    examples:[
      { input:'MinStack minStack = new MinStack(); minStack.push(-2); minStack.push(0); minStack.push(-3); minStack.getMin(); minStack.pop(); minStack.top(); minStack.getMin();', output:'[-3, 0, -2]' },
    ],
    constraints:['−2³¹ ≤ val ≤ 2³¹ − 1','pop, top, getMin always called on non-empty stack'],
    starterCode:{ javascript:'class MinStack {\n  constructor() {\n    \n  }\n  push(val) {}\n  pop() {}\n  top() {}\n  getMin() {}\n}', python:'class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val):\n        pass\n    def pop(self):\n        pass\n    def top(self):\n        pass\n    def getMin(self):\n        pass', java:'class MinStack {\n    public MinStack() {}\n    public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}', cpp:'class MinStack {\npublic:\n    MinStack() {}\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};' },
    solution:{ approach:'Two stacks — one for values, one for minimums. Push to min stack when value <= current min.', timeComplexity:'O(1) all ops', spaceComplexity:'O(n)' },
    testCases:[{ input:'push(-2), push(0), push(-3), getMin, pop, top, getMin', expected:'-3, 0, -2' }],
    xpReward:50,
  },

  // ─── BINARY SEARCH ─────────────────────────────────────────
  {
    title:'Binary Search', slug:'binary-search', difficulty:'Easy',
    tags:['Binary Search','Arrays'], companies:['Google','Amazon','Microsoft'],
    description:'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.',
    examples:[
      { input:'nums = [-1,0,3,5,9,12], target = 9', output:'4' },
      { input:'nums = [-1,0,3,5,9,12], target = 2', output:'-1' },
    ],
    constraints:['1 ≤ nums.length ≤ 10⁴','All integers are unique, sorted ascending'],
    starterCode:{ javascript:'function search(nums, target) {\n  \n}', python:'def search(nums, target):\n    pass', java:'class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}', cpp:'int search(vector<int>& nums, int target) {\n    return -1;\n}' },
    solution:{ approach:'Classic binary search. Left and right pointers. Check middle each iteration.', timeComplexity:'O(log n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[-1,0,3,5,9,12], 9', expected:'4' },{ input:'[-1,0,3,5,9,12], 2', expected:'-1' }],
    xpReward:30,
  },

  {
    title:'Search in Rotated Sorted Array', slug:'search-in-rotated-sorted-array', difficulty:'Medium',
    tags:['Binary Search','Arrays'], companies:['Amazon','Microsoft','Google','Facebook'],
    description:'Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.',
    examples:[
      { input:'nums = [4,5,6,7,0,1,2], target = 0', output:'4' },
      { input:'nums = [4,5,6,7,0,1,2], target = 3', output:'-1' },
    ],
    constraints:['1 ≤ nums.length ≤ 5000','All values unique'],
    starterCode:{ javascript:'function search(nums, target) {\n  \n}', python:'def search(nums, target):\n    pass', java:'class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}', cpp:'int search(vector<int>& nums, int target) {\n    return -1;\n}' },
    solution:{ approach:'Modified binary search. Determine which half is sorted, check if target in that half.', timeComplexity:'O(log n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[4,5,6,7,0,1,2], 0', expected:'4' },{ input:'[4,5,6,7,0,1,2], 3', expected:'-1' }],
    xpReward:50,
  },

  {
    title:'Find Minimum in Rotated Sorted Array', slug:'find-minimum-in-rotated-sorted-array', difficulty:'Medium',
    tags:['Binary Search','Arrays'], companies:['Microsoft','Amazon','Google'],
    description:'Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.',
    examples:[
      { input:'nums = [3,4,5,1,2]', output:'1' },
      { input:'nums = [4,5,6,7,0,1,2]', output:'0' },
    ],
    constraints:['n == nums.length','1 ≤ n ≤ 5000'],
    starterCode:{ javascript:'function findMin(nums) {\n  \n}', python:'def find_min(nums):\n    pass', java:'class Solution {\n    public int findMin(int[] nums) {\n        return 0;\n    }\n}', cpp:'int findMin(vector<int>& nums) {\n    return 0;\n}' },
    solution:{ approach:'Binary search. If mid > right, minimum is in right half. Else in left half including mid.', timeComplexity:'O(log n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[3,4,5,1,2]', expected:'1' },{ input:'[4,5,6,7,0,1,2]', expected:'0' }],
    xpReward:50,
  },

  // ─── LINKED LIST ────────────────────────────────────────────
  {
    title:'Reverse Linked List', slug:'reverse-linked-list', difficulty:'Easy',
    tags:['LinkedList'], companies:['Amazon','Google','Microsoft','Apple'],
    description:'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples:[
      { input:'head = [1,2,3,4,5]', output:'[5,4,3,2,1]' },
      { input:'head = [1,2]',       output:'[2,1]' },
    ],
    constraints:['0 ≤ number of nodes ≤ 5000'],
    starterCode:{ javascript:'function reverseList(head) {\n  \n}', python:'def reverse_list(head):\n    pass', java:'class Solution {\n    public ListNode reverseList(ListNode head) {\n        return null;\n    }\n}', cpp:'ListNode* reverseList(ListNode* head) {\n    return nullptr;\n}' },
    solution:{ approach:'Iterative: prev=null, curr=head. At each step: next=curr.next, curr.next=prev, prev=curr, curr=next.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[1,2,3,4,5]', expected:'[5,4,3,2,1]' },{ input:'[1,2]', expected:'[2,1]' }],
    xpReward:30,
  },

  {
    title:'Merge Two Sorted Lists', slug:'merge-two-sorted-lists', difficulty:'Easy',
    tags:['LinkedList'], companies:['Amazon','Google','Microsoft'],
    description:'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. Return the head of the merged linked list.',
    examples:[
      { input:'list1 = [1,2,4], list2 = [1,3,4]', output:'[1,1,2,3,4,4]' },
      { input:'list1 = [], list2 = []',            output:'[]' },
    ],
    constraints:['0 ≤ number of nodes ≤ 50'],
    starterCode:{ javascript:'function mergeTwoLists(list1, list2) {\n  \n}', python:'def merge_two_lists(list1, list2):\n    pass', java:'class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        return null;\n    }\n}', cpp:'ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    return nullptr;\n}' },
    solution:{ approach:'Dummy head node. Compare heads of both lists, attach smaller one. Advance that pointer.', timeComplexity:'O(n+m)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[1,2,4], [1,3,4]', expected:'[1,1,2,3,4,4]' },{ input:'[], []', expected:'[]' }],
    xpReward:30,
  },

  {
    title:'Linked List Cycle', slug:'linked-list-cycle', difficulty:'Easy',
    tags:['LinkedList','Two Pointers'], companies:['Amazon','Microsoft','Google'],
    description:'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.',
    examples:[
      { input:'head = [3,2,0,-4], pos = 1', output:'true', explanation:'Tail connects to node at index 1.' },
      { input:'head = [1], pos = -1',       output:'false' },
    ],
    constraints:['0 ≤ number of nodes ≤ 10⁴'],
    starterCode:{ javascript:'function hasCycle(head) {\n  \n}', python:'def has_cycle(head):\n    pass', java:'class Solution {\n    public boolean hasCycle(ListNode head) {\n        return false;\n    }\n}', cpp:'bool hasCycle(ListNode *head) {\n    return false;\n}' },
    solution:{ approach:"Floyd's cycle detection — slow and fast pointers. If they meet, cycle exists.", timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[3,2,0,-4], pos=1', expected:'true' },{ input:'[1], pos=-1', expected:'false' }],
    xpReward:30,
  },

  {
    title:'Remove Nth Node From End of List', slug:'remove-nth-node-from-end', difficulty:'Medium',
    tags:['LinkedList','Two Pointers'], companies:['Amazon','Microsoft','Google'],
    description:'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    examples:[
      { input:'head = [1,2,3,4,5], n = 2', output:'[1,2,3,5]' },
      { input:'head = [1], n = 1',          output:'[]' },
    ],
    constraints:['1 ≤ number of nodes ≤ 30'],
    starterCode:{ javascript:'function removeNthFromEnd(head, n) {\n  \n}', python:'def remove_nth_from_end(head, n):\n    pass', java:'class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        return null;\n    }\n}', cpp:'ListNode* removeNthFromEnd(ListNode* head, int n) {\n    return nullptr;\n}' },
    solution:{ approach:'Two pointers n+1 apart. Move both until fast reaches end. Remove slow.next.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[1,2,3,4,5], 2', expected:'[1,2,3,5]' },{ input:'[1], 1', expected:'[]' }],
    xpReward:50,
  },

  {
    title:'Reorder List', slug:'reorder-list', difficulty:'Medium',
    tags:['LinkedList','Two Pointers'], companies:['Amazon','Google'],
    description:'You are given the head of a singly linked-list: L0 → L1 → … → Ln-1 → Ln.\n\nReorder it to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …\n\nYou may not modify the values in the nodes. Only nodes themselves may be changed.',
    examples:[
      { input:'head = [1,2,3,4]',   output:'[1,4,2,3]' },
      { input:'head = [1,2,3,4,5]', output:'[1,5,2,4,3]' },
    ],
    constraints:['1 ≤ number of nodes ≤ 5×10⁴'],
    starterCode:{ javascript:'function reorderList(head) {\n  \n}', python:'def reorder_list(head):\n    pass', java:'class Solution {\n    public void reorderList(ListNode head) {}\n}', cpp:'void reorderList(ListNode* head) {}' },
    solution:{ approach:'Find middle, reverse second half, merge two halves.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[1,2,3,4]', expected:'[1,4,2,3]' },{ input:'[1,2,3,4,5]', expected:'[1,5,2,4,3]' }],
    xpReward:50,
  },

  // ─── TREES ──────────────────────────────────────────────────
  {
    title:'Maximum Depth of Binary Tree', slug:'maximum-depth-of-binary-tree', difficulty:'Easy',
    tags:['Trees','DFS','BFS'], companies:['Amazon','Google','LinkedIn'],
    description:'Given the root of a binary tree, return its maximum depth.\n\nA binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples:[
      { input:'root = [3,9,20,null,null,15,7]', output:'3' },
      { input:'root = [1,null,2]',              output:'2' },
    ],
    constraints:['0 ≤ number of nodes ≤ 10⁴'],
    starterCode:{ javascript:'function maxDepth(root) {\n  \n}', python:'def max_depth(root):\n    pass', java:'class Solution {\n    public int maxDepth(TreeNode root) {\n        return 0;\n    }\n}', cpp:'int maxDepth(TreeNode* root) {\n    return 0;\n}' },
    solution:{ approach:'DFS recursively: return 1 + max(left depth, right depth). Base case: null = 0.', timeComplexity:'O(n)', spaceComplexity:'O(h)' },
    testCases:[{ input:'[3,9,20,null,null,15,7]', expected:'3' },{ input:'[1,null,2]', expected:'2' }],
    xpReward:30,
  },

  {
    title:'Invert Binary Tree', slug:'invert-binary-tree', difficulty:'Easy',
    tags:['Trees','DFS'], companies:['Google','Amazon','Facebook'],
    description:'Given the root of a binary tree, invert the tree, and return its root.',
    examples:[
      { input:'root = [4,2,7,1,3,6,9]', output:'[4,7,2,9,6,3,1]' },
      { input:'root = [2,1,3]',          output:'[2,3,1]' },
    ],
    constraints:['0 ≤ number of nodes ≤ 100'],
    starterCode:{ javascript:'function invertTree(root) {\n  \n}', python:'def invert_tree(root):\n    pass', java:'class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        return null;\n    }\n}', cpp:'TreeNode* invertTree(TreeNode* root) {\n    return nullptr;\n}' },
    solution:{ approach:'Recursively swap left and right children at every node.', timeComplexity:'O(n)', spaceComplexity:'O(h)' },
    testCases:[{ input:'[4,2,7,1,3,6,9]', expected:'[4,7,2,9,6,3,1]' },{ input:'[2,1,3]', expected:'[2,3,1]' }],
    xpReward:30,
  },

  {
    title:'Same Tree', slug:'same-tree', difficulty:'Easy',
    tags:['Trees','DFS'], companies:['Amazon','Bloomberg'],
    description:'Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
    examples:[
      { input:'p = [1,2,3], q = [1,2,3]', output:'true'  },
      { input:'p = [1,2], q = [1,null,2]', output:'false' },
    ],
    constraints:['0 ≤ number of nodes ≤ 100'],
    starterCode:{ javascript:'function isSameTree(p, q) {\n  \n}', python:'def is_same_tree(p, q):\n    pass', java:'class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        return false;\n    }\n}', cpp:'bool isSameTree(TreeNode* p, TreeNode* q) {\n    return false;\n}' },
    solution:{ approach:'DFS. Both null → true. One null → false. Values differ → false. Recurse on children.', timeComplexity:'O(n)', spaceComplexity:'O(h)' },
    testCases:[{ input:'[1,2,3], [1,2,3]', expected:'true' },{ input:'[1,2], [1,null,2]', expected:'false' }],
    xpReward:30,
  },

  {
    title:'Binary Tree Level Order Traversal', slug:'binary-tree-level-order-traversal', difficulty:'Medium',
    tags:['Trees','BFS'], companies:['Amazon','Google','Microsoft','Facebook'],
    description:'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    examples:[
      { input:'root = [3,9,20,null,null,15,7]', output:'[[3],[9,20],[15,7]]' },
      { input:'root = [1]',                      output:'[[1]]' },
    ],
    constraints:['0 ≤ number of nodes ≤ 2000'],
    starterCode:{ javascript:'function levelOrder(root) {\n  \n}', python:'def level_order(root):\n    pass', java:'class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<int>> levelOrder(TreeNode* root) {\n    return {};\n}' },
    solution:{ approach:'BFS with a queue. Process each level by iterating queue size at start of each level.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[3,9,20,null,null,15,7]', expected:'[[3],[9,20],[15,7]]' },{ input:'[1]', expected:'[[1]]' }],
    xpReward:50,
  },

  {
    title:'Validate Binary Search Tree', slug:'validate-binary-search-tree', difficulty:'Medium',
    tags:['Trees','DFS','BST'], companies:['Amazon','Google','Microsoft'],
    description:'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples:[
      { input:'root = [2,1,3]',         output:'true'  },
      { input:'root = [5,1,4,null,null,3,6]', output:'false' },
    ],
    constraints:['1 ≤ number of nodes ≤ 10⁴'],
    starterCode:{ javascript:'function isValidBST(root) {\n  \n}', python:'def is_valid_bst(root):\n    pass', java:'class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return false;\n    }\n}', cpp:'bool isValidBST(TreeNode* root) {\n    return false;\n}' },
    solution:{ approach:'DFS with min/max bounds. Each node must be within (min, max). Left: max=node.val, Right: min=node.val.', timeComplexity:'O(n)', spaceComplexity:'O(h)' },
    testCases:[{ input:'[2,1,3]', expected:'true' },{ input:'[5,1,4,null,null,3,6]', expected:'false' }],
    xpReward:50,
  },

  {
    title:'Lowest Common Ancestor of BST', slug:'lowest-common-ancestor-bst', difficulty:'Medium',
    tags:['Trees','BST'], companies:['Amazon','Microsoft','Google'],
    description:'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
    examples:[
      { input:'root = [6,2,8,0,4,7,9], p = 2, q = 8', output:'6' },
      { input:'root = [6,2,8,0,4,7,9], p = 2, q = 4', output:'2' },
    ],
    constraints:['2 ≤ number of nodes ≤ 10⁵'],
    starterCode:{ javascript:'function lowestCommonAncestor(root, p, q) {\n  \n}', python:'def lowest_common_ancestor(root, p, q):\n    pass', java:'class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        return null;\n    }\n}', cpp:'TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    return nullptr;\n}' },
    solution:{ approach:'If both p and q < root, go left. If both > root, go right. Else current node is LCA.', timeComplexity:'O(h)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[6,2,8,0,4,7,9], p=2, q=8', expected:'6' },{ input:'[6,2,8,0,4,7,9], p=2, q=4', expected:'2' }],
    xpReward:50,
  },

  {
    title:'Binary Tree Maximum Path Sum', slug:'binary-tree-maximum-path-sum', difficulty:'Hard',
    tags:['Trees','DFS','DP'], companies:['Google','Amazon','Microsoft','Facebook'],
    description:'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once.\n\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.',
    examples:[
      { input:'root = [1,2,3]',                     output:'6', explanation:'1+2+3=6' },
      { input:'root = [-10,9,20,null,null,15,7]',    output:'42', explanation:'15+20+7=42' },
    ],
    constraints:['1 ≤ number of nodes ≤ 3×10⁴'],
    starterCode:{ javascript:'function maxPathSum(root) {\n  \n}', python:'def max_path_sum(root):\n    pass', java:'class Solution {\n    public int maxPathSum(TreeNode root) {\n        return 0;\n    }\n}', cpp:'int maxPathSum(TreeNode* root) {\n    return 0;\n}' },
    solution:{ approach:'DFS. At each node, max gain = node.val + max(0, left gain, right gain). Update global max with left + node + right.', timeComplexity:'O(n)', spaceComplexity:'O(h)' },
    testCases:[{ input:'[1,2,3]', expected:'6' },{ input:'[-10,9,20,null,null,15,7]', expected:'42' }],
    xpReward:80,
  },

  // ─── GRAPHS ─────────────────────────────────────────────────
  {
    title:'Number of Islands', slug:'number-of-islands', difficulty:'Medium',
    tags:['Graphs','DFS','BFS'], companies:['Amazon','Google','Microsoft','Facebook'],
    description:'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'s` (land) and `\'0\'s` (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples:[
      { input:'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output:'1' },
      { input:'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output:'3' },
    ],
    constraints:['1 ≤ m, n ≤ 300'],
    starterCode:{ javascript:'function numIslands(grid) {\n  \n}', python:'def num_islands(grid):\n    pass', java:'class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}', cpp:'int numIslands(vector<vector<char>>& grid) {\n    return 0;\n}' },
    solution:{ approach:'DFS/BFS from each unvisited land cell. Mark visited cells. Count starts.', timeComplexity:'O(m×n)', spaceComplexity:'O(m×n)' },
    testCases:[{ input:'[["1","1","0"],["0","1","0"],["0","0","1"]]', expected:'2' }],
    xpReward:50,
  },

  {
    title:'Clone Graph', slug:'clone-graph', difficulty:'Medium',
    tags:['Graphs','DFS','BFS','HashMap'], companies:['Facebook','Google','Amazon'],
    description:'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node contains a value and a list of its neighbors.',
    examples:[
      { input:'adjList = [[2,4],[1,3],[2,4],[1,3]]', output:'[[2,4],[1,3],[2,4],[1,3]]' },
    ],
    constraints:['0 ≤ number of nodes ≤ 100'],
    starterCode:{ javascript:'function cloneGraph(node) {\n  \n}', python:'def clone_graph(node):\n    pass', java:'class Solution {\n    public Node cloneGraph(Node node) {\n        return null;\n    }\n}', cpp:'Node* cloneGraph(Node* node) {\n    return nullptr;\n}' },
    solution:{ approach:'DFS + HashMap. Map original node to its clone. For each neighbor, recurse if not yet cloned.', timeComplexity:'O(n+e)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[[2,4],[1,3],[2,4],[1,3]]', expected:'[[2,4],[1,3],[2,4],[1,3]]' }],
    xpReward:50,
  },

  {
    title:'Course Schedule', slug:'course-schedule', difficulty:'Medium',
    tags:['Graphs','Topological Sort','BFS'], companies:['Amazon','Google','Facebook','Uber'],
    description:'There are `numCourses` courses labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.',
    examples:[
      { input:'numCourses = 2, prerequisites = [[1,0]]',       output:'true'  },
      { input:'numCourses = 2, prerequisites = [[1,0],[0,1]]', output:'false', explanation:'Cycle detected.' },
    ],
    constraints:['1 ≤ numCourses ≤ 2000'],
    starterCode:{ javascript:'function canFinish(numCourses, prerequisites) {\n  \n}', python:'def can_finish(num_courses, prerequisites):\n    pass', java:'class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        return false;\n    }\n}', cpp:'bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    return false;\n}' },
    solution:{ approach:'Detect cycle using DFS or Kahn\'s BFS algorithm (topological sort). If cycle exists, return false.', timeComplexity:'O(V+E)', spaceComplexity:'O(V+E)' },
    testCases:[{ input:'2, [[1,0]]', expected:'true' },{ input:'2, [[1,0],[0,1]]', expected:'false' }],
    xpReward:50,
  },

  {
    title:'Word Ladder', slug:'word-ladder', difficulty:'Hard',
    tags:['Graphs','BFS','Strings'], companies:['Amazon','Google','Facebook','LinkedIn'],
    description:'A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence where each adjacent pair of words differs by a single letter.\n\nGiven `beginWord`, `endWord`, and `wordList`, return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.',
    examples:[
      { input:'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output:'5', explanation:'hit → hot → dot → dog → cog' },
    ],
    constraints:['1 ≤ wordList.length ≤ 5000','All words same length'],
    starterCode:{ javascript:'function ladderLength(beginWord, endWord, wordList) {\n  \n}', python:'def ladder_length(begin_word, end_word, word_list):\n    pass', java:'class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        return 0;\n    }\n}', cpp:'int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    return 0;\n}' },
    solution:{ approach:'BFS. Change each character of current word to a-z. If result in wordList, add to queue. Track visited.', timeComplexity:'O(M²×N)', spaceComplexity:'O(M²×N)' },
    testCases:[{ input:'"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expected:'5' }],
    xpReward:80,
  },

  // ─── DYNAMIC PROGRAMMING ────────────────────────────────────
  {
    title:'Climbing Stairs', slug:'climbing-stairs', difficulty:'Easy',
    tags:['DP'], companies:['Amazon','Google','Apple','Uber'],
    description:'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples:[
      { input:'n = 2', output:'2', explanation:'1+1 or 2' },
      { input:'n = 3', output:'3', explanation:'1+1+1, 1+2, or 2+1' },
    ],
    constraints:['1 ≤ n ≤ 45'],
    starterCode:{ javascript:'function climbStairs(n) {\n  \n}', python:'def climb_stairs(n):\n    pass', java:'class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}', cpp:'int climbStairs(int n) {\n    return 0;\n}' },
    solution:{ approach:'f(n) = f(n-1) + f(n-2). Same as Fibonacci. Use two variables instead of full array.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'2', expected:'2' },{ input:'3', expected:'3' },{ input:'5', expected:'8', isHidden:true }],
    xpReward:30,
    isDaily:true, dailyDate: new Date(),
  },

  {
    title:'House Robber', slug:'house-robber', difficulty:'Medium',
    tags:['DP'], companies:['Amazon','Google','Microsoft','Airbnb'],
    description:'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. You cannot rob two adjacent houses.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob.',
    examples:[
      { input:'nums = [1,2,3,1]', output:'4', explanation:'Rob house 1 (1) + house 3 (3) = 4.' },
      { input:'nums = [2,7,9,3,1]', output:'12', explanation:'Rob house 1 (2) + house 3 (9) + house 5 (1) = 12.' },
    ],
    constraints:['1 ≤ nums.length ≤ 100'],
    starterCode:{ javascript:'function rob(nums) {\n  \n}', python:'def rob(nums):\n    pass', java:'class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}', cpp:'int rob(vector<int>& nums) {\n    return 0;\n}' },
    solution:{ approach:'dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Only keep two variables.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[1,2,3,1]', expected:'4' },{ input:'[2,7,9,3,1]', expected:'12' }],
    xpReward:50,
  },

  {
    title:'Coin Change', slug:'coin-change', difficulty:'Medium',
    tags:['DP'], companies:['Google','Amazon','Microsoft','Goldman Sachs'],
    description:'You are given an integer array `coins` representing coins of various denominations and an integer `amount`. Return the fewest number of coins needed to make up that amount. Return -1 if it cannot be achieved.',
    examples:[
      { input:'coins = [1,5,11], amount = 11', output:'1' },
      { input:'coins = [1,2,5], amount = 11',  output:'3' },
      { input:'coins = [2], amount = 3',        output:'-1' },
    ],
    constraints:['1 ≤ coins.length ≤ 12','0 ≤ amount ≤ 10⁴'],
    starterCode:{ javascript:'function coinChange(coins, amount) {\n  \n}', python:'def coin_change(coins, amount):\n    pass', java:'class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}', cpp:'int coinChange(vector<int>& coins, int amount) {\n    return -1;\n}' },
    solution:{ approach:'Bottom-up DP. dp[i] = min coins for amount i. For each coin, update dp[coin..amount].', timeComplexity:'O(amount × coins)', spaceComplexity:'O(amount)' },
    testCases:[{ input:'[1,5,11], 11', expected:'1' },{ input:'[1,2,5], 11', expected:'3' },{ input:'[2], 3', expected:'-1', isHidden:true }],
    xpReward:50,
  },

  {
    title:'Longest Increasing Subsequence', slug:'longest-increasing-subsequence', difficulty:'Medium',
    tags:['DP','Binary Search'], companies:['Amazon','Google','Microsoft','Adobe'],
    description:'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.',
    examples:[
      { input:'nums = [10,9,2,5,3,7,101,18]', output:'4', explanation:'[2,3,7,101] length 4.' },
      { input:'nums = [0,1,0,3,2,3]',          output:'4' },
    ],
    constraints:['1 ≤ nums.length ≤ 2500'],
    starterCode:{ javascript:'function lengthOfLIS(nums) {\n  \n}', python:'def length_of_lis(nums):\n    pass', java:'class Solution {\n    public int lengthOfLIS(int[] nums) {\n        return 0;\n    }\n}', cpp:'int lengthOfLIS(vector<int>& nums) {\n    return 0;\n}' },
    solution:{ approach:'DP O(n²): dp[i] = max(dp[j]+1) for all j < i where nums[j] < nums[i]. Or O(n log n) with patience sorting.', timeComplexity:'O(n²) or O(n log n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[10,9,2,5,3,7,101,18]', expected:'4' },{ input:'[0,1,0,3,2,3]', expected:'4' }],
    xpReward:50,
  },

  {
    title:'Longest Common Subsequence', slug:'longest-common-subsequence', difficulty:'Medium',
    tags:['DP','Strings'], companies:['Amazon','Google','Microsoft'],
    description:'Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
    examples:[
      { input:'text1 = "abcde", text2 = "ace"',  output:'3', explanation:'"ace" length 3.' },
      { input:'text1 = "abc", text2 = "abc"',     output:'3' },
      { input:'text1 = "abc", text2 = "def"',     output:'0' },
    ],
    constraints:['1 ≤ text1.length, text2.length ≤ 1000'],
    starterCode:{ javascript:'function longestCommonSubsequence(text1, text2) {\n  \n}', python:'def longest_common_subsequence(text1, text2):\n    pass', java:'class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        return 0;\n    }\n}', cpp:'int longestCommonSubsequence(string text1, string text2) {\n    return 0;\n}' },
    solution:{ approach:'2D DP. dp[i][j] = LCS of text1[0..i] and text2[0..j]. If chars match: dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]).', timeComplexity:'O(m×n)', spaceComplexity:'O(m×n)' },
    testCases:[{ input:'"abcde", "ace"', expected:'3' },{ input:'"abc", "abc"', expected:'3' }],
    xpReward:50,
  },

  {
    title:'Word Break', slug:'word-break', difficulty:'Medium',
    tags:['DP','Strings'], companies:['Amazon','Google','Facebook','Bloomberg'],
    description:'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.',
    examples:[
      { input:'s = "leetcode", wordDict = ["leet","code"]', output:'true' },
      { input:'s = "applepenapple", wordDict = ["apple","pen"]', output:'true' },
      { input:'s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output:'false' },
    ],
    constraints:['1 ≤ s.length ≤ 300'],
    starterCode:{ javascript:'function wordBreak(s, wordDict) {\n  \n}', python:'def word_break(s, word_dict):\n    pass', java:'class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        return false;\n    }\n}', cpp:'bool wordBreak(string s, vector<string>& wordDict) {\n    return false;\n}' },
    solution:{ approach:'DP. dp[i] = true if s[0..i] can be segmented. For each i, check all words ending at i.', timeComplexity:'O(n²)', spaceComplexity:'O(n)' },
    testCases:[{ input:'"leetcode", ["leet","code"]', expected:'true' },{ input:'"catsandog", ["cats","dog","sand","and","cat"]', expected:'false' }],
    xpReward:50,
  },

  {
    title:'Combination Sum', slug:'combination-sum', difficulty:'Medium',
    tags:['DP','Backtracking'], companies:['Amazon','Google','Microsoft'],
    description:'Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times.',
    examples:[
      { input:'candidates = [2,3,6,7], target = 7', output:'[[2,2,3],[7]]' },
      { input:'candidates = [2,3,5], target = 8',   output:'[[2,2,2,2],[2,3,3],[3,5]]' },
    ],
    constraints:['1 ≤ candidates.length ≤ 30','2 ≤ target ≤ 40'],
    starterCode:{ javascript:'function combinationSum(candidates, target) {\n  \n}', python:'def combination_sum(candidates, target):\n    pass', java:'class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n    return {};\n}' },
    solution:{ approach:'Backtracking. At each step, choose current candidate (can reuse) or skip. Prune when sum > target.', timeComplexity:'O(N^(T/M))', spaceComplexity:'O(T/M)' },
    testCases:[{ input:'[2,3,6,7], 7', expected:'[[2,2,3],[7]]' },{ input:'[2,3,5], 8', expected:'[[2,2,2,2],[2,3,3],[3,5]]' }],
    xpReward:50,
  },

  {
    title:'Unique Paths', slug:'unique-paths', difficulty:'Medium',
    tags:['DP','Math'], companies:['Amazon','Google','Microsoft'],
    description:'There is a robot on an `m x n` grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point in time.\n\nGiven the two integers `m` and `n`, return the number of possible unique paths.',
    examples:[
      { input:'m = 3, n = 7', output:'28' },
      { input:'m = 3, n = 2', output:'3' },
    ],
    constraints:['1 ≤ m, n ≤ 100'],
    starterCode:{ javascript:'function uniquePaths(m, n) {\n  \n}', python:'def unique_paths(m, n):\n    pass', java:'class Solution {\n    public int uniquePaths(int m, int n) {\n        return 0;\n    }\n}', cpp:'int uniquePaths(int m, int n) {\n    return 0;\n}' },
    solution:{ approach:'2D DP. dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row and column are all 1s.', timeComplexity:'O(m×n)', spaceComplexity:'O(m×n)' },
    testCases:[{ input:'3, 7', expected:'28' },{ input:'3, 2', expected:'3' }],
    xpReward:50,
  },

  {
    title:'Jump Game', slug:'jump-game', difficulty:'Medium',
    tags:['DP','Greedy'], companies:['Amazon','Microsoft','Google'],
    description:'You are given an integer array `nums`. You are initially positioned at the first index of the array. Each element represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.',
    examples:[
      { input:'nums = [2,3,1,1,4]', output:'true' },
      { input:'nums = [3,2,1,0,4]', output:'false' },
    ],
    constraints:['1 ≤ nums.length ≤ 10⁴'],
    starterCode:{ javascript:'function canJump(nums) {\n  \n}', python:'def can_jump(nums):\n    pass', java:'class Solution {\n    public boolean canJump(int[] nums) {\n        return false;\n    }\n}', cpp:'bool canJump(vector<int>& nums) {\n    return false;\n}' },
    solution:{ approach:'Track maximum reachable index. If current index > max reachable, return false.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[2,3,1,1,4]', expected:'true' },{ input:'[3,2,1,0,4]', expected:'false' }],
    xpReward:50,
  },

  // ─── STRINGS ─────────────────────────────────────────────────
  {
    title:'Valid Anagram', slug:'valid-anagram', difficulty:'Easy',
    tags:['Strings','HashMap'], companies:['Amazon','Google','Microsoft'],
    description:'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
    examples:[
      { input:"s = 'anagram', t = 'nagaram'", output:'true'  },
      { input:"s = 'rat', t = 'car'",         output:'false' },
    ],
    constraints:['1 ≤ s.length, t.length ≤ 5×10⁴'],
    starterCode:{ javascript:'function isAnagram(s, t) {\n  \n}', python:'def is_anagram(s, t):\n    pass', java:'class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}', cpp:'bool isAnagram(string s, string t) {\n    return false;\n}' },
    solution:{ approach:'Count character frequencies. Either sort both strings, or use HashMap/array of size 26.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:"'anagram', 'nagaram'", expected:'true' },{ input:"'rat', 'car'", expected:'false' }],
    xpReward:30,
  },

  {
    title:'Group Anagrams', slug:'group-anagrams', difficulty:'Medium',
    tags:['Strings','HashMap'], companies:['Amazon','Google','Facebook','Microsoft'],
    description:'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    examples:[
      { input:'strs = ["eat","tea","tan","ate","nat","bat"]', output:'[["bat"],["nat","tan"],["ate","eat","tea"]]' },
    ],
    constraints:['1 ≤ strs.length ≤ 10⁴'],
    starterCode:{ javascript:'function groupAnagrams(strs) {\n  \n}', python:'def group_anagrams(strs):\n    pass', java:'class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    return {};\n}' },
    solution:{ approach:'Sort each word as key in HashMap. Group words with same sorted key.', timeComplexity:'O(n×k×log k)', spaceComplexity:'O(n×k)' },
    testCases:[{ input:'["eat","tea","tan","ate","nat","bat"]', expected:'[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
    xpReward:50,
  },

  {
    title:'Encode and Decode Strings', slug:'encode-and-decode-strings', difficulty:'Medium',
    tags:['Strings','Design'], companies:['Google','Facebook','Uber'],
    description:'Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and decoded back to the original list of strings.\n\nImplement `encode` and `decode` functions.',
    examples:[
      { input:'["lint","code","love","you"]', output:'["lint","code","love","you"]', explanation:'Encode then decode returns original.' },
    ],
    constraints:['0 ≤ strs.length < 100','0 ≤ strs[i].length < 100'],
    starterCode:{ javascript:'function encode(strs) {\n  \n}\nfunction decode(s) {\n  \n}', python:'def encode(strs):\n    pass\ndef decode(s):\n    pass', java:'public String encode(List<String> strs) {\n    return "";\n}\npublic List<String> decode(String s) {\n    return new ArrayList<>();\n}', cpp:'string encode(vector<string> strs) {\n    return "";\n}\nvector<string> decode(string s) {\n    return {};\n}' },
    solution:{ approach:'Prefix each string with its length + a delimiter: "4#lint4#code". Decode by reading length, skip delimiter, read n chars.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'["lint","code","love","you"]', expected:'["lint","code","love","you"]' }],
    xpReward:50,
  },

  // ─── HEAP / PRIORITY QUEUE ───────────────────────────────────
  {
    title:'Top K Frequent Elements', slug:'top-k-frequent-elements', difficulty:'Medium',
    tags:['Heap','HashMap','Bucket Sort'], companies:['Amazon','Google','Facebook','Microsoft'],
    description:'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    examples:[
      { input:'nums = [1,1,1,2,2,3], k = 2', output:'[1,2]' },
      { input:'nums = [1], k = 1',            output:'[1]'   },
    ],
    constraints:['1 ≤ k ≤ nums.length ≤ 10⁵'],
    starterCode:{ javascript:'function topKFrequent(nums, k) {\n  \n}', python:'def top_k_frequent(nums, k):\n    pass', java:'class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        return new int[]{};\n    }\n}', cpp:'vector<int> topKFrequent(vector<int>& nums, int k) {\n    return {};\n}' },
    solution:{ approach:'HashMap for frequencies. Bucket sort by frequency (O(n)) or min-heap of size k (O(n log k)).', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[1,1,1,2,2,3], 2', expected:'[1,2]' },{ input:'[1], 1', expected:'[1]' }],
    xpReward:50,
  },

  {
    title:'Find Median from Data Stream', slug:'find-median-from-data-stream', difficulty:'Hard',
    tags:['Heap','Design'], companies:['Amazon','Google','Microsoft','Bloomberg'],
    description:'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the `MedianFinder` class with `addNum` and `findMedian` methods.',
    examples:[
      { input:'["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"] [[],[1],[2],[],[3],[]]', output:'[null,null,null,1.5,null,2.0]' },
    ],
    constraints:['−10⁵ ≤ num ≤ 10⁵'],
    starterCode:{ javascript:'class MedianFinder {\n  constructor() {}\n  addNum(num) {}\n  findMedian() { return 0; }\n}', python:'class MedianFinder:\n    def __init__(self):\n        pass\n    def add_num(self, num):\n        pass\n    def find_median(self):\n        return 0', java:'class MedianFinder {\n    public MedianFinder() {}\n    public void addNum(int num) {}\n    public double findMedian() { return 0.0; }\n}', cpp:'class MedianFinder {\npublic:\n    MedianFinder() {}\n    void addNum(int num) {}\n    double findMedian() { return 0.0; }\n};' },
    solution:{ approach:'Two heaps: max-heap for lower half, min-heap for upper half. Balance sizes. Median = top of larger heap or average of tops.', timeComplexity:'O(log n) add, O(1) find', spaceComplexity:'O(n)' },
    testCases:[{ input:'addNum(1), addNum(2), findMedian, addNum(3), findMedian', expected:'1.5, 2.0' }],
    xpReward:80,
  },

  // ─── TRIE ────────────────────────────────────────────────────
  {
    title:'Implement Trie (Prefix Tree)', slug:'implement-trie', difficulty:'Medium',
    tags:['Trie','Design'], companies:['Amazon','Google','Microsoft','Facebook'],
    description:'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.\n\nImplement the `Trie` class with `insert`, `search`, and `startsWith` methods.',
    examples:[
      { input:'["Trie","insert","search","search","startsWith","insert","search"] [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', output:'[null,null,true,false,true,null,true]' },
    ],
    constraints:['1 ≤ word.length, prefix.length ≤ 2000'],
    starterCode:{ javascript:'class Trie {\n  constructor() {}\n  insert(word) {}\n  search(word) { return false; }\n  startsWith(prefix) { return false; }\n}', python:'class Trie:\n    def __init__(self):\n        pass\n    def insert(self, word):\n        pass\n    def search(self, word):\n        return False\n    def starts_with(self, prefix):\n        return False', java:'class Trie {\n    public Trie() {}\n    public void insert(String word) {}\n    public boolean search(String word) { return false; }\n    public boolean startsWith(String prefix) { return false; }\n}', cpp:'class Trie {\npublic:\n    Trie() {}\n    void insert(string word) {}\n    bool search(string word) { return false; }\n    bool startsWith(string prefix) { return false; }\n};' },
    solution:{ approach:'Each node has children[26] and isEnd flag. Insert: create nodes for each char. Search: traverse and check isEnd.', timeComplexity:'O(m) all ops', spaceComplexity:'O(m×n)' },
    testCases:[{ input:'insert("apple"), search("apple"), search("app"), startsWith("app")', expected:'true, false, true' }],
    xpReward:50,
  },

  {
    title:'Word Search II', slug:'word-search-ii', difficulty:'Hard',
    tags:['Trie','DFS','Backtracking'], companies:['Amazon','Google','Microsoft'],
    description:'Given an `m x n` board of characters and a list of strings `words`, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.',
    examples:[
      { input:'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output:'["eat","oath"]' },
    ],
    constraints:['1 ≤ m, n ≤ 12','1 ≤ words.length ≤ 3×10⁴'],
    starterCode:{ javascript:'function findWords(board, words) {\n  \n}', python:'def find_words(board, words):\n    pass', java:'class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n    return {};\n}' },
    solution:{ approach:'Build Trie from words. DFS on board, traverse Trie simultaneously. Mark visited, collect words found.', timeComplexity:'O(M×N×4×3^(L-1))', spaceComplexity:'O(W×L)' },
    testCases:[{ input:'[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]', expected:'["eat","oath"]' }],
    xpReward:80,
  },

  // ─── BACKTRACKING ────────────────────────────────────────────
  {
    title:'Subsets', slug:'subsets', difficulty:'Medium',
    tags:['Backtracking','Bit Manipulation'], companies:['Amazon','Google','Facebook'],
    description:'Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.',
    examples:[
      { input:'nums = [1,2,3]', output:'[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input:'nums = [0]',     output:'[[],[0]]' },
    ],
    constraints:['1 ≤ nums.length ≤ 10'],
    starterCode:{ javascript:'function subsets(nums) {\n  \n}', python:'def subsets(nums):\n    pass', java:'class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<int>> subsets(vector<int>& nums) {\n    return {};\n}' },
    solution:{ approach:'Backtracking. At each index, choose to include or exclude current element. Collect result at every recursion level.', timeComplexity:'O(n × 2ⁿ)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[1,2,3]', expected:'[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },{ input:'[0]', expected:'[[],[0]]' }],
    xpReward:50,
  },

  {
    title:'Permutations', slug:'permutations', difficulty:'Medium',
    tags:['Backtracking'], companies:['Amazon','Google','Microsoft'],
    description:'Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.',
    examples:[
      { input:'nums = [1,2,3]', output:'[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
      { input:'nums = [0,1]',   output:'[[0,1],[1,0]]' },
    ],
    constraints:['1 ≤ nums.length ≤ 6'],
    starterCode:{ javascript:'function permute(nums) {\n  \n}', python:'def permute(nums):\n    pass', java:'class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<int>> permute(vector<int>& nums) {\n    return {};\n}' },
    solution:{ approach:'Backtracking with swap. Swap current index with each subsequent index, recurse, swap back.', timeComplexity:'O(n × n!)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[1,2,3]', expected:'6 permutations' },{ input:'[0,1]', expected:'[[0,1],[1,0]]' }],
    xpReward:50,
  },

  {
    title:'Letter Combinations of a Phone Number', slug:'letter-combinations-phone-number', difficulty:'Medium',
    tags:['Backtracking','Strings'], companies:['Amazon','Google','Facebook'],
    description:'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.',
    examples:[
      { input:"digits = '23'", output:"['ad','ae','af','bd','be','bf','cd','ce','cf']" },
      { input:"digits = ''",   output:'[]' },
    ],
    constraints:['0 ≤ digits.length ≤ 4'],
    starterCode:{ javascript:'function letterCombinations(digits) {\n  \n}', python:'def letter_combinations(digits):\n    pass', java:'class Solution {\n    public List<String> letterCombinations(String digits) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<string> letterCombinations(string digits) {\n    return {};\n}' },
    solution:{ approach:'Backtracking with phone map. For each digit, try all mapped letters and recurse.', timeComplexity:'O(4ⁿ × n)', spaceComplexity:'O(n)' },
    testCases:[{ input:"'23'", expected:"['ad','ae','af','bd','be','bf','cd','ce','cf']" },{ input:"''", expected:'[]' }],
    xpReward:50,
  },

  {
    title:'N-Queens', slug:'n-queens', difficulty:'Hard',
    tags:['Backtracking'], companies:['Amazon','Google','Microsoft'],
    description:'The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return all distinct solutions to the n-queens puzzle.',
    examples:[
      { input:'n = 4', output:'[["..Q.","Q...","...Q",".Q.."],["...Q",".Q..","Q...","..Q."]]' },
      { input:'n = 1', output:'[["Q"]]' },
    ],
    constraints:['1 ≤ n ≤ 9'],
    starterCode:{ javascript:'function solveNQueens(n) {\n  \n}', python:'def solve_n_queens(n):\n    pass', java:'class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<vector<string>> solveNQueens(int n) {\n    return {};\n}' },
    solution:{ approach:'Backtracking row by row. Track used columns, diagonals, anti-diagonals using Sets.', timeComplexity:'O(n!)', spaceComplexity:'O(n²)' },
    testCases:[{ input:'4', expected:'2 solutions' },{ input:'1', expected:'[["Q"]]' }],
    xpReward:80,
  },

  // ─── MATH & BIT MANIPULATION ─────────────────────────────────
  {
    title:'Number of 1 Bits', slug:'number-of-1-bits', difficulty:'Easy',
    tags:['Bit Manipulation'], companies:['Microsoft','Apple','Google'],
    description:'Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).',
    examples:[
      { input:'n = 11', output:'3', explanation:'11 in binary is 1011, which has three set bits.' },
      { input:'n = 128', output:'1', explanation:'128 = 10000000' },
    ],
    constraints:['1 ≤ n ≤ 2³¹ − 1'],
    starterCode:{ javascript:'function hammingWeight(n) {\n  \n}', python:'def hamming_weight(n):\n    pass', java:'class Solution {\n    public int hammingWeight(int n) {\n        return 0;\n    }\n}', cpp:'int hammingWeight(uint32_t n) {\n    return 0;\n}' },
    solution:{ approach:'Brian Kernighan trick: n = n & (n-1) clears the lowest set bit. Count iterations.', timeComplexity:'O(k) where k = set bits', spaceComplexity:'O(1)' },
    testCases:[{ input:'11', expected:'3' },{ input:'128', expected:'1' }],
    xpReward:30,
  },

  {
    title:'Missing Number', slug:'missing-number', difficulty:'Easy',
    tags:['Arrays','Math','Bit Manipulation'], companies:['Microsoft','Amazon','Google'],
    description:'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    examples:[
      { input:'nums = [3,0,1]', output:'2' },
      { input:'nums = [0,1]',   output:'2' },
    ],
    constraints:['n == nums.length','1 ≤ n ≤ 10⁴'],
    starterCode:{ javascript:'function missingNumber(nums) {\n  \n}', python:'def missing_number(nums):\n    pass', java:'class Solution {\n    public int missingNumber(int[] nums) {\n        return 0;\n    }\n}', cpp:'int missingNumber(vector<int>& nums) {\n    return 0;\n}' },
    solution:{ approach:'Expected sum = n*(n+1)/2. Subtract actual sum. Or XOR all indices and values.', timeComplexity:'O(n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[3,0,1]', expected:'2' },{ input:'[0,1]', expected:'2' }],
    xpReward:30,
  },

  {
    title:'Reverse Bits', slug:'reverse-bits', difficulty:'Easy',
    tags:['Bit Manipulation'], companies:['Apple','Google','Microsoft'],
    description:'Reverse bits of a given 32 bits unsigned integer.',
    examples:[
      { input:'n = 43261596', output:'964176192', explanation:'43261596 = 00000010100101000001111010011100 reversed.' },
    ],
    constraints:['Input is a binary string of length 32'],
    starterCode:{ javascript:'function reverseBits(n) {\n  \n}', python:'def reverse_bits(n):\n    pass', java:'class Solution {\n    public int reverseBits(int n) {\n        return 0;\n    }\n}', cpp:'uint32_t reverseBits(uint32_t n) {\n    return 0;\n}' },
    solution:{ approach:'For each of 32 bits: result = (result << 1) | (n & 1), n >>= 1.', timeComplexity:'O(1)', spaceComplexity:'O(1)' },
    testCases:[{ input:'43261596', expected:'964176192' }],
    xpReward:30,
  },

  {
    title:'Count Bits', slug:'count-bits', difficulty:'Easy',
    tags:['Bit Manipulation','DP'], companies:['Amazon','Google','Microsoft'],
    description:'Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 ≤ i ≤ n), `ans[i]` is the number of 1\'s in the binary representation of `i`.',
    examples:[
      { input:'n = 2', output:'[0,1,1]' },
      { input:'n = 5', output:'[0,1,1,2,1,2]' },
    ],
    constraints:['0 ≤ n ≤ 10⁵'],
    starterCode:{ javascript:'function countBits(n) {\n  \n}', python:'def count_bits(n):\n    pass', java:'class Solution {\n    public int[] countBits(int n) {\n        return new int[]{};\n    }\n}', cpp:'vector<int> countBits(int n) {\n    return {};\n}' },
    solution:{ approach:'DP. dp[i] = dp[i >> 1] + (i & 1). Even number has same bits as i/2. Odd has one more.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'2', expected:'[0,1,1]' },{ input:'5', expected:'[0,1,1,2,1,2]' }],
    xpReward:30,
  },

  // ─── INTERVALS ───────────────────────────────────────────────
  {
    title:'Insert Interval', slug:'insert-interval', difficulty:'Medium',
    tags:['Arrays','Intervals'], companies:['Google','Facebook','LinkedIn'],
    description:'You are given an array of non-overlapping intervals `intervals` sorted in ascending order by start time, and a new interval `newInterval`. Insert `newInterval` into `intervals` such that it is still sorted and non-overlapping.',
    examples:[
      { input:'intervals = [[1,3],[6,9]], newInterval = [2,5]', output:'[[1,5],[6,9]]' },
      { input:'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output:'[[1,2],[3,10],[12,16]]' },
    ],
    constraints:['0 ≤ intervals.length ≤ 10⁴'],
    starterCode:{ javascript:'function insert(intervals, newInterval) {\n  \n}', python:'def insert(intervals, new_interval):\n    pass', java:'class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        return new int[][]{};\n    }\n}', cpp:'vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n    return {};\n}' },
    solution:{ approach:'Three phases: add intervals before new, merge overlapping, add intervals after.', timeComplexity:'O(n)', spaceComplexity:'O(n)' },
    testCases:[{ input:'[[1,3],[6,9]], [2,5]', expected:'[[1,5],[6,9]]' }],
    xpReward:50,
  },

  {
    title:'Non-overlapping Intervals', slug:'non-overlapping-intervals', difficulty:'Medium',
    tags:['Arrays','Intervals','Greedy'], companies:['Google','Amazon'],
    description:'Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    examples:[
      { input:'intervals = [[1,2],[2,3],[3,4],[1,3]]', output:'1', explanation:'Remove [1,3].' },
      { input:'intervals = [[1,2],[1,2],[1,2]]',        output:'2' },
    ],
    constraints:['1 ≤ intervals.length ≤ 10⁵'],
    starterCode:{ javascript:'function eraseOverlapIntervals(intervals) {\n  \n}', python:'def erase_overlap_intervals(intervals):\n    pass', java:'class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        return 0;\n    }\n}', cpp:'int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n    return 0;\n}' },
    solution:{ approach:'Sort by end time. Greedy: keep interval ending earliest. Count removals when overlap found.', timeComplexity:'O(n log n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[[1,2],[2,3],[3,4],[1,3]]', expected:'1' },{ input:'[[1,2],[1,2],[1,2]]', expected:'2' }],
    xpReward:50,
  },

  // ─── MATRIX ─────────────────────────────────────────────────
  {
    title:'Spiral Matrix', slug:'spiral-matrix', difficulty:'Medium',
    tags:['Arrays','Matrix'], companies:['Amazon','Google','Microsoft'],
    description:'Given an `m x n` matrix, return all elements of the matrix in spiral order.',
    examples:[
      { input:'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output:'[1,2,3,6,9,8,7,4,5]' },
    ],
    constraints:['m == matrix.length','n == matrix[i].length'],
    starterCode:{ javascript:'function spiralOrder(matrix) {\n  \n}', python:'def spiral_order(matrix):\n    pass', java:'class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        return new ArrayList<>();\n    }\n}', cpp:'vector<int> spiralOrder(vector<vector<int>>& matrix) {\n    return {};\n}' },
    solution:{ approach:'Track top, bottom, left, right boundaries. Go right, down, left, up. Shrink boundaries after each direction.', timeComplexity:'O(m×n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[[1,2,3],[4,5,6],[7,8,9]]', expected:'[1,2,3,6,9,8,7,4,5]' }],
    xpReward:50,
  },

  {
    title:'Rotate Image', slug:'rotate-image', difficulty:'Medium',
    tags:['Arrays','Matrix'], companies:['Amazon','Google','Microsoft'],
    description:'You are given an `n x n` 2D matrix representing an image. Rotate the image by 90 degrees (clockwise). You must rotate the image in-place.',
    examples:[
      { input:'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output:'[[7,4,1],[8,5,2],[9,6,3]]' },
    ],
    constraints:['n == matrix.length == matrix[i].length','1 ≤ n ≤ 20'],
    starterCode:{ javascript:'function rotate(matrix) {\n  \n}', python:'def rotate(matrix):\n    pass', java:'class Solution {\n    public void rotate(int[][] matrix) {}\n}', cpp:'void rotate(vector<vector<int>>& matrix) {}' },
    solution:{ approach:'Transpose (swap matrix[i][j] and matrix[j][i]), then reverse each row.', timeComplexity:'O(n²)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[[1,2,3],[4,5,6],[7,8,9]]', expected:'[[7,4,1],[8,5,2],[9,6,3]]' }],
    xpReward:50,
  },

  {
    title:'Set Matrix Zeroes', slug:'set-matrix-zeroes', difficulty:'Medium',
    tags:['Arrays','Matrix'], companies:['Amazon','Microsoft','Google'],
    description:'Given an `m x n` integer matrix, if an element is 0, set its entire row and column to 0\'s. You must do it in place.',
    examples:[
      { input:'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output:'[[1,0,1],[0,0,0],[1,0,1]]' },
    ],
    constraints:['m == matrix.length','n == matrix[i].length'],
    starterCode:{ javascript:'function setZeroes(matrix) {\n  \n}', python:'def set_zeroes(matrix):\n    pass', java:'class Solution {\n    public void setZeroes(int[][] matrix) {}\n}', cpp:'void setZeroes(vector<vector<int>>& matrix) {}' },
    solution:{ approach:'Use first row and column as markers. Store whether first row/col itself has zeros separately.', timeComplexity:'O(m×n)', spaceComplexity:'O(1)' },
    testCases:[{ input:'[[1,1,1],[1,0,1],[1,1,1]]', expected:'[[1,0,1],[0,0,0],[1,0,1]]' }],
    xpReward:50,
  },

]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')

    await Problem.deleteMany({})
    console.log('🗑  Cleared existing problems')

    const inserted = await Problem.insertMany(problems)
    console.log(`✅ Seeded ${inserted.length} problems successfully`)

    // Summary
    const easy   = problems.filter(p => p.difficulty === 'Easy').length
    const medium = problems.filter(p => p.difficulty === 'Medium').length
    const hard   = problems.filter(p => p.difficulty === 'Hard').length
    console.log(`   📗 Easy:   ${easy}`)
    console.log(`   📙 Medium: ${medium}`)
    console.log(`   📕 Hard:   ${hard}`)

    // Tags summary
    const tags = [...new Set(problems.flatMap(p => p.tags))].sort()
    console.log(`   🏷  Topics: ${tags.join(', ')}`)

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    process.exit(1)
  }
}

seed()