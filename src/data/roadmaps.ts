export interface Topic {
  id: string;
  title: string;
  category: string;
  description: string;
  order_index: number;
  icon: string;
  color: string;
  total_problems: number;
  completed_problems?: number;
}

export interface Problem {
  id: string;
  topic_id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  video_link: string | null;
  problem_link: string | null;
  tags: string[];
  description: string | null;
  order_index: number;
  completed?: boolean;
  bookmarked?: boolean;
}

export const roadmapCategories = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamentals of DSA with structured learning paths',
    icon: 'Binary',
    color: '#a088ff',
    topics: [
      'arrays-strings',
      'linked-lists',
      'stacks-queues',
      'trees',
      'heaps',
      'hash-tables'
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Learn essential algorithms for problem solving',
    icon: 'Cpu',
    color: '#63e3ff',
    topics: [
      'sorting',
      'searching',
      'two-pointers',
      'sliding-window',
      'greedy'
    ]
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Conquer the most challenging DP problems step by step',
    icon: 'GitBranch',
    color: '#ff8a63',
    topics: [
      'dp-introduction',
      'dp-1d',
      'dp-2d',
      'dp-on-strings',
      'dp-on-trees'
    ]
  },
  {
    id: 'graphs',
    title: 'Graph Theory',
    description: 'Explore graphs and their applications',
    icon: 'Network',
    color: '#88ff9f',
    topics: [
      'graph-basics',
      'bfs-dfs',
      'shortest-path',
      'mst',
      'topological-sort'
    ]
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: 'Prepare for coding interviews at top tech companies',
    icon: 'Briefcase',
    color: '#ff88c9',
    topics: [
      'arrays-interview',
      'trees-interview',
      'dp-interview',
      'system-design-basic'
    ]
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Learn to design scalable distributed systems',
    icon: 'Server',
    color: '#ffd700',
    topics: [
      'system-design-basics',
      'load-balancing',
      'caching',
      'database-design'
    ]
  }
];

export const topics: Topic[] = [
  // DSA Topics
  {
    id: 'arrays-strings',
    title: 'Arrays & Strings',
    category: 'dsa',
    description: 'Master array manipulation and string algorithms',
    order_index: 1,
    icon: 'Array',
    color: '#a088ff',
    total_problems: 25
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    category: 'dsa',
    description: 'Learn singly, doubly, and circular linked lists',
    order_index: 2,
    icon: 'Link',
    color: '#a088ff',
    total_problems: 18
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    category: 'dsa',
    description: 'Understand LIFO and FIFO data structures',
    order_index: 3,
    icon: 'Layers',
    color: '#a088ff',
    total_problems: 15
  },
  {
    id: 'trees',
    title: 'Trees & BST',
    category: 'dsa',
    description: 'Master binary trees, BST, and tree traversals',
    order_index: 4,
    icon: 'TreePine',
    color: '#a088ff',
    total_problems: 22
  },
  {
    id: 'heaps',
    title: 'Heaps & Priority Queues',
    category: 'dsa',
    description: 'Learn min/max heaps and their applications',
    order_index: 5,
    icon: 'Mountain',
    color: '#a088ff',
    total_problems: 12
  },
  {
    id: 'hash-tables',
    title: 'Hash Tables',
    category: 'dsa',
    description: 'Understand hashing and collision resolution',
    order_index: 6,
    icon: 'Hash',
    color: '#a088ff',
    total_problems: 14
  },
  // Dynamic Programming
  {
    id: 'dp-introduction',
    title: 'DP Introduction',
    category: 'dp',
    description: 'Learn the fundamentals of dynamic programming',
    order_index: 1,
    icon: 'BookOpen',
    color: '#ff8a63',
    total_problems: 10
  },
  {
    id: 'dp-1d',
    title: '1D DP Problems',
    category: 'dp',
    description: 'Solve linear dynamic programming problems',
    order_index: 2,
    icon: 'MoveRight',
    color: '#ff8a63',
    total_problems: 15
  },
  {
    id: 'dp-2d',
    title: '2D DP Problems',
    category: 'dp',
    description: 'Master grid and matrix DP problems',
    order_index: 3,
    icon: 'Grid3x3',
    color: '#ff8a63',
    total_problems: 18
  },
  // Graph Theory
  {
    id: 'graph-basics',
    title: 'Graph Basics',
    category: 'graphs',
    description: 'Learn graph representation and terminology',
    order_index: 1,
    icon: 'CircleDot',
    color: '#88ff9f',
    total_problems: 8
  },
  {
    id: 'bfs-dfs',
    title: 'BFS & DFS',
    category: 'graphs',
    description: 'Master graph traversal algorithms',
    order_index: 2,
    icon: 'Route',
    color: '#88ff9f',
    total_problems: 20
  },
  {
    id: 'shortest-path',
    title: 'Shortest Path',
    category: 'graphs',
    description: 'Dijkstra, Bellman-Ford, and Floyd-Warshall',
    order_index: 3,
    icon: 'Navigation',
    color: '#88ff9f',
    total_problems: 12
  }
];

