
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
            'strings-interview',
            'trees-interview',
            'graphs-interview',
            'dp-interview',
            'sorting-searching-interview',
            'stacks-queues-interview',
            'misc-interview'
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
            'database-design',
            'real-world-designs'
        ]
    }
];

export const topics = [
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
    },
    // Algorithms
    {
        id: 'sorting',
        title: 'Sorting Algorithms',
        category: 'algorithms',
        description: 'Master bubble, selection, insertion, merge, and quick sort',
        order_index: 1,
        icon: 'ArrowUpDown',
        color: '#63e3ff',
        total_problems: 15
    },
    {
        id: 'searching',
        title: 'Searching Algorithms',
        category: 'algorithms',
        description: 'Linear search, binary search, and their variations',
        order_index: 2,
        icon: 'Search',
        color: '#63e3ff',
        total_problems: 12
    },
    {
        id: 'two-pointers',
        title: 'Two Pointers',
        category: 'algorithms',
        description: 'Solve array and string problems efficiently',
        order_index: 3,
        icon: 'MousePointer2',
        color: '#63e3ff',
        total_problems: 20
    },
    {
        id: 'sliding-window',
        title: 'Sliding Window',
        category: 'algorithms',
        description: 'Optimize subarray and substring problems',
        order_index: 4,
        icon: 'Maximize',
        color: '#63e3ff',
        total_problems: 18
    },
    {
        id: 'greedy',
        title: 'Greedy Algorithms',
        category: 'algorithms',
        description: 'Make locally optimal choices for global optimum',
        order_index: 5,
        icon: 'Zap',
        color: '#63e3ff',
        total_problems: 25
    },
    // Interview Preparation
    {
        id: 'arrays-interview',
        title: 'Top Array Questions',
        category: 'interview',
        description: 'Most asked array interview questions',
        order_index: 1,
        icon: 'List',
        color: '#ff88c9',
        total_problems: 30
    },
    {
        id: 'trees-interview',
        title: 'Top Tree Questions',
        category: 'interview',
        description: 'Essential tree problems for interviews',
        order_index: 2,
        icon: 'TreePine',
        color: '#ff88c9',
        total_problems: 25
    },
    {
        id: 'dp-interview',
        title: 'DP Must-Dos',
        category: 'interview',
        description: 'Common dynamic programming patterns',
        order_index: 3,
        icon: 'BrainCircuit',
        color: '#ff88c9',
        total_problems: 20
    },
    {
        id: 'system-design-basic',
        title: 'System Design 101',
        category: 'interview',
        description: 'Basics of system design for freshers',
        order_index: 4,
        icon: 'Server',
        color: '#ff88c9',
        total_problems: 10
    },
    {
        id: 'strings-interview',
        title: 'Top String Questions',
        category: 'interview',
        description: 'Most asked string interview questions',
        order_index: 5,
        icon: 'Type',
        color: '#ff88c9',
        total_problems: 10
    },
    {
        id: 'graphs-interview',
        title: 'Top Graph Questions',
        category: 'interview',
        description: 'Essential graph problems for interviews',
        order_index: 6,
        icon: 'Network',
        color: '#ff88c9',
        total_problems: 10
    },
    {
        id: 'sorting-searching-interview',
        title: 'Sorting & Searching Must-Dos',
        category: 'interview',
        description: 'Key sorting and searching interview problems',
        order_index: 7,
        icon: 'ArrowUpDown',
        color: '#ff88c9',
        total_problems: 10
    },
    {
        id: 'stacks-queues-interview',
        title: 'Stack & Queue Must-Dos',
        category: 'interview',
        description: 'Essential stack and queue interview problems',
        order_index: 8,
        icon: 'Layers',
        color: '#ff88c9',
        total_problems: 10
    },
    {
        id: 'misc-interview',
        title: 'Mixed Topic Must-Dos',
        category: 'interview',
        description: 'Cross-topic must-know interview problems',
        order_index: 9,
        icon: 'Shuffle',
        color: '#ff88c9',
        total_problems: 10
    },
    // System Design
    {
        id: 'system-design-basics',
        title: 'Design Fundamentals',
        category: 'system-design',
        description: 'CAP theorem, ACID properties, and more',
        order_index: 1,
        icon: 'Book',
        color: '#ffd700',
        total_problems: 15
    },
    {
        id: 'load-balancing',
        title: 'Load Balancing',
        category: 'system-design',
        description: 'Scaling applications with load balancers',
        order_index: 2,
        icon: 'Scale',
        color: '#ffd700',
        total_problems: 8
    },
    {
        id: 'caching',
        title: 'Caching Strategies',
        category: 'system-design',
        description: 'Redis, Memcached, and caching patterns',
        order_index: 3,
        icon: 'Zap',
        color: '#ffd700',
        total_problems: 10
    },
    {
        id: 'database-design',
        title: 'Database Design',
        category: 'system-design',
        description: 'SQL vs NoSQL, sharding, and replication',
        order_index: 4,
        icon: 'Database',
        color: '#ffd700',
        total_problems: 8
    },
    {
        id: 'real-world-designs',
        title: 'Real-World System Designs',
        category: 'system-design',
        description: 'Design Twitter, YouTube, Uber, and more',
        order_index: 5,
        icon: 'Globe',
        color: '#ffd700',
        total_problems: 8
    }
];

