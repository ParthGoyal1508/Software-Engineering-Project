import math
import numpy as np
import cv2

def gaussian(x, sigma):
    return (1.0 / (2 * math.pi * (sigma ** 2))) * math.exp(- (x ** 2) / (2 * sigma ** 2))


def dist_pixels(pi, pj, qi, qj):
    return math.sqrt(((pi - qi) ** 2) + ((pj - qj) ** 2))


def histogram_equilize_grayscale(inp_img):
    equilised_img = np.zeros((inp_img.shape[0], inp_img.shape[1]), dtype=np.uint8)
    num_pixels = inp_img.shape[0]*inp_img.shape[1]
    flattend_img = inp_img.flatten()
    hist, bins = np.histogram(flattend_img,256,[0,255])
    cdf = hist.cumsum()/float(num_pixels)
    for i in range(inp_img.shape[0]):
        for j in range(inp_img.shape[1]):
            equilised_img[i][j] = cdf[inp_img[i][j]] * 255
    return equilised_img

def histogram_equilize_color(inp_img):
    inp_img = cv2.cvtColor(inp_img, cv2.COLOR_BGR2HSV)
    equilised_img = np.zeros((inp_img.shape[0], inp_img.shape[1],inp_img.shape[2]), dtype=np.uint8)
    num_pixels = inp_img.shape[0] * inp_img.shape[1]
    flattend_img = inp_img[:,:,2].flatten()
    hist, bins = np.histogram(flattend_img, 256, [0, 255])
    cdf = hist.cumsum() / float(num_pixels)
    for i in range(inp_img.shape[0]):
        for j in range(inp_img.shape[1]):
            equilised_img[i][j][0] = inp_img[i][j][0]
            equilised_img[i][j][1] = inp_img[i][j][1]
            equilised_img[i][j][2] = cdf[inp_img[i][j][2]] * 255
    return cv2.cvtColor(equilised_img,cv2.COLOR_HSV2BGR)
