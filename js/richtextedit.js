    // 业务代码
    import { initializeMenu } from './menu_container.js';

    document.addEventListener('DOMContentLoaded', () => {
        initializeMenu();
    });

    document.addEventListener('DOMContentLoaded', function() {
        initializeRichTextEditor();
    });

    function initializeRichTextEditor() {
        const toolbar = document.querySelector('.toolbar');
        const sourceCode = document.getElementById('source-code');
        const previewArea = document.getElementById('preview-area');

        // 定义工具栏按钮
        const tools = [
            { name: '调整字体大小', icon: 'fa-text-height', action: adjustFontSize },
            { name: '调整图片尺寸', icon: 'fa-image', action: adjustImageSize },
            { name: '添加图片阴影', icon: 'fa-shadow', action: addImageShadow },
            { name: '调整图片边框', icon: 'fa-square-o', action: adjustImageBorder },
            { name: '调整图片圆角', icon: 'fa-circle-o', action: adjustImageBorderRadius },
            { name: '调整文本颜色', icon: 'fa-paint-brush', action: adjustTextColor },
            { name: '调整背景颜色', icon: 'fa-tint', action: adjustBackgroundColor },
            { name: '文本左对齐', icon: 'fa-align-left', action: alignTextLeft },
            { name: '文本居中对齐', icon: 'fa-align-center', action: alignTextCenter },
            { name: '文本右对齐', icon: 'fa-align-right', action: alignTextRight },
        ];

        // 创建工具栏按钮
        tools.forEach(tool => {
            const button = document.createElement('button');
            button.innerHTML = `<i class="fa ${tool.icon}"></i> ${tool.name}`;
            button.addEventListener('click', tool.action);
            toolbar.appendChild(button);
        });

        // 实时预览
        sourceCode.addEventListener('input', updatePreview);

        function updatePreview() {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sourceCode.value;

            // 替换图片为600x600的淡绿色色块，并继承图片样式
            const images = tempDiv.querySelectorAll('img');
            images.forEach(img => {
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.style.width = img.width ? `${img.width}px` : '600px';
                placeholder.style.height = img.height ? `${img.height}px` : '600px';
                placeholder.style.border = img.style.border;
                placeholder.style.borderRadius = img.style.borderRadius;
                placeholder.style.boxShadow = img.style.boxShadow;
                img.replaceWith(placeholder);
            });

            previewArea.innerHTML = tempDiv.innerHTML;
        }

        // 工具函数
        function adjustFontSize() {
            const size = prompt('请输入字体大小（例如：16px）：');
            if (size) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                tempDiv.querySelectorAll('*').forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.style.fontSize = size;
                    }
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function adjustImageSize() {
            const width = prompt('请输入图片宽度（例如：300px）：');
            const height = prompt('请输入图片高度（例如：200px）：');
            if (width && height) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                const images = tempDiv.querySelectorAll('img');
                images.forEach(img => {
                    img.style.width = width;
                    img.style.height = height;
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function addImageShadow() {
            const shadow = prompt('请输入阴影样式（例如：2px 2px 4px #000）：');
            if (shadow) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                const images = tempDiv.querySelectorAll('img');
                images.forEach(img => {
                    img.style.boxShadow = shadow;
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function adjustImageBorder() {
            const border = prompt('请输入边框样式（例如：1px solid #000）：');
            if (border) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                const images = tempDiv.querySelectorAll('img');
                images.forEach(img => {
                    img.style.border = border;
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function adjustImageBorderRadius() {
            const radius = prompt('请输入圆角大小（例如：10px）：');
            if (radius) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                const images = tempDiv.querySelectorAll('img');
                images.forEach(img => {
                    img.style.borderRadius = radius;
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function adjustTextColor() {
            const color = prompt('请输入文本颜色（例如：#ff0000）：');
            if (color) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                tempDiv.querySelectorAll('*').forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.style.color = color;
                    }
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function adjustBackgroundColor() {
            const color = prompt('请输入背景颜色（例如：#ffff00）：');
            if (color) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sourceCode.value;
                tempDiv.querySelectorAll('*').forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        node.style.backgroundColor = color;
                    }
                });
                sourceCode.value = tempDiv.innerHTML;
                updatePreview();
            }
        }

        function alignTextLeft() {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sourceCode.value;
            tempDiv.querySelectorAll('*').forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    node.style.textAlign = 'left';
                }
            });
            sourceCode.value = tempDiv.innerHTML;
            updatePreview();
        }

        function alignTextCenter() {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sourceCode.value;
            tempDiv.querySelectorAll('*').forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    node.style.textAlign = 'center';
                }
            });
            sourceCode.value = tempDiv.innerHTML;
            updatePreview();
        }

        function alignTextRight() {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sourceCode.value;
            tempDiv.querySelectorAll('*').forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    node.style.textAlign = 'right';
                }
            });
            sourceCode.value = tempDiv.innerHTML;
            updatePreview();
        }
    }
