export default function handleFileDownload(
  bytes: Uint8Array,
  filename: string,
  mimeType: string = "application/octet-stream"
): void {
  
  // 1. Cria um Blob a partir de uma CÓPIA dos bytes.
  const blob: Blob = new Blob([bytes.slice()], { type: mimeType });

  // 2. Cria uma URL temporária no navegador para o blob
  const url: string = window.URL.createObjectURL(blob);
  
  // 3. Cria um link <a> invisível para o download
  const a: HTMLAnchorElement = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  
  // 4. Adiciona o link ao documento
  document.body.appendChild(a);
  
  // 5. Simula o clique para iniciar o download
  a.click();
  
  // 6. Limpa (remove o link e a URL temporária)
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}