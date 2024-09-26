// 初始化菜单
export function initializeMenu() {
    console.log('initializeMenu called'); // 调试信息
    const menuContainer = document.getElementById('menulist_container');
    if (!menuContainer) return;

    // 清空菜单容器
    menuContainer.innerHTML = '';
    const hop = document.createElement('div');
    hop.className = 'menu_item';
    hop.innerHTML = `
        <a class="active" href="index.html" style="border-left: 5px solid #07C160; background-color: #07C160; color: #fff;">
            <i class="fa fa-home"></i>网站首页
        </a>
    `;
    menuContainer.appendChild(hop);
    // 获取配置
    fetch('js/config.json')
        .then(response => response.json())
        .then(config => {
            const categories = ['station', 'wxtools'];
            const addedCategories = new Set(); // 用于跟踪已添加的类别

            categories.forEach(category => {
                if (config[category] && config[category].visible && !addedCategories.has(category)) {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu_item';
                    menuItem.innerHTML = `
                        <a href="${category}.html" title="${config[category].name}">
                            <i class="fa fa-wrench"></i> ${config[category].name}
                        </a>
                    `;
                    menuContainer.appendChild(menuItem);
                    addedCategories.add(category); // 标记该类别已添加
                }
            });
        })
        .catch(error => console.error('Error loading config:', error));
}
