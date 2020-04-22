from flask import Flask, jsonify, request, send_file, make_response
import os
from subprocess import Popen
import glob
import MakeUp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
nam = []

@app.route('/source', methods=['POST'])
def source():
    CHECK_FOLDER = os.path.isdir("SampleImages")
    path = './SampleImages/'
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
    data = request.files['file']
    x = data.filename.split(".")
    final = "makeup" + "." + x[1]          
    nam.append(os.path.join(path, final))
    data.save(os.path.join(path, final))
    msg = 'Makeup image uploaded successfully'
    return jsonify(msg)

@app.route('/result', methods=['GET'])
def result():
    p=glob.glob("./SampleImages/source.*")
    q=glob.glob("./SampleImages/makeup.*")
    a=p[0]
    b=q[0]
    MakeUp.run(a,b)
    return "http://localhost:8000/image"

@app.route('/image')
def image():
    resp = make_response(open('./out.jpg').read())
    resp.content_type = "image/jpeg"
    return resp

app.run(port=8000)