export const handleImageUpload = (callback: (url: string) => void): void => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        callback(result);
      };
      reader.readAsDataURL(file);
    }
  };
  input.click();
};