export const problems: Problem[] = [
  // Arrays & Strings
  {
    id: 'p1',
    topic_id: 'arrays-strings',
    title: 'Two Sum',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
    problem_link: 'https://leetcode.com/problems/two-sum',
    tags: ['Array', 'Hash Table'],
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    order_index: 1
  },
  {
    id: 'p2',
    topic_id: 'arrays-strings',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=1pkOgXD63yU',
    problem_link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock',
    tags: ['Array', 'Dynamic Programming'],
    description: 'Find the maximum profit you can achieve from buying and selling a stock.',
    order_index: 2
  },
  {
    id: 'p3',
    topic_id: 'arrays-strings',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=3OamzN90kPg',
    problem_link: 'https://leetcode.com/problems/contains-duplicate',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: 'Given an integer array, return true if any value appears at least twice.',
    order_index: 3
  },
  {
    id: 'p4',
    topic_id: 'arrays-strings',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=bNvIQI2wAjk',
    problem_link: 'https://leetcode.com/problems/product-of-array-except-self',
    tags: ['Array', 'Prefix Sum'],
    description: 'Return an array where each element is the product of all other elements.',
    order_index: 4
  },
  {
    id: 'p5',
    topic_id: 'arrays-strings',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
    problem_link: 'https://leetcode.com/problems/maximum-subarray',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    description: 'Find the contiguous subarray with the largest sum.',
    order_index: 5
  },
  {
    id: 'p6',
    topic_id: 'arrays-strings',
    title: '3Sum',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=jzZsG8n2l9k',
    problem_link: 'https://leetcode.com/problems/3sum',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: 'Find all unique triplets that sum to zero.',
    order_index: 6
  },
  // Linked Lists
  {
    id: 'p7',
    topic_id: 'linked-lists',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
    problem_link: 'https://leetcode.com/problems/reverse-linked-list',
    tags: ['Linked List', 'Recursion'],
    description: 'Reverse a singly linked list.',
    order_index: 1
  },
  {
    id: 'p8',
    topic_id: 'linked-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=XIdigk956u0',
    problem_link: 'https://leetcode.com/problems/merge-two-sorted-lists',
    tags: ['Linked List', 'Recursion'],
    description: 'Merge two sorted linked lists into one sorted list.',
    order_index: 2
  },
  {
    id: 'p9',
    topic_id: 'linked-lists',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=gBTe7lFR3vc',
    problem_link: 'https://leetcode.com/problems/linked-list-cycle',
    tags: ['Linked List', 'Two Pointers', 'Hash Table'],
    description: 'Detect if a linked list has a cycle.',
    order_index: 3
  },
  {
    id: 'p10',
    topic_id: 'linked-lists',
    title: 'Remove Nth Node From End',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=XVuQxVej6y8',
    problem_link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list',
    tags: ['Linked List', 'Two Pointers'],
    description: 'Remove the nth node from the end of the list.',
    order_index: 4
  },
  // Trees
  {
    id: 'p11',
    topic_id: 'trees',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=hTM3phVI6YQ',
    problem_link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree',
    tags: ['Tree', 'DFS', 'BFS'],
    description: 'Find the maximum depth of a binary tree.',
    order_index: 1
  },
  {
    id: 'p12',
    topic_id: 'trees',
    title: 'Same Tree',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=vhUGsZbgjRs',
    problem_link: 'https://leetcode.com/problems/same-tree',
    tags: ['Tree', 'DFS', 'BFS'],
    description: 'Check if two binary trees are identical.',
    order_index: 2
  },
  {
    id: 'p13',
    topic_id: 'trees',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY',
    problem_link: 'https://leetcode.com/problems/invert-binary-tree',
    tags: ['Tree', 'DFS', 'BFS'],
    description: 'Invert a binary tree.',
    order_index: 3
  },
  {
    id: 'p14',
    topic_id: 'trees',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=6ZnyE7g4c5A',
    problem_link: 'https://leetcode.com/problems/binary-tree-level-order-traversal',
    tags: ['Tree', 'BFS'],
    description: 'Return the level order traversal of a binary tree.',
    order_index: 4
  },
  {
    id: 'p15',
    topic_id: 'trees',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=s6ATEkipzow',
    problem_link: 'https://leetcode.com/problems/validate-binary-search-tree',
    tags: ['Tree', 'DFS'],
    description: 'Determine if a binary tree is a valid BST.',
    order_index: 5
  },
  // DP
  {
    id: 'p16',
    topic_id: 'dp-introduction',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
    problem_link: 'https://leetcode.com/problems/climbing-stairs',
    tags: ['Dynamic Programming', 'Math'],
    description: 'Count ways to climb n stairs taking 1 or 2 steps.',
    order_index: 1
  },
  {
    id: 'p17',
    topic_id: 'dp-introduction',
    title: 'Fibonacci Number',
    difficulty: 'Easy',
    video_link: 'https://www.youtube.com/watch?v=EEb6JP3NXBI',
    problem_link: 'https://leetcode.com/problems/fibonacci-number',
    tags: ['Dynamic Programming', 'Recursion'],
    description: 'Calculate the nth Fibonacci number.',
    order_index: 2
  },
  {
    id: 'p18',
    topic_id: 'dp-1d',
    title: 'House Robber',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=73r3KWiEvyk',
    problem_link: 'https://leetcode.com/problems/house-robber',
    tags: ['Dynamic Programming'],
    description: 'Find maximum money that can be robbed without alerting police.',
    order_index: 1
  },
  {
    id: 'p19',
    topic_id: 'dp-1d',
    title: 'Coin Change',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=H9bfqozjoqs',
    problem_link: 'https://leetcode.com/problems/coin-change',
    tags: ['Dynamic Programming', 'BFS'],
    description: 'Find minimum coins needed to make up an amount.',
    order_index: 2
  },
  {
    id: 'p20',
    topic_id: 'dp-2d',
    title: 'Unique Paths',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=IlEsdxuD4lY',
    problem_link: 'https://leetcode.com/problems/unique-paths',
    tags: ['Dynamic Programming', 'Math', 'Combinatorics'],
    description: 'Count unique paths from top-left to bottom-right.',
    order_index: 1
  },
  // Graphs
  {
    id: 'p21',
    topic_id: 'bfs-dfs',
    title: 'Number of Islands',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
    problem_link: 'https://leetcode.com/problems/number-of-islands',
    tags: ['Array', 'DFS', 'BFS', 'Union Find'],
    description: 'Count the number of islands in a 2D grid.',
    order_index: 1
  },
  {
    id: 'p22',
    topic_id: 'bfs-dfs',
    title: 'Clone Graph',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=mQeF6bN8hMk',
    problem_link: 'https://leetcode.com/problems/clone-graph',
    tags: ['Graph', 'DFS', 'BFS', 'Hash Table'],
    description: 'Return a deep copy of a connected undirected graph.',
    order_index: 2
  },
  {
    id: 'p23',
    topic_id: 'bfs-dfs',
    title: 'Course Schedule',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=EgI5nU9etnU',
    problem_link: 'https://leetcode.com/problems/course-schedule',
    tags: ['Graph', 'DFS', 'BFS', 'Topological Sort'],
    description: 'Determine if all courses can be finished.',
    order_index: 3
  },
  {
    id: 'p24',
    topic_id: 'shortest-path',
    title: 'Network Delay Time',
    difficulty: 'Medium',
    video_link: 'https://www.youtube.com/watch?v=EPnl61Sypih',
    problem_link: 'https://leetcode.com/problems/network-delay-time',
    tags: ['Graph', 'DFS', 'BFS', 'Heap'],
    description: 'Find the time for all nodes to receive a signal.',
    order_index: 1
  }
];

