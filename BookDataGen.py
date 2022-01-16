from cgitb import text
import json
import random as rand
import shelve
from tkinter import Image
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw 
import copy


# alph-int-alph+int-year
# Call Number = Subject - topic in subject - alph+int - year of publication 

# Floor 
    # Row 
        # Bookcase 

def ToJson(CallNums, rows, FloorData, FloorImage, width, height):
    CallNums = sum(CallNums, [])
    #print(CallNums)
    count = 0
    Xpad = (width-(len(rows)*225))//2
    Xpad = Xpad - Xpad%25
    
    rowJsonlst = []
    rowsJson = {}
    for i in range(len(rows)):
        XOffset, YOffset= i*225+Xpad, 0
        RowID, BotRow, Space = '', '', False
        start = count
        row = {}
        shelvesLst = []
        for j in range(rows[i]):
            IdLoc = {}
            if ord(CallNums[count][4]) >= ord('A'):
                text = CallNums[count][1:4]+'-'+ CallNums[count][4:]
                IdLoc['id'] = text
                IdLoc['loc'] = '('+str(i)+', '+str(j)+')'
            else:
                text = CallNums[count][1:3]+'-'+ CallNums[count][3:]
                IdLoc['id'] = text
                IdLoc['loc'] = '('+str(i)+', '+str(j)+')'

            shelvesLst.append(IdLoc)

            if j == 0:
                StartRow = CallNums[count][0] + ' - ' + CallNums[count + rows[i]-1][0]
                RowID = copy.deepcopy(StartRow)
            elif j == rows[i]-1:
                BotRow = RowID
            else:
                StartRow = ''
                BotRow = ''

            if YOffset in range(350,700) and Space == False:
                YOffset += 200
                Space = True

            if j%2 == 0:
                YOffset += 25
                DarwFloor(XOffset, YOffset, FloorImage, StartRow, BotRow, text) #160 * 20
            else:
                YOffset += 50
                DarwFloor(XOffset, YOffset, FloorImage, StartRow, BotRow, text)

            count += 1

        row['shelve'] = shelvesLst
        RowIndex = CallNums[start][0]+'-'+ CallNums[count-1][0]
        rowsJson[RowIndex] = row
        rowJsonlst.append(rowsJson)

    FloorData['row'] = rowJsonlst

    print(rows)
    print(FloorData)

    return FloorData

def floorGen(start, end, NumRows, FloorData, Low, High, FloorImage, width, height):
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

    return ToJson(CallNumbers, Rows, FloorData,FloorImage, width, height)

def DarwFloor(x,y, floor, StartRow, BotRow, text):
    shelve = Image.open("shelve.png")
    shelve = shelve.convert("RGBA")
    floor.paste(shelve, (x,y), shelve)

    draw = ImageDraw.Draw(floor)
    font = ImageFont.truetype(r'OpenSans-Bold.ttf', 16)
    draw.text((x+65, y+1),text,(101,106,109),font=font) 

    font = ImageFont.truetype(r'OpenSans-Bold.ttf', 22)
    draw.text((x+75, y-28),StartRow,(59,112,214),font=font) 

    font = ImageFont.truetype(r'OpenSans-Bold.ttf', 22)
    draw.text((x+75, y+23),BotRow,(59,112,214),font=font) 

def main():
    floors = [['A','E'],['F', 'L'],['M','P'],['Q','Z']]
    ShelvesPerRowLow, ShelvesPerRowHigh = 20, 20
    data = {}

    floorsJSON = []
    for i in range(len(floors)):
        FloorData = {}
        FloorJson = {}
        NumRows = rand.randint(6,6)

        bg = Image.open("bg.png") # 1200, 800
        FloorImage = bg.convert("RGBA")

        overlay = Image.open("Overlay.png") # 1200, 800
        overlayImg = overlay.convert("RGBA")
        
        width, height = 1500, 1000
        FloorJson[floors[i][0]+floors[i][1]] = floorGen(floors[i][0], floors[i][1], NumRows, 
                                                FloorData,ShelvesPerRowLow, ShelvesPerRowHigh,
                                                FloorImage, width, height)

        FloorImage.paste(overlayImg, (0,0), overlayImg)
        FloorImage.save('floor'+floors[i][0]+floors[i][1]+'.png')
        floorsJSON.append(FloorJson)

    data['floor'] = floorsJSON


    with open('Books.json', 'wt') as out:
        json.dump(data, out, sort_keys=True, indent=4, separators=(',', ': '))
        #json.dump(data, f)

    #DarwFloor(100,100)

if __name__ == "__main__":
    main()
