import http.server
import socketserver
import urllib.parse
import json

PORT = 8005

# 生成更多的订单数据
orders = []

# 客户名称列表
customers = [
    "Global Logi Co.",
    "TechHub Nanjing",
    "EuroCargo Ltd",
    "APAC Retailers",
    "Z-Global Hub",
    "Pacific Transport",
    "Atlantic Logistics",
    "Indian Ocean Freight",
    "Arctic Express",
    "Antarctic Cargo"
]

# 状态列表
statuses = [
    {"text": "运输中", "color": "blue"},
    {"text": "已处理", "color": "green"},
    {"text": "异常延误", "color": "orange"},
    {"text": "已妥投", "color": "gray"},
    {"text": "待分配", "color": "purple"}
]

# 生成100个订单数据
for i in range(100):
    order_id = f"ORD-94{i:03d}"
    customer_index = i % len(customers)
    status_index = i % len(statuses)
    date_offset = i // 20  # 每20个订单减一天
    date = f"2024-03-{24 - date_offset:02d}"
    amount = f"${(i * 1000 + 1000):,.2f}"
    
    order = {
        "id": order_id,
        "customer_name": customers[customer_index],
        "date": date,
        "amount": amount,
        "status": statuses[status_index]["text"],
        "status_color": statuses[status_index]["color"]
    }
    orders.append(order)

class SimpleHTTPRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        # 处理登录请求
        if self.path == '/api/auth/login':
            # 读取请求体
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # 解析表单数据
            parsed_data = urllib.parse.parse_qs(post_data.decode('utf-8'))
            username = parsed_data.get('username', [''])[0]
            password = parsed_data.get('password', [''])[0]
            
            # 简单的用户名和密码验证
            if username == 'lorry' and password == '123456':
                # 登录成功
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'access_token': username,  # 简单返回用户名为token
                    'token_type': 'bearer'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            else:
                # 登录失败
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Incorrect username or password'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path == '/api/orders':
            # 处理创建订单的请求
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # 解析JSON数据
                order_data = json.loads(post_data.decode('utf-8'))
                
                # 验证订单数据
                required_fields = ['id', 'customer_name', 'date', 'amount', 'status', 'status_color']
                for field in required_fields:
                    if field not in order_data:
                        raise ValueError(f'Missing required field: {field}')
                
                # 添加新订单到订单列表
                orders.append(order_data)
                
                # 保存订单数据到文件（模拟数据库存储）
                with open('orders.json', 'w') as f:
                    json.dump(orders, f, indent=2)
                
                # 返回成功响应
                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'message': 'Order created successfully',
                    'order': order_data
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except json.JSONDecodeError:
                # 无效的JSON格式
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Invalid JSON format'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except ValueError as e:
                # 缺少必要字段
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': str(e)
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                # 其他错误
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Internal server error'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            # 其他路径
            self.send_response(404)
            self.end_headers()
    
    def do_GET(self):
        # 处理GET请求
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'message': 'Welcome to PathOptix API',
                'version': '1.0.0',
                'docs': '/docs'
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'status': 'healthy'}
            self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path.startswith('/api/orders'):
            # 处理订单请求，支持搜索
            # 解析查询参数
            parsed_path = urllib.parse.urlparse(self.path)
            query_params = urllib.parse.parse_qs(parsed_path.query)
            search_term = query_params.get('search', [''])[0]
            
            # 处理搜索逻辑
            if search_term:
                # 运输方式列表
                transport_types = ['海运', '空运', '铁运']
                # 筛选订单
                filtered_orders = []
                for order in orders:
                    # 检查订单编号是否包含搜索词
                    if search_term.lower() in order['id'].lower():
                        filtered_orders.append(order)
                    else:
                        # 检查运输方式是否匹配（根据订单索引计算运输方式）
                        order_index = int(order['id'].split('-')[1]) - 94000
                        transport_index = order_index % len(transport_types)
                        transport_type = transport_types[transport_index]
                        if search_term.lower() in transport_type.lower():
                            filtered_orders.append(order)
                response_orders = filtered_orders
            else:
                response_orders = orders
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'orders': response_orders,
                'total': len(response_orders)
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_PUT(self):
        # 处理编辑订单的请求
        if self.path.startswith('/api/orders/'):
            # 提取订单ID
            order_id = self.path.split('/')[-1]
            
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            
            try:
                # 解析JSON数据
                order_data = json.loads(put_data.decode('utf-8'))
                
                # 查找订单
                order_index = None
                for i, order in enumerate(orders):
                    if order['id'] == order_id:
                        order_index = i
                        break
                
                if order_index is None:
                    self.send_response(404)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    response = {
                        'detail': 'Order not found'
                    }
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                    return
                
                # 更新订单数据
                orders[order_index].update(order_data)
                
                # 保存订单数据到文件
                with open('orders.json', 'w') as f:
                    json.dump(orders, f, indent=2)
                
                # 返回成功响应
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'message': 'Order updated successfully',
                    'order': orders[order_index]
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except json.JSONDecodeError:
                # 无效的JSON格式
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Invalid JSON format'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                # 其他错误
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Internal server error'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_DELETE(self):
        # 处理删除订单的请求
        if self.path.startswith('/api/orders/'):
            # 提取订单ID
            order_id = self.path.split('/')[-1]
            
            try:
                # 查找订单
                order_index = None
                for i, order in enumerate(orders):
                    if order['id'] == order_id:
                        order_index = i
                        break
                
                if order_index is None:
                    self.send_response(404)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    response = {
                        'detail': 'Order not found'
                    }
                    self.wfile.write(json.dumps(response).encode('utf-8'))
                    return
                
                # 删除订单
                deleted_order = orders.pop(order_index)
                
                # 保存订单数据到文件
                with open('orders.json', 'w') as f:
                    json.dump(orders, f, indent=2)
                
                # 返回成功响应
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'message': 'Order deleted successfully',
                    'order': deleted_order
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except Exception as e:
                # 其他错误
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Internal server error'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        # 处理POST请求
        if self.path == '/api/chat/':
            # 读取请求体
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # 解析JSON数据
                data = json.loads(post_data.decode('utf-8'))
                message = data.get('message', '')
                
                # 提取订单编号
                import re
                order_id_pattern = r'(ORD-\d+|CN\d+)'
                matches = re.findall(order_id_pattern, message)
                order_id = matches[0] if matches else None
                
                if order_id:
                    # 查找订单
                    order = None
                    for o in orders:
                        if o['id'] == order_id:
                            order = o
                            break
                    
                    if order:
                        # 生成订单信息响应
                        response = {
                            'response': f"系统已为您定位订单 {order_id}，当前状态为：{order['status']}，客户名称：{order['customer_name']}，交易金额：{order['amount']}。",
                            'order_id': order_id
                        }
                    else:
                        # 订单不存在
                        response = {
                            'response': f"抱歉，未找到订单编号 {order_id} 的信息。请检查订单编号是否正确。"
                        }
                else:
                    # 通用问题响应
                    if any(keyword in message.lower() for keyword in ["你好", "您好", "hi", "hello"]):
                        response = {
                            'response': "您好！我是您的智能物流管家。您可以直接输入订单号或问题关键词，如'查询订单状态'、'物流信息'等。"
                        }
                    elif any(keyword in message.lower() for keyword in ["状态", "物流", "运输", "位置"]):
                        response = {
                            'response': "请提供订单编号，我可以为您查询详细的物流信息和状态。"
                        }
                    elif any(keyword in message.lower() for keyword in ["帮助", "使用"]):
                        response = {
                            'response': "您可以通过以下方式与我交互：\n1. 输入订单编号查询状态\n2. 输入'物流信息'查询运输详情\n3. 输入'帮助'查看使用指南"
                        }
                    else:
                        response = {
                            'response': "抱歉，我不太理解您的问题。您可以输入订单编号查询状态，或输入'帮助'查看使用指南。"
                        }
                
                # 返回响应
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except json.JSONDecodeError:
                # 无效的JSON格式
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Invalid JSON format'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                # 其他错误
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Internal server error'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path == '/api/auth/login':
            # 处理登录请求
            # 读取请求体
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # 解析表单数据
            parsed_data = urllib.parse.parse_qs(post_data.decode('utf-8'))
            username = parsed_data.get('username', [''])[0]
            password = parsed_data.get('password', [''])[0]
            
            # 简单的用户名和密码验证
            if username == 'lorry' and password == '123456':
                # 登录成功
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'access_token': username,  # 简单返回用户名为token
                    'token_type': 'bearer'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            else:
                # 登录失败
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Incorrect username or password'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path == '/api/orders':
            # 处理创建订单的请求
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # 解析JSON数据
                order_data = json.loads(post_data.decode('utf-8'))
                
                # 验证订单数据
                required_fields = ['id', 'customer_name', 'date', 'amount', 'status', 'status_color']
                for field in required_fields:
                    if field not in order_data:
                        raise ValueError(f'Missing required field: {field}')
                
                # 添加新订单到订单列表
                orders.append(order_data)
                
                # 保存订单数据到文件（模拟数据库存储）
                with open('orders.json', 'w') as f:
                    json.dump(orders, f, indent=2)
                
                # 返回成功响应
                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'message': 'Order created successfully',
                    'order': order_data
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except json.JSONDecodeError:
                # 无效的JSON格式
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Invalid JSON format'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except ValueError as e:
                # 缺少必要字段
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': str(e)
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                # 其他错误
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {
                    'detail': 'Internal server error'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            # 其他路径
            self.send_response(404)
            self.end_headers()

# 配置CORS
class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

print(f"Starting simple server on port {PORT}...")
print(f"Server will be available at http://localhost:{PORT}")
print("Testing login with username: lorry, password: 123456")

with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    httpd.serve_forever()