export const badges = [
  {
    id: 'b1',
    name: 'First Steps',
    description: 'Complete your first problem',
    icon: 'Footprints',
    requirement: 'complete_1_problem',
    xp_reward: 50
  },
  {
    id: 'b2',
    name: 'Rising Star',
    description: 'Complete 10 problems',
    icon: 'Star',
    requirement: 'complete_10_problems',
    xp_reward: 150
  },
  {
    id: 'b3',
    name: 'Problem Solver',
    description: 'Complete 50 problems',
    icon: 'Trophy',
    requirement: 'complete_50_problems',
    xp_reward: 500
  },
  {
    id: 'b4',
    name: 'Streak Keeper',
    description: 'Maintain a 7-day learning streak',
    icon: 'Flame',
    requirement: 'streak_7_days',
    xp_reward: 200
  },
  {
    id: 'b5',
    name: 'DP Master',
    description: 'Complete all Dynamic Programming problems',
    icon: 'Brain',
    requirement: 'complete_dp_category',
    xp_reward: 1000
  },
  {
    id: 'b6',
    name: 'Graph Explorer',
    description: 'Complete all Graph Theory problems',
    icon: 'Network',
    requirement: 'complete_graph_category',
    xp_reward: 1000
  }
];

export const getProblemsByTopic = (topicId: string): Problem[] => {
  return problems.filter(p => p.topic_id === topicId).sort((a, b) => a.order_index - b.order_index);
};

export const getTopicById = (topicId: string): Topic | undefined => {
  return topics.find(t => t.id === topicId);
};

export const getTopicsByCategory = (categoryId: string): Topic[] => {
  return topics.filter(t => t.category === categoryId).sort((a, b) => a.order_index - b.order_index);
};
