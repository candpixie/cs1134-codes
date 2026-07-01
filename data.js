// All CS-UY 1134 final codes — the "moves." Each: name, when-to-use, the move, the code,
// and where it showed up on a real exam (if known).
const CARDS = [
// ---------- A. Tree recursion (one value) ----------
{ id:1, cat:"Tree recursion", name:"count", when:"count the nodes in a tree", move:"base 0 + 1 + left + right", exam:"core pattern",
code:`def count(node):
    if node is None:
        return 0
    return 1 + count(node.left) + count(node.right)` },

{ id:2, cat:"Tree recursion", name:"total (sum)", when:"sum all the values", move:"ME = node.data", exam:"core pattern",
code:`def total(node):
    if node is None:
        return 0
    return node.data + total(node.left) + total(node.right)` },

{ id:3, cat:"Tree recursion", name:"height", when:"longest branch / depth", move:"combiner = max", exam:"classic",
code:`def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))` },

{ id:4, cat:"Tree recursion", name:"count_leaves", when:"count leaf nodes", move:"ME = 1 only if leaf",  exam:"core variant",
code:`def count_leaves(node):
    if node is None:
        return 0
    if node.left is None and node.right is None:
        return 1
    return count_leaves(node.left) + count_leaves(node.right)` },

{ id:5, cat:"Tree recursion", name:"count_at_depth", when:"count nodes exactly k levels down", move:"k==0 -> 1; pass k-1", exam:"classic variant",
code:`def count_at_depth(node, k):
    if node is None:
        return 0
    if k == 0:
        return 1
    return count_at_depth(node.left, k-1) + count_at_depth(node.right, k-1)` },

// ---------- B. Tree recursion (tuple) ----------
{ id:6, cat:"Tree recursion (tuple)", name:"is_size_tree", when:"each node.data == size of its subtree", move:"return (valid, count)", exam:"classic (tuple return)",
code:`def is_size_tree(bin_tree):
    valid, count = size_helper(bin_tree.root)
    return valid

def size_helper(node):
    if node is None:
        return (True, 0)
    lok, lc = size_helper(node.left)
    rok, rc = size_helper(node.right)
    my_count = 1 + lc + rc
    my_ok = lok and rok and node.data == my_count
    return (my_ok, my_count)` },

{ id:7, cat:"Tree recursion (tuple)", name:"is_balanced", when:"every node's subtree heights differ by <=1", move:"return (balanced, height)", exam:"classic",
code:`def is_balanced(node):
    if node is None:
        return (True, 0)
    lok, lh = is_balanced(node.left)
    rok, rh = is_balanced(node.right)
    my_ok = lok and rok and abs(lh - rh) <= 1
    return (my_ok, 1 + max(lh, rh))` },

{ id:8, cat:"Tree recursion (tuple)", name:"mono", when:"all nodes the same value", move:"ME = node.data == target; combiner = and", exam:"classic",
code:`def mono(self):
    if self.root is None:
        return True
    return mono_helper(self.root, self.root.data)

def mono_helper(node, target):
    if node is None:
        return True
    return (node.data == target
            and mono_helper(node.left, target)
            and mono_helper(node.right, target))` },

{ id:9, cat:"Tree recursion (tuple)", name:"is_BST", when:"validate a binary search tree", move:"bounds: each node in (lo, hi)", exam:"must-know",
code:`def is_BST(bin_tree):
    return helper(bin_tree.root, float('-inf'), float('inf'))

def helper(node, lo, hi):
    if node is None:
        return True
    if not (lo < node.data < hi):
        return False
    return (helper(node.left, lo, node.data)
            and helper(node.right, node.data, hi))` },

{ id:10, cat:"Tree recursion (tuple)", name:"is_full", when:"every node has 0 or 2 children", move:"exactly-one-child -> False", exam:"classic",
code:`def is_full(node):
    if node is None:
        return True
    if (node.left is None) != (node.right is None):
        return False
    return is_full(node.left) and is_full(node.right)` },

{ id:11, cat:"Tree recursion (tuple)", name:"is_perfect", when:"full AND all leaves same depth", move:"return (perfect, height); equal heights", exam:"classic",
code:`def is_perfect(node):
    ok, h = perfect_helper(node)
    return ok

def perfect_helper(node):
    if node is None:
        return (True, 0)
    lok, lh = perfect_helper(node.left)
    rok, rh = perfect_helper(node.right)
    my_ok = lok and rok and lh == rh
    return (my_ok, 1 + max(lh, rh))` },

// ---------- C. BST pruning ----------
{ id:12, cat:"BST pruning", name:"count_in_range", when:"count values with lo <= v <= hi", move:"too small->right, too big->left", exam:"classic",
code:`def count_in_range(node, lo, hi):
    if node is None:
        return 0
    if node.val < lo:
        return count_in_range(node.right, lo, hi)
    if node.val > hi:
        return count_in_range(node.left, lo, hi)
    return 1 + count_in_range(node.left, lo, hi) + count_in_range(node.right, lo, hi)` },

{ id:13, cat:"BST pruning", name:"sum_in_range", when:"sum values with lo <= v <= hi", move:"same, ME = node.val", exam:"classic",
code:`def sum_in_range(node, lo, hi):
    if node is None:
        return 0
    if node.val < lo:
        return sum_in_range(node.right, lo, hi)
    if node.val > hi:
        return sum_in_range(node.left, lo, hi)
    return node.val + sum_in_range(node.left, lo, hi) + sum_in_range(node.right, lo, hi)` },

// ---------- D. Linked list ----------
{ id:14, cat:"Linked list", name:"remove_duplicates", when:"drop repeats, avg linear", move:"seen-set + delete", exam:"classic",
code:`def remove_duplicates(lnk_lst):
    seen = HashTableMap()
    curr = lnk_lst.first_node()
    while curr is not None:
        nxt = curr.next
        try:
            seen[curr.data]
            lnk_lst.delete_node(curr)
        except KeyError:
            seen[curr.data] = True
        curr = nxt` },

{ id:15, cat:"Linked list", name:"count_distinct", when:"number of distinct values", move:"seen-set + counter", exam:"core",
code:`def count_distinct(lnk_lst):
    seen = HashTableMap()
    count = 0
    curr = lnk_lst.first_node()
    while curr is not None:
        nxt = curr.next
        try:
            seen[curr.data]
        except KeyError:
            seen[curr.data] = True
            count += 1
        curr = nxt
    return count` },

{ id:16, cat:"Linked list", name:"reverse", when:"reverse in place", move:"save -> flip -> advance both", exam:"core",
code:`def reverse(self):
    prev = None
    curr = self.head
    while curr is not None:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    self.head = prev` },

{ id:17, cat:"Linked list", name:"middle", when:"middle value, one pass", move:"fast/slow runner", exam:"classic",
code:`def middle(self):
    slow = self.head
    fast = self.head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
    return slow.val` },

{ id:18, cat:"Linked list", name:"merge_linked_lists", when:"merge two SORTED lists", move:"two pointers, take smaller front", exam:"classic",
code:`def merge_linked_lists(a, b):
    result = DoublyLinkedList()
    na = a.first_node()
    nb = b.first_node()
    while na is not None and nb is not None:
        if na.data <= nb.data:
            result.add_last(na.data)
            na = na.next
        else:
            result.add_last(nb.data)
            nb = nb.next
    while na is not None:
        result.add_last(na.data)
        na = na.next
    while nb is not None:
        result.add_last(nb.data)
        nb = nb.next
    return result` },

// ---------- E. Generators ----------
{ id:19, cat:"Generators", name:"running_min", when:"yield the running minimum", move:"running state + yield", exam:"generators",
code:`def running_min(lst):
    m = None
    for x in lst:
        if m is None:
            m = x
        else:
            m = min(m, x)
        yield m` },

{ id:20, cat:"Generators", name:"running_total", when:"yield the cumulative sum", move:"start at 0, accumulate, yield", exam:"generators",
code:`def running_total(lst):
    total = 0
    for x in lst:
        total += x
        yield total` },

// ---------- F. Trees / heap / traversals ----------
{ id:21, cat:"Traversals", name:"preorder / inorder / postorder", when:"visit every node in an order", move:"only the yield position moves", exam:"core",
code:`def preorder(node):     # root, L, R
    if node is None:
        return
    yield node
    yield from preorder(node.left)
    yield from preorder(node.right)

def inorder(node):      # L, root, R  (BST -> sorted)
    if node is None:
        return
    yield from inorder(node.left)
    yield node
    yield from inorder(node.right)

def postorder(node):    # L, R, root
    if node is None:
        return
    yield from postorder(node.left)
    yield from postorder(node.right)
    yield node` },

{ id:22, cat:"Traversals", name:"level_order (BFS)", when:"values level by level", move:"queue: dequeue, enqueue children", exam:"core",
code:`def level_order(self):
    out = []
    if self.root is None:
        return out
    q = ArrayQueue()
    q.enqueue(self.root)
    while len(q) > 0:
        node = q.dequeue()
        out.append(node.data)
        if node.left is not None:
            q.enqueue(node.left)
        if node.right is not None:
            q.enqueue(node.right)
    return out` },

{ id:23, cat:"Heap", name:"heap insert (percolate up)", when:"add to a min-heap", move:"append end, swap with parent i//2", exam:"core",
code:`def insert(self, item):
    self.data.append(item)
    j = len(self.data) - 1
    while j > 1 and self.data[j] < self.data[j // 2]:
        self.data[j], self.data[j // 2] = self.data[j // 2], self.data[j]
        j = j // 2` },

{ id:24, cat:"Heap", name:"heap delete_min (percolate down)", when:"remove the min", move:"last->root, swap smaller child", exam:"core",
code:`def delete_min(self):
    self.data[1], self.data[-1] = self.data[-1], self.data[1]
    item = self.data.pop()
    j = 1
    n = len(self.data) - 1
    while 2 * j <= n:
        s = 2 * j
        if 2 * j + 1 <= n and self.data[2 * j + 1] < self.data[2 * j]:
            s = 2 * j + 1
        if self.data[j] <= self.data[s]:
            break
        self.data[j], self.data[s] = self.data[s], self.data[j]
        j = s
    return item` },

{ id:25, cat:"Stacks", name:"eval_postfix", when:"evaluate a postfix expression", move:"stack of operands; op pops two", exam:"classic",
code:`def eval_postfix(tokens):
    stack = ArrayStack()
    for tok in tokens:
        if tok in ("+", "-", "*", "/"):
            right = stack.pop()
            left = stack.pop()
            if tok == "+":
                stack.push(left + right)
            elif tok == "-":
                stack.push(left - right)
            elif tok == "*":
                stack.push(left * right)
            else:
                stack.push(left / right)
        else:
            stack.push(int(tok))
    return stack.pop()` },

{ id:26, cat:"Trees", name:"build expression tree (postfix)", when:"build the tree from postfix", move:"stack of subtrees", exam:"classic",
code:`def build(tokens):
    stack = []
    for tok in tokens:
        if tok in ("+", "-", "*", "/", "**"):
            right = stack.pop()
            left = stack.pop()
            stack.append(Node(tok, left, right))
        else:
            stack.append(Node(tok))
    return stack.pop()` },

{ id:27, cat:"Trees", name:"reconstruct from traversals", when:"draw/build tree from inorder + postorder", move:"post last = root; split inorder", exam:"classic",
code:`def build(inorder, post):
    if not inorder:
        return None
    root_val = post[-1]
    k = inorder.index(root_val)
    left = build(inorder[:k], post[:k])
    right = build(inorder[k+1:], post[k:-1])
    return Node(root_val, left, right)` },

// ---------- G. Compose-a-class ----------
{ id:28, cat:"Compose-a-class", name:"UniqueQueue", when:"FIFO, ignore duplicates, O(1)", move:"queue (order) + map (set)", exam:"compose family",
code:`class UniqueQueue:
    def __init__(self):
        self.order = ArrayQueue()
        self.present = HashTableMap()

    def __len__(self):
        return len(self.present)

    def contains(self, x):
        try:
            self.present[x]
            return True
        except KeyError:
            return False

    def enqueue(self, x):
        if not self.contains(x):
            self.order.enqueue(x)
            self.present[x] = True

    def dequeue(self):
        x = self.order.dequeue()
        del self.present[x]
        return x` },

{ id:29, cat:"Compose-a-class", name:"ExtendedPartiesQueue", when:"FIFO parties by name, O(1)", move:"queue (names) + map (name->size)", exam:"compose family",
code:`class ExtendedPartiesQueue:
    def __init__(self):
        self.order = ArrayQueue()
        self.sizes = HashTableMap()

    def __len__(self):
        return len(self.order)

    def enq_party(self, name, size):
        self.order.enqueue(name)
        self.sizes[name] = size

    def add_to_party(self, name, amount):
        self.sizes[name] = self.sizes[name] + amount

    def first_party(self):
        name = self.order.first()
        return self.sizes[name]

    def deq_first_party(self):
        name = self.order.dequeue()
        size = self.sizes[name]
        del self.sizes[name]
        return size` },

{ id:30, cat:"Compose-a-class", name:"BrowserHistory", when:"keep 3 most-recent, O(1)", move:"DLL (recency) + map (site->node)", exam:"compose family",
code:`class BrowserHistory:
    def __init__(self):
        self.recency = DoublyLinkedList()
        self.lookup = HashTableMap()

    def __len__(self):
        return len(self.lookup)

    def visit(self, site):
        try:
            node = self.lookup[site]
            node.data[1] += 1
            self.recency.delete_node(node)
            new = self.recency.add_last([site, node.data[1]])
            self.lookup[site] = new
        except KeyError:
            if len(self.lookup) == 3:
                oldest = self.recency.first_node()
                del self.lookup[oldest.data[0]]
                self.recency.delete_first()
            new = self.recency.add_last([site, 1])
            self.lookup[site] = new

    def deleteHistory(self, site):
        node = self.lookup[site]
        self.recency.delete_node(node)
        del self.lookup[site]` },

{ id:31, cat:"Compose-a-class", name:"MaxStack", when:"push/pop/max all O(1)", move:"augment: parallel maxes stack", exam:"compose family",
code:`class MaxStack:
    def __init__(self):
        self.data = ArrayStack()
        self.maxes = ArrayStack()

    def __len__(self):
        return len(self.data)

    def push(self, x):
        self.data.push(x)
        if len(self.maxes) == 0 or x >= self.maxes.top():
            self.maxes.push(x)
        else:
            self.maxes.push(self.maxes.top())

    def pop(self):
        self.maxes.pop()
        return self.data.pop()

    def max(self):
        return self.maxes.top()` },

// ---------- H. Pointer rewiring ----------
{ id:32, cat:"Pointer rewiring", name:"right_circular_shift", when:"move last node to front (rewire prev/next)", move:"UNLINK end + LINK front", exam:"pointer rewiring",
code:`def right_circular_shift(self):
    if len(self) <= 1:
        return
    last_node = self.trailer.prev
    node_before = last_node.prev
    first_node = self.header.next
    node_before.next = self.trailer
    self.trailer.prev = node_before
    self.header.next = last_node
    last_node.prev = self.header
    last_node.next = first_node
    first_node.prev = last_node` },
];
