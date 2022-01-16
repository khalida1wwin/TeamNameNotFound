from decimal import Clamped
import json
from operator import countOf
import random as rand
from string import ascii_uppercase

# alph-int-alph+int-year
# Call Number = Subject - topic in subject - alph+int - year of publication 

# Floor 
    # Row 
        # Bookcase 

def ToJson(CallNums, rows, FloorData):
    CallNums = sum(CallNums, [])
    print(CallNums)
    count = 0
    for i in range(len(rows)):
        start = count
        row = {}
        for j in range(rows[i]):
            if ord(CallNums[count][4]) >= ord('A'):
                row[CallNums[count][1:4]+'-'+ CallNums[count][4:]] = '('+str(i)+', '+str(j)+')'
            else:
                row[CallNums[count][1:3]+'-'+ CallNums[count][3:]] = '('+str(i)+', '+str(j)+')'
            count += 1
        RowIndex = CallNums[start][0]+'-'+ CallNums[count-1][0]
        FloorData[RowIndex] = row

    print(rows)
    print(FloorData)

    return FloorData

def floorGen(start, end, NumRows, BooksPerShelve, FloorData, Low, High):
    Rows = []
    TopicNum = [] # [[topic, #of shelves the Topic has], ...]
    SubTopic = [] #[[subtopic num (sorted)], ...]
    for i in range(NumRows):
        Rows.append(rand.randint(Low,High))

    NumShelves = sum(Rows)

    NumTopic = NumShelves//(ord(end)-ord(start)+1)

    for i in range(ord(start), ord(end)+1):
        NumShelves -= NumTopic
        TopicNum.append([chr(i), NumTopic])
    TopicNum[0][1] += NumShelves

    # -- Have Number of shevles each topic takes up -- 
    # - Generate SubTopics for each topic - 
    for i in range(len(TopicNum)):
        subtopic = [rand.randint(10, 800) for _ in range(0, rand.randint(2,TopicNum[i][1]//2))]
        subtopic.sort()
        SubTopic.append(subtopic)

    # - Generate Novel Specific id - 
    NovelId = []
    for i in range(len(TopicNum)):
        TopicNovelId = []
        CharStart, NumStart = ord('A'), rand.randint(10,100)

        for j in range(TopicNum[i][1]):
            TopicNovelId.append(chr(CharStart)+str(NumStart))
            if CharStart < ord('Z'):
                CharStart = CharStart+1
            NumStart += rand.randint(1,10)

        NovelId.append(TopicNovelId) 

    # - Assemble Call Numbers - 
    CallNumbers = []
    for i in range(len(TopicNum)):
        Topic,count = [],0
        for j in range(len(SubTopic[i])):
            for k in range(TopicNum[i][1]//len(SubTopic[i])):
                Topic.append(TopicNum[i][0]+str(SubTopic[i][j]))
                count+=1
        for j in range(TopicNum[i][1]-count):
            Topic.append(TopicNum[i][0]+str(SubTopic[i][j]))
            count+=1

        CallNumbers.append(Topic)

    for i in range(len(TopicNum)):
        for j in range(TopicNum[i][1]):
            CallNumbers[i][j] += NovelId[i][j]

    print(TopicNum)
    #print(SubTopic)
    #print(CallNumbers)

    return ToJson(CallNumbers, Rows, FloorData)

def main():
    floors = [['A','E'],['F', 'L'],['M','P'],['Q','Z']]
    #floors = [['A','E']]
    BooksPerShelve = 25
    ShelvesPerRowLow, ShelvesPerRowHigh = 6, 12
    data = {}

    for i in range(len(floors)):
        FloorData = {}
        NumRows = rand.randint(4,8)
        data[floors[i][0]+floors[i][1]] = floorGen(floors[i][0], floors[i][1], 
                                                   NumRows, BooksPerShelve, FloorData,
                                                   ShelvesPerRowLow, ShelvesPerRowHigh)

    with open('Books.json', 'wt') as out:
        json.dump(data, out, sort_keys=True, indent=4, separators=(',', ': '))
        #json.dump(data, f)


if __name__ == "__main__":
    main()