
async function testSpeed(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const start = performance.now();
        const response = await fetch(url, { signal: controller.signal });
        const end = performance.now();
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error("无效");
        const size = parseInt(response.headers.get("content-length") || "1000000", 10);
        const speed = size / ((end - start) / 1000) / 1024 / 1024;
        return speed.toFixed(2) + " MB/s";
    } catch (e) {
        return "❌ 无效";
    }
}

async function startTest() {
    const urls = document.getElementById("sourceList").value.trim().split("\n");
    const result = document.getElementById("result");
    result.innerText = "测速中...\n";
    for (let url of urls) {
        const speed = await testSpeed(url.trim());
        result.innerText += url + " - " + speed + "\n";
    }
}
