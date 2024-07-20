document.addEventListener('DOMContentLoaded', function() {
    let reviewCount = localStorage.getItem('reviewCount') || 0;
    reviewCount++;
    localStorage.setItem('reviewCount', reviewCount);
    document.getElementById('reviewCount').textContent = reviewCount;
});
