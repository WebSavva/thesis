import pandas as pd
import numpy as np
import os
import sqlite3
import json

class DataProccessor :
    def __init__(self):
        self.responseObject = {
            'dataChart':{},
            'summaryData':{
                'thead':[],
                'tbody': [],
                'prevYearShare': 0
            }
        }

    # MAIN METHOD
    def getDataArima(self, rawData):
        # fill response with values
        stringDates = []
        realValues = []
        datesFormatted = []
        predictedValues = []
        for obs in rawData:
            stringDates.append(obs[0])
            datesFormatted.append(np.datetime64(obs[0]))
            realValues.append(round(obs[1],2))
            predictedValues.append(round(obs[2],2))
        
        # buildup of dataframe for arima prediction
        arimaFrame = pd.DataFrame.from_dict({
            'dates':datesFormatted,
            'realValues': realValues,
            'predictedValues':predictedValues
        })
        arimaFrame.set_index('dates', inplace = True)
        arimaFrame['losses'] = arimaFrame['realValues'] - arimaFrame['predictedValues']

        # obtaining summary data
        self.responseObject['summaryData'] = self.getSummary(arimaFrame)

        # transforming data for google charts
        # self.responseObject['dataChart'] = [list((date, realValue, predictedValue)) for (date, realValue, predictedValue) in zip(stringDates, realValues, predictedValues)]
        # del self.responseObject['dataChart'][0:4]
        # transforming data for chart.js
        self.responseObject['dataChart'] = {
            'dates': stringDates[4:len(stringDates)],
            'realValues':realValues[4:len(realValues)],
            'predictedValues':predictedValues[4:len(predictedValues)]
        }

        return self.responseObject

    # HELPER FUNCTIONS
    def getSummary(self, df):
        # building summary object
        dfTrunc = df.loc[df.index >= np.datetime64('2020-04-01')]
        summary = {
            'lossesSum': dfTrunc['losses'].sum(),
            'predictedSum': (dfTrunc['predictedValues']).sum(),
            'realSum': (dfTrunc['realValues']).sum(),
        }

        # calculation of previous year share
        df2019 = df.iloc[df.index >= np.datetime64('2019-01-01')]
        df2019 = df2019.iloc[df2019.index <= np.datetime64('2019-10-01')]
        prevYearShare = (summary['lossesSum'] / (df2019['realValues'].sum())) * 100
        prevYearShare = round(abs(prevYearShare),4)

        # evaluation of quarterly mean values
        quarterlyMeanValues = [0]*3
        for year in range(0,33,4):
            for q in range(year+1, year + 4):
                quarterlyMeanValues[q - year - 1] += df['realValues'][q]
        quarterlyMeanValues = [ quarterSum / 9 for quarterSum in quarterlyMeanValues]

        # tablee content buildup
        realValues = dfTrunc['realValues'].to_list()
        realValues.append(summary['realSum'])
        predictedValues = dfTrunc['predictedValues'].to_list()
        predictedValues.append(summary['predictedSum'])
        lossesValues = dfTrunc['losses'].to_list()
        lossesValues.append(summary['lossesSum'])

        # evalutation mean shares
        meanShares = []
        for i in range(len(quarterlyMeanValues)):
            meanShares.append((abs(dfTrunc['losses'][i])/quarterlyMeanValues[i]) * 100)
        meanShares.append(round(sum(meanShares)/len(meanShares),2))
        quarterlyMeanValues.append(round(sum(quarterlyMeanValues)/len(quarterlyMeanValues),2))

        
        tbody = []
        for i in range(4):
            row = [round(realValues[i],2), round(predictedValues[i],2), round(lossesValues[i],2), round(quarterlyMeanValues[i],2), round(meanShares[i],2)]
            tbody.append(row)

        return {
            'tbody': tbody,
            'prevYearShare':prevYearShare,
            'totalLosses': tbody[-1][2]
        }
    
    def extractAllNames(self, rawNames):
        onlyNames = []
        for obs in rawNames:
            onlyNames.append(obs[0])
        return onlyNames
    def transformRegionData(self, raw):
        return { 
          'viewPort': '-65 0 1134 620',  'regions':[ {'name':name, 'rusCode':rusCode, 'isoCode':isoCode, 'salary':salary,'employed':employed,'polygons':self.convertStringToArray(polygons), 'paths':self.convertStringToArray(paths), 'imageURL':url } for (rusCode,isoCode, name, salary, employed,polygons,paths,url) in raw]
        }
    def convertStringToArray(self, string):
        if len(string) > 0:
            splittedArray = string.split("|")
            if len(splittedArray) > 1:
                splittedArray = splittedArray[1:len(splittedArray)]
            for i in range(len(splittedArray)):
                splittedArray[i] = splittedArray[i].split(",")
            return splittedArray
        else:
            return []

