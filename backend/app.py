import sqlite3
import flask
import os
from flask import request,Flask,jsonify,render_template
from flask.wrappers import Response
from dataProcessor import DataProccessor
from random import random
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app, resources={r"/api/*": {"origins": os.environ['CLIENT_ORIGIN']}})

@app.route('/')
def say_hello():
    return '<marquee style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:25px;font-weight:bold;font-family:sans-serif">The Thesis api developed by WebSavva is up and running. Don\'t let you head drop down, dude &#9786</marquee>'

@app.route('/api/econ_sectors/all_names/', methods=['GET'])
def get_all_names():
    conn = sqlite3.connect('econimpact.db')
    cur = conn.cursor()
    rawNames = cur.execute('SELECT DISTINCT name FROM sectorsGDP').fetchall()
    dp = DataProccessor()
    sectorNames = dp.extractAllNames(rawNames)

    return jsonify(sectorNames)

@app.route('/api/econ_sectors/<string:sector>', methods=['GET'])
def get_sector_data(sector):
    # extracting data from database
    conn = sqlite3.connect('econimpact.db')
    cur = conn.cursor()
    cur.execute('SELECT date(date), realValue, predictedValue FROM sectorsGDP WHERE name = ?',(sector,))
    rawData = cur.fetchall()

    # modelbuildup and obtaining values for sector
    dataProc = DataProccessor()
    responseObject = dataProc.getDataArima(rawData)
    # return jsonify(responseObject)
    return jsonify(responseObject)
   

@app.route('/api/econ_regions/all/', methods=['GET'])
def get_all_regions():
    conn = sqlite3.connect('econimpact.db')
    cur = conn.cursor()
    cur.execute('SELECT * FROM regionsLockdownCosts')
    rawData = cur.fetchall()

    # model  buildup and obtaining values for sector
    dataProc = DataProccessor()
    responseObject = dataProc.transformRegionData(rawData)
    return jsonify(responseObject)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)