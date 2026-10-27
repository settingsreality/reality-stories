import sys, glob
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + '/t*.png'), key=lambda f: float(f.split('/t')[-1][:-4]))
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 3
ims = [Image.open(f).resize((640, 360)) for f in fs]
rows = (len(ims) + cols - 1) // cols
W = Image.new('RGB', (640 * cols, 360 * rows), '#222')
for i, im in enumerate(ims): W.paste(im, (640 * (i % cols), 360 * (i // cols)))
W.save(sys.argv[2], quality=86)
