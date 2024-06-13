

function openPopup() {
    const menuButton = document.querySelector('.menu-button')
    let popup = document.getElementById('popup')

    menuButton.style.display = 'none'
    popup.classList.add("open-popup")
}

function hidePopup() {
    const menuButton = document.querySelector('.menu-button')
    let popup = document.getElementById('popup')

    popup.classList.remove("open-popup")
    menuButton.style.display = 'flex'
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));

