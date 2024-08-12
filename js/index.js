const menuBtn = document.querySelector(".mobile-nav-toggle");
const mainNav = document.getElementById("primary-nav")
const menuImg = document.querySelector(".mobile-nav-toggle img");
const primaryLogo = document.querySelector(".logo img")
const cardContainer = document.querySelector('.cards')
const FAQ = document.querySelector('.FAQ');
const featuresItem = document.querySelectorAll(".features-list-item");
const featuresContainer = document.querySelector('.features-content');
const featureBtns = document.querySelectorAll('.feature-btn');
const inputEmail = document.getElementById("email");
const submitBtn = document.getElementById('submit-btn');

const cards = [
    {
        id: 1,
        title: 'Add to Chrome',
        description: 'Minimum version 62',
        src: "./images/logo-chrome.svg"
    },
    {
        id: 2,
        title: 'Add to Firefox',
        description: 'Minimum version 55',
        src: "./images/logo-firefox.svg"
    },
    {
        id: 3,
        title: 'Add to Opera',
        description: 'Minimum version 46',
        src: "./images/logo-opera.svg"
    }
];

const FAQs = [
    {
        id: 1,
        question: 'What is Bookmark?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.'
    },
    {
        id: 2,
        question: 'How can I request a new browser?',
        answer: 'Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.'
    },
    {
        id: 3,
        question: 'Is there a mobile app?',
        answer: 'Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.'
    },
    {
        id: 4,
        question: 'What about other Chromium browsers?',
        answer: 'Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.'
    }
];

//  MENU SECTION
menuBtn.addEventListener("click", () => {
    if (mainNav.dataset.visible == 'false') {
        mainNav.dataset.visible = 'true';
        menuImg.src = "./images/icon-close.svg";
        primaryLogo.src = "./images/logo-bookmark-white.svg";
        document.body.style.overflow = "hidden";
    } else {
        mainNav.dataset.visible = 'false';
        menuImg.src = "./images/icon-hamburger.svg";
        primaryLogo.src= "./images/logo-bookmark.svg";
        document.body.style.overflow = "";
    }
})

//  FEATURES SECTION
featuresContainer.addEventListener('click', (e) => {
    let id = e.target.dataset.id;
    id = id.toLowerCase()
    if (id) {
        featureBtns.forEach(btn => {
            btn.classList.remove('active');
            e.target.classList.add('active')
        })
        // hide other articles
        featuresItem.forEach(article => {
            article.classList.remove('active');
        })
        const element = document.getElementById(id);
        element.classList.add('active')
    }
})

// Add ids to the buttons
featureBtns.forEach(btn => {
    btn.dataset.id = btn.textContent
})

// RENDER CARDS SECTION
const renderCards = () => {
    let items = [];
    cards.map(card => {
        const {title, description, src} = card
        let cardItem = `
        <div class="card flex">
            <div class="card-img">
            <img src=${src} alt="Chrome browser image">
            </div>
            <h3>${title}</h3>
            <p>${description}</p>
            <div>
            <img src="./images/bg-dots.svg" class="dots" alt="dots">
            </div>
            <div class="card-btn">
            <button class="primary-btn">Add & Install Extension</button>
            </div>
        </div>
        `;
        items.push(cardItem)
    })
    items = items.join('');
    cardContainer.innerHTML = items
}


// RENDER FAQS SECTION
const renderFAQs = () => {
    let renderFAQs = FAQs.map(quest => {
        const {question, answer} = quest;
        return `
        <div class="question flex">
            <div>${question}</div>
            <button class="question-btn"><img src="./images/icon-arrow.svg" alt=""></button>
        </div>
        <div class="answer">
            <p class="container">${answer}</p>
        </div>
        `;
    })
    renderFAQs = renderFAQs.join('');
    FAQ.innerHTML = renderFAQs;
    const togglers = FAQ.querySelectorAll('.question');
    togglers.forEach(btn => {
        btn.addEventListener('click', toggleBtn)
    })
}

function toggleBtn(e) {
    const question = e.currentTarget;
    const questionBtn = question.children[1];
    const answer = e.currentTarget.nextElementSibling;
    question.classList.toggle('isOpen');
    questionBtn.classList.toggle('isOpen');
    answer.classList.toggle('isOpen');
}

// FORM SECTION
let hasSmall = false;
const errorMessage = "Whoops, make sure it's an email";
const errorMsg = (error) => {
    const small = document.createElement('small');
    small.textContent = error;
    small.className = "error-text";
    inputEmail.after(small);
    hasSmall = !hasSmall;
}

inputEmail.addEventListener('input', function() {
    if (inputEmail.classList.length > 0) {
        inputEmail.classList.remove("error");
        hasSmall = false;
        inputEmail.nextElementSibling.remove();
    }
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(inputEmail.value == "") {
        inputEmail.classList.add("error");
        hasSmall ? hasSmall : errorMsg(errorMessage);
    }

    // Validate Email
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(inputEmail.value)) {
        console.log(emailPattern.test(inputEmail.value));
        inputEmail.classList.add("error");
        hasSmall ? hasSmall : errorMsg(errorMessage);
        return false;
    }
    inputEmail.value = "";
    return true;
})


//  BACK TO TOP BUTTON

const backToTopBtn = document.getElementById("back-to-top-btn");

backToTopBtn.addEventListener("click", () => {
    location.href = "#header";
})

// Display back to top button
const showOnPx = 1000;
// Button is initially hidden
backToTopBtn.classList.add("hidden");

window.addEventListener("scroll", () => {
  if (window.scrollY < showOnPx) {
    backToTopBtn.classList.add("hidden");
  } else {
    backToTopBtn.classList.remove("hidden");
  }
})

//  LOAD PAGE
window.addEventListener("DOMContentLoaded", () => {
    renderCards();
    renderFAQs();
});
