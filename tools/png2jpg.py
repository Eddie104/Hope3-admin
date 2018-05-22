#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from PIL import Image

# ImageFile = 'C:/User/xxx/Desktop/1.jpg'
# # 分割文件路径和后缀名
# FilePath, Fileext = os.path.splitext(ImageFile)
# # 设置保存后的文件格式
# outImageFile = "{0}.png".format(FilePath)
# # 打开并保存
# Image.open(ImageFile).save(outImageFile)

def main():
    for parent, dirnames, filenames in os.walk('/Users/eddie104/Documents/hongjie/Hope/server/imgs/goods'):
        for filename in filenames:
            file_path, file_ext = os.path.splitext(filename)
            if file_ext == '.png':
                old_Path = os.path.join(parent, filename)
                try:
                    Image.open(old_Path).save(old_Path.replace('png', 'jpg'))
                except:
                    print('转换失败 => %s' % old_Path)
            
if __name__ == '__main__':
    main()
