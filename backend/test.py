import sys
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

logger.info("测试脚本开始运行")
logger.info(f"Python版本: {sys.version}")
logger.info("测试脚本运行完成")
