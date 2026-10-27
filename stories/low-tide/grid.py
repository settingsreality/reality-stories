import sys, glob
from PIL import Image
# full-frame contact sheet for v2 stories: python3 grid.py <stills dir> <out.jpg> [cols]
fs = sorted(glob.glob(sys.argv[1] + '/t*.png'), key=lambda f: float(f.split('/t')[-1][:-4]))
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 5
ims = [Image.open(f).resize((360, 640)) for f in fs]
rows = (len(ims) + cols - 1) // cols
W = Image.new('RGB', (360 * cols, 640 * rows), '#222')
for i, im in enumerate(ims): W.paste(im, (360 * (i % cols), 640 * (i // cols)))
W.save(sys.argv[2], quality=86)
