# refering : https://sh0122.hatenadiary.jp/entry/2018/02/04/172426
# refering : https://deecode.net/?p=1287
import imagehash
from PIL import Image
import cv2
import os
import numpy as np


def main():
    TARGET_FILE = 'output_ui.jpg'
    TARGET_IMG = 'output_anum.jpg'

    bf = cv2.BFMatcher(cv2.NORM_HAMMING)
    # 特徴点算出のアルゴリズムを決定(コメントアウトで調整して切り替え)
    # detector = cv2.ORB_create()
    detector = cv2.AKAZE_create()
    # detector = cv2.SIFT_create()
    (target_kp, target_des) = calc_kp_and_des(
        TARGET_FILE, detector)

    try:
        (comparing_kp, comparing_des) = calc_kp_and_des(
            TARGET_IMG, detector)
        # 画像同士をマッチング
        matches = bf.match(target_des, comparing_des)
        dist = [m.distance for m in matches]
        import pdb
        pdb.set_trace()
        # 類似度を計算する
        ret = sum(dist) / len(dist)
    except:
        ret = 100000
    print(TARGET_IMG, ret)


def image_registration(ref_img, float_img):
    akaze = cv2.AKAZE_create()

    float_kp, float_des = akaze.detectAndCompute(float_img, None)
    ref_kp, ref_des = akaze.detectAndCompute(ref_img, None)

    bf = cv2.BFMatcher()
    matches = bf.knnMatch(float_des, ref_des, k=2)

    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append([m])

    # 適切なキーポイントを選択
    ref_matched_kpts = np.float32(
        [float_kp[m[0].queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
    sensed_matched_kpts = np.float32(
        [ref_kp[m[0].trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)

    # ホモグラフィを計算
    H, status = cv2.findHomography(
        ref_matched_kpts, sensed_matched_kpts, cv2.RANSAC, 5.0)

    # 画像を変換
    warped_image = cv2.warpPerspective(
        float_img, H, (float_img.shape[1], float_img.shape[0]))
    return warped_image


def calc_kp_and_des(img_path, detector):
    """
            特徴点と識別子を計算する
            :param str img_path: イメージのディレクトリパス
            :param detector: 算出の際のアルゴリズム
            :return: keypoints
            :return: descriptor
    """
    IMG_SIZE = (200, 200)
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, IMG_SIZE)
    return detector.detectAndCompute(img, None)


def img_hash(image):
    # hash_size = 32  # 調整可能
    image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    # (hash_size × hash_size, )のnumpy配列
    # ahash = imagehash.average_hash(
    #     image, hash_size).hash.flatten().astype('int8')
    print(imagehash.phash(image, 32).hash.shape)
    dhash = imagehash.phash(image, 32).hash.flatten().astype('int8')
    return dhash, imagehash.phash(image, 32).hash


def calc_similarity(img1, img2):
    img2 = image_registration(cv2.resize(
        img1, (200, 200)), cv2.resize(img2, (200, 200)))
    hash1, imgshape_hash1 = img_hash(cv2.imread(img1))
    hash2, imgshape_hash2 = img_hash(img2)
    assert hash1.shape[0] == hash1.shape[0]  # 同じハッシュサイズであること
    diff = np.count_nonzero(hash1 != hash2, axis=0)  # ハッシュ間の距離
    error_arr = np.zeros((imgshape_hash1.shape[0], imgshape_hash1.shape[1], 3))
    error_arr[:, :, -1] = 255.0
    hash_err_arr = cv2.cvtColor(np.array((imgshape_hash1 != imgshape_hash2),
                                         dtype=np.uint8), cv2.COLOR_GRAY2RGB)
    error_arr *= hash_err_arr
    error_arr = cv2.resize(error_arr, (img2.shape[0], img2.shape[1]))
    blended_arr = cv2.addWeighted(
        img2, 0.7, error_arr, 0.3, 0, dtype=cv2.CV_32F)
    hash_len = hash1.shape[0]
    return (hash_len - diff) / hash_len, blended_arr


# if __name__ == '__main__':
#     cv2.imwrite('test.png', calc_similarity(
#         'output_ui.jpg', 'output_ui.jpg')[1])
