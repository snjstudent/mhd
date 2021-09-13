from cv2 import data
from flask import Flask, render_template
from flask import request, make_response, jsonify
from flask_cors import CORS
import cv2
import base64
import numpy as np
from utils.coutor_image import make_contour_image
from utils.similarity_image import calc_similarity
import io
from PIL import Image

app = Flask(__name__, static_folder="./drawing/build/static",
            template_folder="./drawing/build")
CORS(app)


def imread_base64(b64_bytes):
    arr = base64.b64decode(b64_bytes)
    arr = np.frombuffer(arr, dtype=np.uint8)
    arr = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    return np.array(arr)


# @app.route('/')
@app.route('/drawing')
def index():
    return render_template("index.html")


@app.route('/input/calScore', methods=['GET', 'POST'])
def compare_img():
    datas = request.get_json()
    refimg = imread_base64(datas['refimg'])
    drawedimg = imread_base64(datas['drawedimg'])
    try:
        print(make_contour_image(refimg).shape)
        result_score, result_img = calc_similarity(cv2.cvtColor(
            make_contour_image(refimg), cv2.COLOR_GRAY2RGB), drawedimg)
    except Exception as e:
        print(e)
        print("Eccept")
        result_score, result_img = 0, drawedimg
    result_img = np.uint8(np.abs(result_img))
    buf = io.BytesIO()
    imaged = Image.fromarray(np.uint8(result_img))
    imaged.save(buf, 'png')
    qr_b64str = base64.b64encode(buf.getvalue()).decode("utf-8")
    qr_b64data = "data:imaged/png;base64,{}".format(qr_b64str)
    responce = {'score': result_score, 'resultimg': qr_b64data}
    return make_response(jsonify(responce))


if __name__ == "__main__":
    app.run()
    # app.debug = True
    # app.run(host='127.0.0.1')
