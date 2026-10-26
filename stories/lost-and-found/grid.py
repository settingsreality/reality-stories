import sys,glob
from PIL import Image
fs=sorted(glob.glob(sys.argv[1]+'/t*.png'),key=lambda f:float(f.split('/t')[-1][:-4]))
cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
# crop band + caption: y 620..1540 of 1080x1920
ims=[Image.open(f).crop((0,600,1080,1560)).resize((432,384)) for f in fs]
rows=(len(ims)+cols-1)//cols
W=Image.new('RGB',(432*cols,384*rows),'#222')
for i,im in enumerate(ims):W.paste(im,(432*(i%cols),384*(i//cols)))
W.save(sys.argv[2],quality=88)
