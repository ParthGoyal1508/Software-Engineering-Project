import cv2
import numpy
import sys
from scipy.sparse import spdiags
from scipy.sparse.linalg import spsolve
numpy.set_printoptions(threshold=sys.maxsize)


def min(m, n):
    if (m >= n):
        return n
    else:
        return m


def wls_filter(image_orig, k_array):

    # print k_array
    k_array = cv2.blur(k_array,(5,5))
    # print k_array
    lambda_ = 0.2
    alpha = 1.2
    small_eps = 1e-4
    image = image_orig.astype(numpy.float) / 255.0
    s = image.shape
    k = numpy.prod(s)
    dx = numpy.diff(image, 1, 1)
    dy = numpy.diff(image, 1, 0)

    beta_array = numpy.copy(k_array)


if __name__ == '__main__':
    cv2.waitKey(0)
