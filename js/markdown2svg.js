    // 业务代码
    import { initializeMenu } from './menu_container.js';
 
    let stylesData = [];

    document.addEventListener('DOMContentLoaded', () => {
        initializeMenu();
        console.log("markdown转svg卡片 页面加载完成");

        // 加载样式库
        fetch('../js/styles.json')
            .then(response => response.json())
            .then(data => {
                stylesData = data.styles; // 存储样式数据
                const styleSelect = document.getElementById('styleSelect');
                stylesData.forEach((style, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = style.name;
                    styleSelect.appendChild(option);
                });
            });
    });

    // 确保函数在全局范围内可用
    window.downloadAsPNG = function() {
        const pages = document.querySelectorAll('.page');
        pages.forEach((page, index) => {
            // 缩小整体文字大小
            page.style.transform = 'scale(0.8)'; // 调整缩放比例
            page.style.transformOrigin = 'top left'; // 确保缩放从左上角开始

            html2canvas(page, {
                scale: 3, // 提高分辨率以确保清晰度
                useCORS: true,
                backgroundColor: null, // 保持透明度
                width: page.offsetWidth * 0.8, // 调整宽度以匹配缩放
                height: page.offsetHeight * 0.8, // 调整高度以匹配缩放
                windowWidth: page.scrollWidth * 0.8, // 确保完整宽度
                windowHeight: page.scrollHeight * 0.8 // 确保完整高度
            }).then(canvas => {
                // 恢复原始缩放
                page.style.transform = '';

                const oA = document.createElement("a");
                oA.download = `markdown_page_${index + 1}.png`; // 保存为PNG格式
                oA.href = canvas.toDataURL("image/png"); // 使用PNG格式
                document.body.appendChild(oA);
                oA.click();
                document.body.removeChild(oA);
            });
        });
    };

    window.downloadAsSVG = function() {
        const pages = document.querySelectorAll('.page');
        pages.forEach((page, index) => {
            const svgData = new XMLSerializer().serializeToString(page);
            const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = `markdown_page_${index + 1}.svg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    };

    window.generateGrid = function() {
        console.log("生成网格");
        const markdown = document.getElementById('markdownInput').value;
        const splitCount = parseInt(document.getElementById('splitCount').value);
        const gridContainer = document.getElementById('gridContainer');
        const selectedStyleIndex = document.getElementById('styleSelect').value;

        // 清除之前的内容
        gridContainer.innerHTML = '';

        // 获取选定的样式
        const selectedStyle = stylesData[selectedStyleIndex];

        // 将markdown分割成部分
        const sections = markdown.split(/(?=#)/);

        // 分组显示
        for (let i = 0; i < sections.length; i += splitCount) {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            pageDiv.style.border = selectedStyle.border;
            pageDiv.style.padding = selectedStyle.padding;
            pageDiv.style.backgroundColor = selectedStyle.backgroundColor;
            pageDiv.style.borderRadius = selectedStyle.borderRadius;
            pageDiv.style.boxShadow = selectedStyle.boxShadow;

            const group = sections.slice(i, i + splitCount);
            group.forEach(section => {
                const parsedContent = marked.parse(section);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = parsedContent;

                // 设置标题样式
                const headers = tempDiv.querySelectorAll('h1, h2, h3, h4, h5');
                headers.forEach(header => {
                    if (header.tagName === 'H1' || header.tagName === 'H2') {
                        header.style.textAlign = 'center';
                    } else {
                        header.style.textAlign = 'left';
                    }
                });

                pageDiv.appendChild(tempDiv);
            });

            gridContainer.appendChild(pageDiv);
        }
    };
