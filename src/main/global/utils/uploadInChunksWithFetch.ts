export default async function uploadInChunksWithFetch(
  Base_URL: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<string> {
  const chunkSize = 1024 * 1024; // 1MB
  const totalChunks = Math.ceil(file.size / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("fileName", file.name);
    formData.append("chunkIndex", i.toString());
    formData.append("totalChunks", totalChunks.toString());

    const res = await fetch(Base_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed at chunk ${i}`);
    }

    // حساب نسبة الرفع
    const percent = Math.round(((i + 1) / totalChunks) * 100);
    onProgress(percent);
  }

  return "Upload complete!";
}
