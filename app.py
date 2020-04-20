from flask import Flask, jsonify, request
import os
from subprocess import Popen
import glob
import MakeUp

app = Flask(__name__)
nam = []

@app.route('/home', methods=['POST'])
def home():
    CHECK_FOLDER = os.path.isdir("test")
    path = './test/'
    data = request.files['file']
    if data.filename != '':
        x = data.filename.split(".")
        if CHECK_FOLDER:
            final = "reference" + "." + x[1]
        else:
            os.makedirs("test")
            final = "source" + "." + x[1]          
        nam.append(os.path.join(path, final))
        data.save(os.path.join(path, final))
        msg = 'image uploaded successfully'
        return msg

@app.route('/result', methods=['GET'])
def result():
    p=glob.glob("./test/source.*")
    q=glob.glob("./test/reference.*")
    a=p[0]
    b=q[0]
    MakeUp.call(a,b)
    msg = "Done"
    return msg

app.run(port=8000)