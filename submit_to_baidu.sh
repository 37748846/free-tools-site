#!/bin/bash

# 百度URL提交脚本
# 使用方法: ./submit_to_baidu.sh

# 配置
SITE="https://lrbar.com"
TOKEN="YOUR_BAIDU_TOKEN"  # 请替换为你的百度站长平台token
URLS_FILE="urls.txt"

# 检查urls.txt文件是否存在
if [ ! -f "$URLS_FILE" ]; then
    echo "错误: $URLS_FILE 文件不存在"
    exit 1
fi

# 提交到百度
echo "正在提交到百度站长平台..."
curl -H 'Content-Type:text/plain' --data-binary @$URLS_FILE "http://data.zz.baidu.com/urls?site=$SITE&token=$TOKEN"

echo ""
echo "提交完成！"
echo "请访问 https://ziyuan.baidu.com/linksubmit/index 查看提交结果"
