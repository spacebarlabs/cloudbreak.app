// 1. Load the screenshot library
var script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.head.appendChild(script);

script.onload = () => {
    const cards = document.querySelectorAll('.installer-card');
    
    cards.forEach((card, i) => {
        setTimeout(() => {
            html2canvas(card, { 
                scale: 2, // Double resolution for crispness
                useCORS: true 
            }).then(canvas => {
                // Capture all four components used in the HTML image_slug
                const distro = card.querySelector('.os-name-text').innerText.trim();
                const version = card.querySelector('.version-number-text').innerText.trim();
                const media = card.querySelector('.media-type-text').innerText.trim();
                const subLabel = card.querySelector('.sub-label-text').innerText.trim();

                // 1. Combine in the exact order: Distro Media Version Label
                // 2. Convert to lowercase
                // 3. Replace spaces and underscores with hyphens
                // 4. Remove any remaining non-alphanumeric characters (except hyphens)
                const rawString = `${distro} ${media} ${version} ${subLabel}`;
                const slugifiedName = rawString
                    .toLowerCase()
                    .replace(/[\s_]+/g, '-')       // Spaces/Underscores to hyphens
                    .replace(/[^\w-]+/g, '')       // Remove non-word chars (except hyphens)
                    .replace(/--+/g, '-')          // Replace multiple hyphens with single
                    .replace(/^-+|-+$/g, '');      // Trim hyphens from start/end
                
                const link = document.createElement('a');
                link.download = `${slugifiedName}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            });
        }, i * 500); // Staggered to prevent browser hanging
    });
};
