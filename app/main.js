window.addEventListener("load", () => {
    renderGallery();
    renderGalleryMenu();
    initIsotope();
    galleryMenuEvents();
    galleryFilterEvents();
    renderSlider();
    initSliderData();
    initMoreEvent();
});

let iso = null;

const renderGallery = () => {
    const gridList = document.querySelector(".grid_list");
    let htmlString = "";
    if (gridList) {
        data.forEach(item => {
            htmlString += `
            <div class="grid_content grid_content_${item.index} ${createCategories(item.categories)}" data-index="${item.index}" data-categories="${item.categories}">
                <div class="grid_items">
                    <div class="grid_item">
                        <img src="${item.picture}" style="height: ${(Math.random() * 500) - 200}px">
                            <div class="grid_item_content">
                                <img class="user" src="${item.author}" alt="work">
                                <div class="title">${shortenTitle(item.title)}</div>
                                <div class="label_button">
                                    <button class="label">Label</button>
                                </div>
                                <div class="like_button">
                                    <i class="fa fa-heart" aria-hidden="true">${item.likes}</i>
                                </div>
                                <div class="views_button">
                                    <i class="fa fa-eye" aria-hidden="true">${item.views}</i>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            `;
        });

        gridList.innerHTML = htmlString;
    }
};

const initIsotope = () => {
    const elem = document.querySelector('.grid_list');
    iso = new Isotope(elem, {
        percentPosition: true,
        layoutMode: 'masonry'
    });
};

const shortenTitle = (title) => {
    const titleArr = title.split(" ").slice(0, 2).join(" ") + "...";
    return titleArr;
};

const createCategories = (categories) => {
    return categories.join(" ");
};

const getSingleCategories = () => {
    const categories = data.map(dataItem => dataItem.categories);
    const uniqueCategories = [];

    categories.forEach(categoryArr => {
        categoryArr.forEach(category => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category);
            }
        });
    });

    uniqueCategories.sort();
    return uniqueCategories;
};

const renderGalleryMenu = () => {
    const filters = document.querySelector('.filters');
    let htmlString = "";
    const categories = getSingleCategories();
    categories.unshift("all");

    categories.forEach(category => {
        htmlString += `
        <div class="filter_item ${category == "all" ? "active" : ""}" data-category="${category}">${category}</div>
        `;
    });

    filters.innerHTML = htmlString;
};

const galleryMenuEvents = () => {
    const filters = document.querySelectorAll(".filters .filter_item");
    const gridContents = document.querySelectorAll(".grid_content");
    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            const category = filter.dataset.category;

            // gridContents.forEach(gridContent => {
            //     if (gridContent.classList.contains(category)) {
            //         gridContent.classList.remove("hidden");
            //     } else {
            //         gridContent.classList.add("hidden");
            //     }
            // });

            // if (category == "all") {
            //     gridContents.forEach(gridContent => {
            //         gridContent.classList.remove("hidden");
            //     });
            // }

            if (category == "all") {
                iso.arrange({ filter: "*" })
            } else {
                iso.arrange({ filter: "." + category })
            }

            filters.forEach(filter_ => {
                filter_.classList.remove("active");
            });
            filter.classList.add("active")
        });
    });
};

const galleryFilterEvents = () => {
    const input = document.querySelector(".filter_group input");
    const gridContents = document.querySelectorAll(".grid_content");

    input.addEventListener("change", () => {
        const value = input.value;

        gridContents.forEach(gridContent => {
            const title = gridContent.querySelector(".title");

            if (title.innerHTML.includes(value)) {
                gridContent.classList.remove("hidden");
            } else {
                gridContent.classList.add("hidden");
            }
        });

    });
};

const initMoreEvent = () => {
    const moreToggle = document.querySelector(".more_toggle");
    const moreNavi = document.querySelector(".more_navi");
    const header = document.querySelector('.header');

    window.addEventListener("load", () => {
        moreNavi.classList.remove("opened");
    });

    //
    moreToggle.addEventListener("click", () => {
        moreNavi.classList.toggle("opened");
    });

    //
    // header.addEventListener("mouseleave", () => {
    //     moreNavi.classList.remove("opened");
    // });

    window.addEventListener("scroll", () => {
        moreNavi.classList.remove("opened");
    });

    // document.addEventListener("keyup", (ev) => {
    //     if (ev.key == "escape") {
    //         moreNavi.classList.remove("opened");
    //     }
    // });

    window.addEventListener("click", (ev) => {
        if (!ev.path.includes(moreToggle) && !ev.path.includes(moreNavi)) {
            moreNavi.classList.remove("opened");
        }
    });

    // header.addEventListener("click", () => {
    //     header.querySelector(".user").style.backgroundColor = "#999999";
    // });
};

const renderSlider = () => {
    const swiperContainer = document.querySelector(".swiper-wrapper");
    let htmlString = "";
    if (swiperContainer) {
        dataSlider.forEach(item => {
            htmlString += `
            <div class="swiper-slide">
                <div class="slider">
                    <div class="slider_holder">
                        <div class="slider_content">
                            <h1>${item.h1}</h1>
                            <h2>${item.h2}</h2>
                            <div class="slider_cta">
                                <button>Sign up</button>
                            </div>
                        </div>
                        <div class="slider_picture">
                            <img src="${item.picture}">
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        swiperContainer.innerHTML = htmlString;
    }
};

const initSliderData = () => {
    const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};

const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');

const popperInstance = Popper.createPopper(button, tooltip, {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8],
            },
        },
    ],
});

function show() {
    // Make the tooltip visible
    tooltip.setAttribute('data-show', '');

    // Enable the event listeners
    popperInstance.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: true }],
    });

    // Update its position
    popperInstance.update();
}

function hide() {
    // Hide the tooltip
    tooltip.removeAttribute('data-show');

    // Disable the event listeners
    popperInstance.setOptions({
        modifiers: [{ name: 'eventListeners', enabled: false }],
    });
}

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

showEvents.forEach(event => {
    button.addEventListener(event, show);
});

hideEvents.forEach(event => {
    button.addEventListener(event, hide);
});

anime ({
    targets: '.square',
    translateX: anime.stagger(50),
    delay: anime.stagger(750,{from:'last'}),
    duration: 5000,
    loop: true,
});

anime ({
    targets: '.square_2',
    translateX: anime.stagger(-150),
    delay: anime.stagger(750,{from:'first'}),
    duration: 5000,
    loop: true,
});