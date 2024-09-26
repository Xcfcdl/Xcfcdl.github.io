import { initializeMenu } from './menu_container.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    // 其他初始化代码

    // 读取 config.json 文件并生成 min_content
    async function generateMinContent() {
        try {
            const response = await fetch('js/config.json');
            const config = await response.json();

            const minContent = document.querySelector('.min_content');
            minContent.innerHTML = ''; // 清空现有内容

            // 遍历 config.json 中的每个部分
            for (const sectionKey in config) {
                const section = config[sectionKey];
                if (section.visible) {
                    for (const itemKey in section.items) {
                        const item = section.items[itemKey];
                        if (item.visible) {
                            const article = document.createElement('div');
                            article.className = 'article';
                            article.innerHTML = `
                                <a href="${item.link || '#'}" title="${item.title || ''}">
                                    <h1>${item.title || ''}</h1>
                                    <div class="abstract">${item.description || ''}</div>
                                </a>
                            `;
                            minContent.appendChild(article);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error loading config.json:', error);
        }
    }

    // 调用生成函数
    generateMinContent();
});