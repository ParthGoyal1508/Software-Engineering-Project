from flask import Flask, jsonify, request, send_file, make_response
import os
from subprocess import Popen
import glob
import MakeUp
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
nam = []

@app.route('/source', methods=['POST'])
def source():
    CHECK_FOLDER = os.path.isdir("SampleImages")
    path = './SampleImages/'
    for filename in glob.glob(path+"source*"):
        os.remove(filename) 
    data = request.files['file']
    x = data.filename.split(".")
    final = "source" + "." + x[1]          
    nam.append(os.path.join(path, final))
    data.save(os.path.join(path, final))
    msg = 'Source image uploaded successfully'
    return jsonify(msg)

@app.route('/makeup', methods=['POST'])
def makeup():
    CHECK_FOLDER = os.path.isdir("SampleImages")
    path = './SampleImages/'
    for filename in glob.glob(path+"makeup*"):
        os.remove(filename)
    data = request.files['file']
    x = data.filename.split(".")
    final = "makeup" + "." + x[1]          
    nam.append(os.path.join(path, final))
    data.save(os.path.join(path, final))
    msg = 'Makeup image uploaded successfully'
    return jsonify(msg)

@app.route('/result', methods=['GET'])
def result():
    for filename in glob.glob("out*"):
        os.remove(filename)
    p=glob.glob("./SampleImages/source.*")
    q=glob.glob("./SampleImages/makeup.*")
    a=p[0]
    b=q[0]
    MakeUp.run(a,b)
    return "http://localhost:8000/image"+str(random.randint(0,100))

@app.route('/image<id>')
def image(id):
    resp = make_response(open('out.jpg','rb').read())
    resp.content_type = "image/jpeg"
    return resp

app.run(port=8000)