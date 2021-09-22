let rawWinningNums = [
  [24, 50, 18, 34, 49, 57],
  [15, 30, 39, 52, 59, 7],
  [27, 35, 18, 28, 17, 57],
  [10, 4, 48, 50, 27, 30],
  [19, 1, 39, 15, 2, 43],
  [46, 36, 39, 32, 37, 13],
  [10, 15, 41, 51, 22, 57],
  [16, 27, 3, 46, 34, 36],
  [43, 11, 13, 19, 12, 58],
  [34, 44, 23, 26, 59, 36],
  [7, 6, 37, 34, 28, 17],
  [20, 5, 37, 17, 51, 45],
  [35, 48, 56, 33, 3, 25],
  [12, 35, 41, 36, 29, 27],
  [33, 47, 9, 54, 22, 19],
  [40, 3, 52, 2, 7, 20],
  [1, 31, 47, 29, 12, 27],
  [41, 34, 38, 12, 40, 27],
  [24, 37, 53, 41, 39, 14],
  [14, 53, 50, 15, 33, 4],
  [38, 12, 18, 21, 54, 44],
  [48, 22, 36, 28, 6, 53],
  [11, 36, 27, 16, 52, 9],
  [24, 15, 43, 49, 9, 34],
  [3, 6, 57, 39, 46, 33],
  [15, 17, 53, 59, 33, 1],
  [10, 55, 46, 36, 1, 16],
  [33, 51, 49, 36, 28, 45],
  [9, 20, 41, 46, 43, 48],
  [57, 50, 58, 36, 53, 18],
  [57, 32, 27, 19, 39, 6,],
  [17, 40, 51, 23, 52, 10],
  [46, 31, 12, 23, 10, 37],
  [56, 27, 40, 55, 8, 34],
  [7, 40, 31, 34, 32, 10],
  [59, 4, 48, 1, 57, 27],
  [29, 16, 38, 32, 30, 24],
  [39, 4, 34, 32, 6, 14],
  [18, 7, 23, 57, 8, 21],
  [48, 57, 12, 20, 6, 52],
  [50, 20, 26, 48, 49, 25],
  [51, 40, 57, 12, 38, 58],
  [40, 32, 45, 8, 2, 28],
  [6, 58, 4, 49, 56, 13],
  [18, 22, 26, 49, 5, 3],
  [23, 50, 40, 2, 3, 27],
  [12, 36, 24, 34, 51, 15],
  [28, 26, 36, 58, 16, 7],
  [8, 29, 6, 17, 11, 44],
  [26, 42, 21, 5, 1, 9],
  [47, 29, 16, 17, 52, 56],
  [2, 54, 40, 23, 3, 8]
]

/**
1.most common nums across whole set
2. most common numbers for each pos. And where x is in position y count each occurance (and pos) of the other numbers in that set (sibling numbers) e.g where key = 6: 32, 46
3. For each position pick a number where it exists in both the 'most common num for that pos' and most common nums for across all sets'
4. For each of these check if any of it's sibling number are in the most common for that pos and most common overall. If so keep that sibling number there too
5. Once all possible sets are created. Sort them according to the most common range across the whole original set.
**/

function transformWholeSetIntoSingleNumbers(wholeSet) {
  let newSet = []
  wholeSet.forEach((set) => {
    set.forEach((num) => {
      newSet.push(num)
    })
  })

  return newSet
}




function transformIntoSingleNumbersForEachPos(rawArray) {
  let rawArrayLength = rawArray.length
  let singleNumsForCurrentPos = [] //Array to hold all the numbers for the current position
  for (i = 0; i < 5; i++) { //For each pos
    for (j = 0; j < rawArrayLength; j++) { //Append every number in currrent pos to an array
      singleNumsForCurrentPos.push(rawArray[i][j])
    }
  }
}




function getMostCommonNumberAcrossWholeSet(singleNumbers) {
  let commonNumberCount = []
  let mostCommonNumbers = []
  singleNumbers.sort(function (a, b) {
    return a - b
  })

  //Count the occurance of each number and push to 2d array [count, number]
  singleNumbers.forEach((num, i) => {
    let count = 1
    while (singleNumbers[i + count] === singleNumbers[i]) {
      count += 1
    }
    if (count === 1) { //Remove any numbers with just one occurance
      singleNumbers.splice(i, 1)
    } else {
      commonNumberCount.push([singleNumbers[i], count])
      singleNumbers.splice(i, count) //Once the number and count has been appended remove all the remaining occurances from the working list
    }
  })

  //Sort array in decending order
  commonNumberCount.sort(function (a, b) {
    return b[1] - a[1]
  })

  //Itterate through sorted array and pick numbers with the (max)six most common occurances e.g [16,6] [34,5] [26,4] [27,3] [54,2] [49,2] [8,2]...
  for (i = 0; i < 6; i++) {
    mostCommonNumbers.push(commonNumberCount[i][0])
  }

  for (i = 5; i < commonNumberCount.length; i++) {
    if (commonNumberCount[i + 1][1] === commonNumberCount[0][1]) {
      mostCommonNumbers.push(commonNumberCount[i + 1][0])
    } else { break }
  }

  return mostCommonNumbers
}




function mostCommonEachPos() {

}



//STEP ONE
let mostCommonEachPos = getMostCommonForEachPos(transformIntoSingleNumbersForEachPos(rawWinningNums))
let mostCommonWholeSet = getMostCommonNumberAcrossWholeSet(transformWholeSetIntoSingleNumbers(rawWinningNums))
console.log(transformIntoSingleNumbersForEachPos(rawWinningNums))
