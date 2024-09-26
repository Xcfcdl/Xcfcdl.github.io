import { initializeMenu } from './menu_container.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    // 其他初始化代码


let extractedData = [];

function extractInfo() {
    const input = document.getElementById('input').value;
    const groups = input.split('\n\n');
    extractedData = [];

    let foundValid = false;

    groups.forEach(group => {
        const lines = group.trim().split('\n');
        if (lines.length === 2) {
            const wechatName = lines[0].replace(':', '').trim();
            const match = lines[1].match(/^#(.*?)：(.*)$/);
            if (match) {
                const category = match[1].trim();
                const name = match[2].trim();
                const content = lines[1];
                if (content.includes('#公众号') || content.includes('#视频号')) {
                    extractedData.push({ wechatName, category, name });
                    foundValid = true;
                }
            }
        }
    });

    if (!foundValid) {
        alert('请输入正确格式的内容，确保包含"#公众号"或者"#视频号"。');
    } else {
        displayResult();
        document.getElementById('downloadBtn').style.display = 'inline-block';
    }
}

function displayResult() {
    const resultDiv = document.getElementById('result');
    let tableHTML = '<table><tr><th>微信名</th><th>类别</th><th>名称</th></tr>';

    extractedData.forEach(item => {
        tableHTML += `<tr><td>${item.wechatName}</td><td>${item.category}</td><td>${item.name}</td></tr>`;
    });

    tableHTML += '</table>';
    resultDiv.innerHTML = tableHTML;
}

function downloadCSV() {
    let csvContent = "微信名,类别,名称\n";
    extractedData.forEach(item => {
        csvContent += `"${item.wechatName}","${item.category}","${item.name}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "公众号信息.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    }
});