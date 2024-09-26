import os
import json

# 获取用户输入
action = input("请选择操作（1: 创建项目, 2: 删除项目）：")

if action == '1':
    page_name = input("请输入页面名称（英文）：")
    page_title = input("请输入页面标题（中文）：")
    page_description = input("请输入页面描述：")
    page_category = input("请输入页面分类（station 或 wxtools）：")

    # 生成 HTML 文件内容
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8"/>
    <title>{page_title}</title>
    <meta name="keywords" content="{page_title}, 在线工具箱" />
    <meta name="description" content="{page_description}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
    <div class="container">
        <div class="content">
            <div class="menu_nav">
                <a href="#" title="LOGO"><h1>Dony工具箱</h1></a>
                <a href="#" title="联系QQ"><i class="fa fa-qq"></i></a>
            </div>
            <!-- 电脑菜单 -->
            <div class="menu_container" id="menu_container">
                <div class="logo">
                    <img src="logo.png" alt="LOGO头像">
                </div>
                <div id="menulist_container"></div>
                <!-- 菜单将由 JavaScript 动态生成 -->
                <div class="menu_foot">
                    <a href="javascript:alert('功能暂未配置');" title="联系QQ"><i class="fa fa-qq"></i></a>
                    <a href="javascript:alert('功能暂未配置');" title="站点统计"><i class="fa fa-bar-chart-o"></i></a>
                    <a href="javascript:alert('功能暂未配置');" title="关于我们"><i class="fa fa-id-card-o"></i></a>
                </div>
            </div>
            <div class="min">
                <div class="min_title">
                    <h1>Dony工具箱<font>{page_title}</font></h1>
                </div>
                <div class="min_content">
                    <!-- 业务标签和业务代码 -->
                </div>
                <footer>
                    <div class="footer">
                        <span> Copyright © 2024 All Dony Reserved</span>
                        <span class="link">
                            <a href="https://www.donychi.xyz/" title="Dony工具箱" target="_blank">Dony工具箱</a>
                            <a href="https://www.donychi.xyz/" title="Dony迁站坊" target="_blank">Dony迁站坊</a>
                        </span>
                    </div>
                </footer>
            </div>
        </div>
    </div>
    <script src="js/{page_name}.js"></script>
    </body>
    </html>
    """

    # 生成 JS 文件内容
    js_content = f"""
    // 业务代码
    import {{ initializeMenu }} from './menu_container.js';

    document.addEventListener('DOMContentLoaded', () => {{
        initializeMenu();
        console.log("{page_title} 页面加载完成");
        // 在此处添加页面特定的 JavaScript 逻辑
    }});
    """

    # 更新 config.json
    def update_config(page_name, page_title, page_category):
        config_path = 'js/config.json'
        with open(config_path, 'r', encoding='utf-8') as file:
            config = json.load(file)

        if page_category not in config:
            print(f"未找到页面分类 {page_category}")
            return

        if 'items' not in config[page_category]:
            print(f"未找到 items")
            return

        config[page_category]['items'][page_name] = {
            "visible": True,
            "link": f"{page_name}.html",
            "title": f"<i class='fa fa-file-code-o'></i>{page_title}",
            "description": page_description
        }

        with open(config_path, 'w', encoding='utf-8') as file:
            json.dump(config, file, ensure_ascii=False, indent=4)

    # 创建 HTML 文件
    html_path = f"{page_name}.html"
    with open(html_path, 'w', encoding='utf-8') as file:
        file.write(html_content)

    # 创建 JS 文件
    js_path = f"js/{page_name}.js"
    os.makedirs(os.path.dirname(js_path), exist_ok=True)
    with open(js_path, 'w', encoding='utf-8') as file:
        file.write(js_content)

    # 更新 config.json
    update_config(page_name, page_title, page_category)

    print(f"项目页 {page_name}.html 和 {page_name}.js 已生成，并更新了 config.json")

elif action == '2':
    # 列出现有项目
    def list_projects():
        config_path = 'js/config.json'
        with open(config_path, 'r', encoding='utf-8') as file:
            config = json.load(file)
        
        projects = []
        for category in ["station", "wxtools"]:
            if category in config and 'items' in config[category]:
                for project_name in config[category]['items']:
                    projects.append((category, project_name))
        return projects

    projects = list_projects()
    if not projects:
        print("没有找到任何项目。")
    else:
        print("现有项目：")
        for i, (category, project_name) in enumerate(projects):
            print(f"{i + 1}. {project_name} ({category})")

        project_index = int(input("请输入要删除的项目序号：")) - 1
        if 0 <= project_index < len(projects):
            category, project_name = projects[project_index]

            # 从 config.json 中删除项目
            def remove_from_config(category, project_name):
                config_path = 'js/config.json'
                with open(config_path, 'r', encoding='utf-8') as file:
                    config = json.load(file)

                if category in config and 'items' in config[category] and project_name in config[category]['items']:
                    del config[category]['items'][project_name]

                    with open(config_path, 'w', encoding='utf-8') as file:
                        json.dump(config, file, ensure_ascii=False, indent=4)

            remove_from_config(category, project_name)

            # 删除 HTML 文件
            html_path = f"{project_name}.html"
            if os.path.exists(html_path):
                os.remove(html_path)
            else:
                print(f"文件 {html_path} 不存在，无法删除。")

            # 删除 JS 文件
            js_path = f"js/{project_name}.js"
            if os.path.exists(js_path):
                os.remove(js_path)
            else:
                print(f"文件 {js_path} 不存在，无法删除。")

            print(f"项目 {project_name} 已删除。")
        else:
            print("无效的项目序号。")
else:
    print("无效的操作。")