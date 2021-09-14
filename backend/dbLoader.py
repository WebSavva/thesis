import pandas as pd
import numpy as np
from statsmodels.tsa.arima_model import ARIMA
import pmdarima as pm
import statsmodels.api as sm
import matplotlib.pyplot as plt
import statsmodels.api as sm
import os
import sqlite3
import json

def getFormattedCoord(arr):
    currentPolygonStr = ""
    for polStr in arr:
        currentPolygonStr = currentPolygonStr +"|"+polStr
    return currentPolygonStr

# reading data from json file
with open('{}\with-regions.json'.format(os.getcwd())) as json_file:
    data = json.load(json_file)

#reading data from xlsx file 
regions = pd.read_excel("covidRegions.xlsx")

# establishing the connection with the database
newConn = sqlite3.connect('econimpact.db')
newCur = newConn.cursor()
#################################ADDING IMAGE URLS INTO TABLE##################
newCur.execute('ALTER TABLE regionsLockdownCosts ADD urlImage text');
for region in data['regions']:
    currentRusCode = int(region['ident'])
    currentImgUrl = regions.loc[regions['rusCode'] == currentRusCode]['urlImage'].values[0]
    newCur.execute('UPDATE regionsLockdownCosts  SET urlImage = ? WHERE rusCode = {}'.format(currentRusCode), (currentImgUrl,))
newConn.commit()

###############################################################################
out = newCur.execute('SELECT regionName, polygons,paths FROM regionsLockdownCosts').fetchall()
for region in out:
    print({'name': region[0],'polygons':len(region[1]), 'paths':len(region[2])})
print(out)
print(len(out))
a = [coord for coord in out ]
print(len(a))
polygonStrings = []
for region in data['regions']:
    if 'polygons' in region and int(region['ident']) == 24:
        length = len(region['polygons'])
        currentPolygonStr = ""
        for polStr in region['polygons']:
            currentPolygonStr = currentPolygonStr +"|"+polStr
        polygonStrings.append(currentPolygonStr)

splittedList  = polygonStrings[0].split("|")
result = [ str for str in splittedList[1:len(splittedList) - 1] ]
print(result)
if 'paths' in region and len(region['paths']) > maxLength:
    maxLength = len(region['paths'])

newCur.execute('DROP TABLE regionsLockdownCosts')
newCur.execute("CREATE TABLE IF NOT EXISTS regionsLockdownCosts (rusCode int PRIMARY KEY,isoCode text NOT NULL,regionName text NOT NULL,averageSalary int NOT NULL,employed int NOT NULL, polygons text NOT NULL, paths text NOT NULL);")
for region in data['regions']:
    currentRusCode = int(region['ident'])
    firstPartRegion = regions.loc[regions['rusCode'] == currentRusCode]

    # checking polygons and paths
    polygons = ""
    paths = ""
    if 'polygons' in region:
        polygons = getFormattedCoord(region['polygons'])
    if 'paths' in region:
        paths = getFormattedCoord(region['paths'])
    newCur.execute('INSERT INTO regionsLockdownCosts (rusCode,isoCode,regionName, averageSalary,employed,polygons, paths) VALUES(?,?,?,?,?,?,?)',(currentRusCode,str(firstPartRegion['isoCode'].values[0]), str(firstPartRegion['regionName'].values[0]), int(firstPartRegion['salary'].values[0]), int(firstPartRegion['employed'].values[0]), polygons,paths))  

newConn.commit()
oldConn = sqlite3.connect('thesis.db')
newConn = sqlite3.connect('econimpact.db')
oldCur = oldConn.cursor()
newCur = newConn.cursor()
newCur.execute('DROP TABLE regionsLockdownCosts')
newCur.execute("CREATE TABLE IF NOT EXISTS regionsLockdownCosts (rusCode int PRIMARY KEY,isoCode text NOT NULL,regionName text NOT NULL,averageSalary int NOT NULL,employed int NOT NULL, polygons text NOT NULL, paths text NOT NULL);")

for i in range(len(regions)):
    newCur.execute('INSERT INTO regionsLockdownCosts (rusCode,isoCode,regionName, averageSalary,employed) VALUES(?,?,?,?)',(int(regions.iloc[i,0])),regions.iloc[i,1],regions.iloc[i,2],int(regions.iloc[i,3],int(regions.iloc[i,4])))

newConn.commit()

print(newCur.execute('SELECT sum(realValue-predictedValue) FROM sectorsGDP WHERE name = ? AND date(date) = ?', ("Финансовый сектор","2020-10-01") ).fetchall())

names =[ tpl[0] for tpl in  oldCur.execute('SELECT DISTINCT name FROM sectorsGDP').fetchall()]

for name in names:
    # extracting data
    rawData = oldCur.execute('SELECT date(date), value FROM sectorsGDP WHERE name = ?', (name,)).fetchall()
    stringDates = []
    realValues = []
    datesFormatted = []
    for obs in rawData:
        stringDates.append(obs[0])
        datesFormatted.append(np.datetime64(obs[0]))
        realValues.append(obs[1])

    # buildup of dataframe for arima prediction
    arimaFrame = pd.DataFrame.from_dict({
    'dates':datesFormatted,
    'realValues': realValues
    })
    arimaFrame.set_index('dates', inplace = True)
    # extracting data of 2019 year
    arimaFrame2019 = arimaFrame.loc[arimaFrame.index < pd.datetime(2020, 4, 1)]

    # obtaining predictions
    if name == "Гостиничный и ресторанный бизнес":
        order = (1,0,1)
    elif name == "Финансовый сектор":
        order = (0,2,0)
    elif name == "Индустрия развлечений":
        order = (3,2,0)
    else:
        order = pm.auto_arima(arimaFrame2019, start_p=0, start_q=0,test='adf',   d=None,   max_p = 3,max_q = 3,seasonal=False, 
                        start_P=0, D=0, error_action='ignore',  suppress_warnings=True, stepwise=False).order
    model = sm.tsa.statespace.SARIMAX(arimaFrame2019, order = order, enforce_stationarity = True).fit()
    predictedValues = model.predict(start =np.datetime64('2011-01-01'), end = np.datetime64('2020-10-01'))
    for (date, realValue, predictedValue) in zip(stringDates, realValues, predictedValues):
        newCur.execute('INSERT INTO sectorsGDP(name,date,realValue,predictedValue) VALUES(?,julianday(?),?,?)',(name,date,realValue,predictedValue))
newConn.commit()


for row in gdp.values:
    cur.execute('INSERT INTO sectorsGDP(date, name, value) VALUES(julianday(?),?,?)',(str(row[0]).split(" ")[0],row[1],row[2]))

print(oldCur.execute('SELECT DISTINCT name FROM sectorsGDP').fetchall())