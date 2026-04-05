const dotenv   = require('dotenv')
const mongoose = require('mongoose')
const Problem  = require('../models/Problem')

dotenv.config({ path: '../../.env' })

const problems = [
  {
    title:       'Two Sum',
    slug:        'two-sum',
    difficulty:  'Easy',
    tags:        ['Arrays', 'HashMap'],
    companies:   ['Google', 'Amazon', 'Meta'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6',     output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
    ],
    constraints:  ['2 ≤ nums.length ≤ 10⁴', 'Only one valid answer exists'],
    starterCode:  { javascript: 'function twoSum(nums, target) {\n  // your code here\n}', python: 'def two_sum(nums, target):\n    pass', java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}', cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    return {};\n}' },
    solution:     { approach: 'Use a HashMap to store each number\'s index. For each number, check if its complement exists.', timeComplexity: 'O(n)', spaceComplexity: 'O(n)' },
    testCases:    [{ input: '[2,7,11,15], 9', expected: '[0,1]' }, { input: '[3,2,4], 6', expected: '[1,2]' }, { input: '[3,3], 6', expected: '[0,1]', isHidden: true }],
    xpReward:     30,
  },
  {
    title:       'Valid Parentheses',
    slug:        'valid-parentheses',
    difficulty:  'Easy',
    tags:        ['Stack', 'Strings'],
    companies:   ['Amazon', 'Microsoft', 'Google'],
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets in the correct order.',
    examples: [
      { input: "s = '()'",    output: 'true'  },
      { input: "s = '()[]{}'",output: 'true'  },
      { input: "s = '(]'",    output: 'false' },
    ],
    constraints:  ['1 ≤ s.length ≤ 10⁴', 's consists of parentheses characters only'],
    starterCode:  { javascript: 'function isValid(s) {\n  // your code here\n}', python: 'def is_valid(s):\n    pass', java: 'class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}', cpp: 'bool isValid(string s) {\n    return false;\n}' },
    solution:     { approach: 'Use a stack. Push opening brackets, pop and match for closing brackets.', timeComplexity: 'O(n)', spaceComplexity: 'O(n)' },
    testCases:    [{ input: "'()'", expected: 'true' }, { input: "'()[]{}'", expected: 'true' }, { input: "'(]'", expected: 'false', isHidden: true }],
    xpReward:     30,
  },
  {
    title:       'Climbing Stairs',
    slug:        'climbing-stairs',
    difficulty:  'Easy',
    tags:        ['DP'],
    companies:   ['Amazon', 'Google', 'Uber'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, or 2+1' },
    ],
    constraints:  ['1 ≤ n ≤ 45'],
    starterCode:  { javascript: 'function climbStairs(n) {\n  // your code here\n}', python: 'def climb_stairs(n):\n    pass', java: 'class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}', cpp: 'int climbStairs(int n) {\n    return 0;\n}' },
    solution:     { approach: 'Classic DP: f(n) = f(n-1) + f(n-2). Same as Fibonacci.', timeComplexity: 'O(n)', spaceComplexity: 'O(1)' },
    testCases:    [{ input: '2', expected: '2' }, { input: '3', expected: '3' }, { input: '5', expected: '8', isHidden: true }],
    xpReward:     30,
  },
  {
    title:       'Merge Intervals',
    slug:        'merge-intervals',
    difficulty:  'Medium',
    tags:        ['Arrays', 'Sorting'],
    companies:   ['Google', 'Facebook', 'Microsoft'],
    description: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap, merge to [1,6]' },
    ],
    constraints:  ['1 ≤ intervals.length ≤ 10⁴', 'intervals[i].length == 2'],
    starterCode:  { javascript: 'function merge(intervals) {\n  // your code here\n}', python: 'def merge(intervals):\n    pass', java: 'class Solution {\n    public int[][] merge(int[][] intervals) {\n        return new int[][]{};\n    }\n}', cpp: 'vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    return {};\n}' },
    solution:     { approach: 'Sort by start time. Merge if current start <= previous end.', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)' },
    testCases:    [{ input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' }],
    xpReward:     50,
  },
  {
    title:       'Coin Change',
    slug:        'coin-change',
    difficulty:  'Medium',
    tags:        ['DP'],
    companies:   ['Google', 'Amazon', 'Microsoft'],
    description: 'You are given an integer array `coins` representing coins of various denominations and an integer `amount`. Return the fewest number of coins needed to make up that amount. Return -1 if it cannot be achieved.',
    examples: [
      { input: 'coins = [1,5,11], amount = 11', output: '1',  explanation: '11 = 11' },
      { input: 'coins = [1,2,5], amount = 11',  output: '3',  explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3',        output: '-1', explanation: 'Not possible' },
    ],
    constraints:  ['1 ≤ coins.length ≤ 12', '0 ≤ amount ≤ 10⁴'],
    starterCode:  { javascript: 'function coinChange(coins, amount) {\n  // your code here\n}', python: 'def coin_change(coins, amount):\n    pass', java: 'class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}', cpp: 'int coinChange(vector<int>& coins, int amount) {\n    return -1;\n}' },
    solution:     { approach: 'Bottom-up DP. dp[i] = min coins to make amount i.', timeComplexity: 'O(amount × coins)', spaceComplexity: 'O(amount)' },
    testCases:    [{ input: '[1,5,11], 11', expected: '1' }, { input: '[1,2,5], 11', expected: '3' }, { input: '[2], 3', expected: '-1', isHidden: true }],
    xpReward:     50,
    isDaily:      true,
    dailyDate:    new Date(),
  },
  {
    title:       'Trapping Rain Water',
    slug:        'trapping-rain-water',
    difficulty:  'Hard',
    tags:        ['Two Pointers', 'Arrays'],
    companies:   ['Google', 'Amazon', 'Meta'],
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The above elevation map traps 6 units of rain water.' },
    ],
    constraints:  ['n == height.length', '1 ≤ n ≤ 2 × 10⁴'],
    starterCode:  { javascript: 'function trap(height) {\n  // your code here\n}', python: 'def trap(height):\n    pass', java: 'class Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}', cpp: 'int trap(vector<int>& height) {\n    return 0;\n}' },
    solution:     { approach: 'Two pointer approach. Track maxLeft and maxRight. Water at each index = min(maxL, maxR) - height[i].', timeComplexity: 'O(n)', spaceComplexity: 'O(1)' },
    testCases:    [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' }, { input: '[4,2,0,3,2,5]', expected: '9', isHidden: true }],
    xpReward:     80,
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    await Problem.deleteMany({})
    console.log('Cleared existing problems')

    await Problem.insertMany(problems)
    console.log(`✅ Seeded ${problems.length} problems`)

    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()