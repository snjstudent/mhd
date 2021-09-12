# cited : https://www.mathgram.xyz/entry/cv/contour
import cv2
import numpy as np


def make_contour_image(img):
    neiborhood24 = np.array([[1, 1, 1, 1, 1],
                             [1, 1, 1, 1, 1],
                             [1, 1, 1, 1, 1],
                             [1, 1, 1, 1, 1],
                             [1, 1, 1, 1, 1]],
                            np.uint8)
    # グレースケールで画像を読み込む.
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    # cv2.imwrite("gray.jpg", gray)

    # 白い部分を膨張させる.
    dilated = cv2.dilate(gray, neiborhood24, iterations=1)
    # cv2.imwrite("dilated.jpg", dilated)

    # 差をとる.
    diff = cv2.absdiff(dilated, gray)
    # cv2.imwrite("diff.jpg", diff)

    # 白黒反転
    contour = 255 - diff
    # cv2.imwrite("./output.jpg", contour)
    return contour


# make_contour_image('face_img_iwata.jpg')
