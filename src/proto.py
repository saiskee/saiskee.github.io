def longestConsecutive(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    max_map = {}
    min_map = {}
    for i in nums:
        if i-1 in min_map:
            localMax = min_map[i-1]
            if i > localMax:
                min_map[i-1] = i
        if i+1 in max_map:
            localMin = max_map[i+1]
            if i < localMin:
                max_map[i+1] = i
    print(max_map, min_map)

longestConsecutive([100, 4, 200, 1, 3, 2])