export const problems = [
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
    },
    // Algorithms - Sorting
    {
        id: 'algo-sort-1',
        topic_id: 'sorting',
        title: 'Merge Sort Implementation',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['Sorting', 'Divide and Conquer'],
        description: 'Implement Merge Sort from scratch.',
        order_index: 1
    },
    {
        id: 'algo-sort-2',
        topic_id: 'sorting',
        title: 'Quick Sort Implementation',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['Sorting', 'Divide and Conquer'],
        description: 'Implement Quick Sort from scratch.',
        order_index: 2
    },
    {
        id: 'algo-sort-3',
        topic_id: 'sorting',
        title: 'Heap Sort Implementation',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['Sorting', 'Heap'],
        description: 'Implement Heap Sort from scratch.',
        order_index: 3
    },
    {
        id: 'algo-greedy-1',
        topic_id: 'greedy',
        title: 'Activity Selection Problem',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['Greedy'],
        description: 'Select maximum number of activities to perform.',
        order_index: 1
    },
    {
        id: 'algo-greedy-2',
        topic_id: 'greedy',
        title: 'Huffman Coding',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['Greedy'],
        description: 'Implement Huffman Coding compression algorithm.',
        order_index: 2
    },
    {
        id: 'algo-sliding-1',
        topic_id: 'sliding-window',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        problem_link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        tags: ['Sliding Window', 'String'],
        description: 'Find length of longest substring with unique characters.',
        order_index: 1
    },
    {
        id: 'algo-2ptr-1',
        topic_id: 'two-pointers',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/container-with-most-water/',
        problem_link: 'https://leetcode.com/problems/container-with-most-water/',
        tags: ['Two Pointers', 'Array'],
        description: 'Find two lines that together with x-axis form a container holding most water.',
        order_index: 1
    },
    // Algorithms - Searching
    {
        id: 'algo-search-1',
        topic_id: 'searching',
        title: 'Binary Search',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/binary-search/',
        problem_link: 'https://leetcode.com/problems/binary-search/',
        tags: ['Binary Search', 'Array'],
        description: 'Implement binary search on a sorted array.',
        order_index: 1
    },
    {
        id: 'algo-search-2',
        topic_id: 'searching',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        problem_link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        tags: ['Binary Search', 'Array'],
        description: 'Search for a target value in a rotated sorted array.',
        order_index: 2
    },
    // Interview Prep
    {
        id: 'int-arr-1',
        topic_id: 'arrays-interview',
        title: 'Rotate Image',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/rotate-image/',
        problem_link: 'https://leetcode.com/problems/rotate-image/',
        tags: ['Array', 'Matrix'],
        description: 'Rotate a 2D matrix by 90 degrees.',
        order_index: 1
    },
    {
        id: 'int-arr-2',
        topic_id: 'arrays-interview',
        title: 'Spiral Matrix',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/spiral-matrix/',
        problem_link: 'https://leetcode.com/problems/spiral-matrix/',
        tags: ['Array', 'Matrix'],
        description: 'Return all elements of the matrix in spiral order.',
        order_index: 2
    },
    {
        id: 'int-tree-1',
        topic_id: 'trees-interview',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        problem_link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
        tags: ['Tree', 'DFS'],
        description: 'Find LCA of two nodes in a binary tree.',
        order_index: 1
    },
    {
        id: 'int-dp-1',
        topic_id: 'dp-interview',
        title: 'Longest Palindromic Substring',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/longest-palindromic-substring/',
        problem_link: 'https://leetcode.com/problems/longest-palindromic-substring/',
        tags: ['String', 'DP'],
        description: 'Find the longest palindromic substring in s.',
        order_index: 1
    },
    // System Design
    {
        id: 'sys-basics-1',
        topic_id: 'system-design-basics',
        title: 'CAP Theorem',
        difficulty: 'Easy',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Theory'],
        description: 'Explain the CAP theorem with examples.',
        order_index: 1
    },
    // ... (Adding the rest of the mock data here)
    {
        id: 'sys-load-1',
        topic_id: 'load-balancing',
        title: 'Load Balancer Algorithms',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Load Balancing'],
        description: 'Round Robin, Least Connections, IP Hash.',
        order_index: 1
    },
    {
        id: 'sys-cache-1',
        topic_id: 'caching',
        title: 'Cache Eviction Policies',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Caching'],
        description: 'LRU, LFU, FIFO eviction policies.',
        order_index: 1
    },
    {
        id: 'sys-db-1',
        topic_id: 'database-design',
        title: 'SQL vs NoSQL',
        difficulty: 'Easy',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Database'],
        description: 'When to choose SQL vs NoSQL databases.',
        order_index: 1
    },
    // DSA - Additional
    {
        id: 'dsa-stack-1',
        topic_id: 'stacks-queues',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/valid-parentheses/',
        problem_link: 'https://leetcode.com/problems/valid-parentheses/',
        tags: ['Stack', 'String'],
        description: 'Determine if the input string has valid parentheses.',
        order_index: 1
    },
    {
        id: 'dsa-heap-1',
        topic_id: 'heaps',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        problem_link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        tags: ['Heap', 'Sorting'],
        description: 'Find the kth largest element in an unsorted array.',
        order_index: 1
    },
    // DP - Additional
    {
        id: 'dp-lis',
        topic_id: 'dp-1d',
        title: 'Longest Increasing Subsequence',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
        problem_link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
        tags: ['DP'],
        description: 'Find length of LIS.',
        order_index: 3
    },
    {
        id: 'dp-lcs',
        topic_id: 'dp-2d',
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/longest-common-subsequence/',
        problem_link: 'https://leetcode.com/problems/longest-common-subsequence/',
        tags: ['DP'],
        description: 'Find length of LCS of two strings.',
        order_index: 2
    },
    // Graphs - Additional
    {
        id: 'graph-mst-1',
        topic_id: 'shortest-path',
        title: 'Min Cost to Connect All Points',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
        problem_link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
        tags: ['Graph', 'MST'],
        description: 'Minimum spanning tree using Prims or Kruskals.',
        order_index: 2
    },
    {
        id: 'graph-topo-1',
        topic_id: 'bfs-dfs',
        title: 'Course Schedule II',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/course-schedule-ii/',
        problem_link: 'https://leetcode.com/problems/course-schedule-ii/',
        tags: ['Graph', 'Topological Sort'],
        description: 'Find order to finish all courses.',
        order_index: 4
    },
    // --- ADDITIONAL BATCH FOR BULKING UP ---
    // Algorithms - More Sorting/Searching
    {
        id: 'algo-sort-4',
        topic_id: 'sorting',
        title: 'Sort Colors',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/sort-colors/',
        problem_link: 'https://leetcode.com/problems/sort-colors/',
        tags: ['Sorting', 'Array', 'Two Pointers'],
        description: 'Sort an array of 0s, 1s, and 2s in-place.',
        order_index: 4
    },
    {
        id: 'algo-search-3',
        topic_id: 'searching',
        title: 'Find First and Last Position',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
        problem_link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
        tags: ['Binary Search', 'Array'],
        description: 'Find start and end position of target in sorted array.',
        order_index: 3
    },
    // Algorithms - More Greedy
    {
        id: 'algo-greedy-3',
        topic_id: 'greedy',
        title: 'Jump Game',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/jump-game/',
        problem_link: 'https://leetcode.com/problems/jump-game/',
        tags: ['Greedy', 'Array', 'DP'],
        description: 'Determine if you can reach the last index.',
        order_index: 3
    },
    {
        id: 'algo-greedy-4',
        topic_id: 'greedy',
        title: 'Gas Station',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/gas-station/',
        problem_link: 'https://leetcode.com/problems/gas-station/',
        tags: ['Greedy', 'Array'],
        description: 'Return starting gas station index to travel around circuit.',
        order_index: 4
    },
    // Interview Prep - More Core patterns
    {
        id: 'int-arr-3',
        topic_id: 'arrays-interview',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/merge-intervals/',
        problem_link: 'https://leetcode.com/problems/merge-intervals/',
        tags: ['Array', 'Sorting'],
        description: 'Merge all overlapping intervals.',
        order_index: 3
    },
    {
        id: 'int-arr-4',
        topic_id: 'arrays-interview',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        video_link: 'https://leetcode.com/problems/trapping-rain-water/',
        problem_link: 'https://leetcode.com/problems/trapping-rain-water/',
        tags: ['Array', 'Two Pointers'],
        description: 'Compute how much water can be trapped after raining.',
        order_index: 4
    },
    {
        id: 'int-tree-2',
        topic_id: 'trees-interview',
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'Hard',
        video_link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        problem_link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
        tags: ['Tree', 'Design'],
        description: 'Design an algorithm to serialize and deserialize a binary tree.',
        order_index: 2
    },
    {
        id: 'int-tree-3',
        topic_id: 'trees-interview',
        title: 'Diameter of Binary Tree',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
        problem_link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
        tags: ['Tree', 'DFS'],
        description: 'Length of longest path between any two nodes in a tree.',
        order_index: 3
    },
    {
        id: 'int-dp-2',
        topic_id: 'dp-interview',
        title: 'Word Break',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/word-break/',
        problem_link: 'https://leetcode.com/problems/word-break/',
        tags: ['DP', 'Trie'],
        description: 'Determine if string can be segmented into dictionary words.',
        order_index: 2
    },
    {
        id: 'int-dp-3',
        topic_id: 'dp-interview',
        title: 'Edit Distance',
        difficulty: 'Hard',
        video_link: 'https://leetcode.com/problems/edit-distance/',
        problem_link: 'https://leetcode.com/problems/edit-distance/',
        tags: ['DP', 'String'],
        description: 'Find minimum operations to convert word1 to word2.',
        order_index: 3
    },
    // System Design - More Scenarios
    {
        id: 'sys-des-1',
        topic_id: 'system-design-basics',
        title: 'Consistent Hashing',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Scaling'],
        description: 'Distribute data across nodes to minimize reorganization.',
        order_index: 2
    },
    {
        id: 'sys-des-2',
        topic_id: 'system-design-basics',
        title: 'Rate Limiter Design',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'API'],
        description: 'Design an API rate limiter (Token Bucket, Leaky Bucket).',
        order_index: 3
    },
    {
        id: 'sys-des-3',
        topic_id: 'system-design-basics',
        title: 'Design URL Shortener',
        difficulty: 'Easy',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'System'],
        description: 'Design a system like TinyURL.',
        order_index: 4
    },
    {
        id: 'sys-des-4',
        topic_id: 'database-design',
        title: 'Database Sharding',
        difficulty: 'Hard',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Database'],
        description: 'Horizontal partitioning strategies and challenges.',
        order_index: 2
    },
    {
        id: 'sys-des-5',
        topic_id: 'caching',
        title: 'Redis vs Memcached',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Caching'],
        description: 'Compare two popular caching solutions.',
        order_index: 2
    },
    {
        id: 'sys-des-6',
        topic_id: 'load-balancing',
        title: 'L4 vs L7 Load Balancing',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Networking'],
        description: 'Transport layer vs Application layer load balancing.',
        order_index: 2
    },
    // --- FINAL BATCH TO FILL GAPS ---
    // DP - Introduction
    {
        id: 'dp-intro-3',
        topic_id: 'dp-introduction',
        title: 'Min Cost Climbing Stairs',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
        problem_link: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
        tags: ['DP'],
        description: 'Minimum cost to reach the top of the floor.',
        order_index: 3
    },
    {
        id: 'dp-intro-4',
        topic_id: 'dp-introduction',
        title: 'N-th Tribonacci Number',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/n-th-tribonacci-number/',
        problem_link: 'https://leetcode.com/problems/n-th-tribonacci-number/',
        tags: ['DP'],
        description: 'Calculate the N-th Tribonacci number.',
        order_index: 4
    },
    // DP - 1D
    {
        id: 'dp-1d-4',
        topic_id: 'dp-1d',
        title: 'Decode Ways',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/decode-ways/',
        problem_link: 'https://leetcode.com/problems/decode-ways/',
        tags: ['DP', 'String'],
        description: 'Count ways to decode a string of digits.',
        order_index: 4
    },
    {
        id: 'dp-1d-5',
        topic_id: 'dp-1d',
        title: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/partition-equal-subset-sum/',
        problem_link: 'https://leetcode.com/problems/partition-equal-subset-sum/',
        tags: ['DP'],
        description: 'Determine if array can be partitioned into two subsets with equal sum.',
        order_index: 5
    },
    // DP - 2D
    {
        id: 'dp-2d-3',
        topic_id: 'dp-2d',
        title: 'Minimum Path Sum',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/minimum-path-sum/',
        problem_link: 'https://leetcode.com/problems/minimum-path-sum/',
        tags: ['DP', 'Matrix'],
        description: 'Find a path from top left to bottom right which minimizes the sum.',
        order_index: 3
    },
    {
        id: 'dp-2d-4',
        topic_id: 'dp-2d',
        title: 'Target Sum',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/target-sum/',
        problem_link: 'https://leetcode.com/problems/target-sum/',
        tags: ['DP', 'Backtracking'],
        description: 'Number of ways to assign symbols to make sum equal to target.',
        order_index: 4
    },
    // Graph Basics
    {
        id: 'graph-basic-1',
        topic_id: 'graph-basics',
        title: 'Find the Town Judge',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/find-the-town-judge/',
        problem_link: 'https://leetcode.com/problems/find-the-town-judge/',
        tags: ['Graph'],
        description: 'Find the person trusted by everyone.',
        order_index: 1
    },
    {
        id: 'graph-basic-2',
        topic_id: 'graph-basics',
        title: 'Find Center of Star Graph',
        difficulty: 'Easy',
        video_link: 'https://leetcode.com/problems/find-center-of-star-graph/',
        problem_link: 'https://leetcode.com/problems/find-center-of-star-graph/',
        tags: ['Graph'],
        description: 'Return the center node of a star graph.',
        order_index: 2
    },
    // Shortest Path
    {
        id: 'graph-sp-3',
        topic_id: 'shortest-path',
        title: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        problem_link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        tags: ['Graph', 'Bellman-Ford', 'Dijkstra'],
        description: 'Find cheapest flight price with at most K stops.',
        order_index: 3
    },
    {
        id: 'graph-sp-4',
        topic_id: 'shortest-path',
        title: 'Path with Maximum Probability',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/path-with-maximum-probability/',
        problem_link: 'https://leetcode.com/problems/path-with-maximum-probability/',
        tags: ['Graph', 'Dijkstra'],
        description: 'Find path with maximum probability of success.',
        order_index: 4
    },
    // BFS/DFS
    {
        id: 'graph-bfs-5',
        topic_id: 'bfs-dfs',
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        video_link: 'https://leetcode.com/problems/rotting-oranges/',
        problem_link: 'https://leetcode.com/problems/rotting-oranges/',
        tags: ['BFS', 'Matrix'],
        description: 'Minimum minutes until no fresh orange remains.',
        order_index: 5
    },
    {
        id: 'graph-bfs-6',
        topic_id: 'bfs-dfs',
        title: 'Word Ladder',
        difficulty: 'Hard',
        video_link: 'https://leetcode.com/problems/word-ladder/',
        problem_link: 'https://leetcode.com/problems/word-ladder/',
        tags: ['BFS', 'Hash Table'],
        description: 'Shortest transformation sequence from beginWord to endWord.',
        order_index: 6
    },
    // System Design - More
    {
        id: 'sys-more-1',
        topic_id: 'system-design-basics',
        title: 'CDN (Content Delivery Network)',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Caching'],
        description: 'How CDNs work and when to use them.',
        order_index: 4
    },
    {
        id: 'sys-more-2',
        topic_id: 'system-design-basics',
        title: 'Message Queues',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['System Design', 'Async'],
        description: 'Kafka, RabbitMQ, and async processing.',
        order_index: 5
    },
    {
        id: 'sys-more-3',
        topic_id: 'database-design',
        title: 'Database Indexing',
        difficulty: 'Medium',
        video_link: null,
        problem_link: null,
        tags: ['Database', 'Optimization'],
        description: 'B-Trees, LSM Trees, and index types.',
        order_index: 3
    }
];
