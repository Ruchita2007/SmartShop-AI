/* =========================
   CART DATA WITH LOCAL STORAGE
========================= */

let cart = JSON.parse(
    localStorage.getItem("smartShopCart")
) || [];


/* =========================
   ADD TO CART
========================= */

function addToCart(productName, price) {

    cart.push({
        name: productName,
        price: price
    });

    saveCart();

    alert(productName + " added to cart! 🛒");

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "smartShopCart",
        JSON.stringify(cart)
    );

}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("total");


    /* If this is not cart page */

    if (!cartItems || !totalElement) {
        return;
    }


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        totalElement.innerText = "₹0";

        return;
    }


    let html = "";

    let total = 0;


    cart.forEach(function(item, index) {

        total += item.price;

        html += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    ₹${item.price}

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    cartItems.innerHTML = html;

    totalElement.innerText = "₹" + total;

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


/* =========================
   GO TO CHECKOUT
========================= */

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty! 🛒");

        return;

    }

    window.location.href =
        "checkout.html";

}


/* =========================
   SCROLL TO AI ASSISTANT
========================= */

function scrollToAssistant() {

    /* Home page */

    const assistant =
        document.getElementById("assistant");


    if (assistant) {

        assistant.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        /* Open AI page */

        window.location.href =
            "ai.html";

    }

}


/* =========================
   AI ASSISTANT
========================= */

function askAI() {

    const queryElement =
        document.getElementById("userQuery");

    const response =
        document.getElementById("aiResponse");


    /* If AI elements don't exist */

    if (!queryElement || !response) {
        return;
    }


    const query =
        queryElement.value.trim();


    /* Empty input */

    if (query === "") {

        response.style.display = "block";

        response.innerHTML = `

            <h3>
                🤖 SmartShop AI
            </h3>

            <p>
                Please tell me what you are looking for.
            </p>

        `;

        return;
    }


    response.style.display = "block";


    /* FIND BUDGET */

    let budget = null;


    const budgetMatch =
        query.match(
            /(?:under|below|less than|within|upto|up to)\s*₹?\s*(\d+)/i
        );


    if (budgetMatch) {

        budget =
            parseInt(budgetMatch[1]);

    }


    /* PRODUCTS */

    const products = [

        {
            name: "Premium Gift Box",
            price: 199
        },

        {
            name: "Mini Lamp",
            price: 299
        },

        {
            name: "Coffee Mug",
            price: 249
        },

        {
            name: "Earphones",
            price: 399
        },

        {
            name: "Travel Backpack",
            price: 799
        },

        {
            name: "Wireless Earbuds",
            price: 999
        },

        {
            name: "Smart Watch",
            price: 1299
        }

    ];


    /* FILTER BY BUDGET */

    let suitableProducts = products;


    if (budget !== null) {

        suitableProducts =
            products.filter(function(product) {

                return product.price <= budget;

            });

    }


    /* NO PRODUCT */

    if (suitableProducts.length === 0) {

        response.innerHTML = `

            <h3>
                🤖 SmartShop AI Recommendation
            </h3>

            <p>
                😔 Sorry! No product was found
                within your budget.
            </p>

            <p>
                💡 Try increasing your budget.
            </p>

        `;

        return;

    }


    /* BEST PRODUCT */

    const bestProduct =
        suitableProducts[
            suitableProducts.length - 1
        ];


    /* ADD-ON */

    let addOn = null;


    const possibleAddOns =
        products.filter(function(product) {

            return (
                product.name !== bestProduct.name &&
                (
                    budget === null ||
                    product.price +
                    bestProduct.price <= budget
                )
            );

        });


    if (possibleAddOns.length > 0) {

        addOn =
            possibleAddOns[0];

    }


    /* BUNDLE */

    let bundleText = "";


    if (addOn) {

        bundleText = `

            <p>

                🛍️ <strong>
                    Suggested Bundle:
                </strong>

                ${bestProduct.name}
                +

                ${addOn.name}

                = ₹${
                    bestProduct.price +
                    addOn.price
                }

            </p>

        `;

    }


    /* RESPONSE */

    response.innerHTML = `

        <h3>
            🤖 SmartShop AI Recommendation
        </h3>


        <p>
            I understood that you are looking for:
        </p>


        <p>
            <strong>
                "${query}"
            </strong>
        </p>


        <hr>


        <p>

            ⭐ <strong>
                Best Match:
            </strong>

            ${bestProduct.name}

            – ₹${bestProduct.price}

        </p>


        ${

            addOn

            ?

            `

            <p>

                💡 <strong>
                    Recommended Add-on:
                </strong>

                ${addOn.name}

                – ₹${addOn.price}

            </p>

            `

            :

            ""

        }


        ${bundleText}


        ${

            budget !== null

            ?

            `

            <p>

                💰 <strong>
                    Your Budget:
                </strong>

                ₹${budget}

            </p>

            `

            :

            ""

        }


        <p>
            ✨ Recommendation generated based on
            your shopping requirement and budget.
        </p>

    `;

}


/* =========================
   PRODUCT SEARCH
========================= */

function searchProducts() {

    const searchInput =
        document.getElementById(
            "productSearch"
        );


    /* Search bar doesn't exist */

    if (!searchInput) {
        return;
    }


    const searchValue =
        searchInput.value.toLowerCase();


    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    let found = false;


    productCards.forEach(function(card) {

        const productName =
            card.querySelector("h3")
                .innerText
                .toLowerCase();


        if (
            productName.includes(
                searchValue
            )
        ) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display =
                "none";

        }

    });


    let noProductMessage =
        document.getElementById(
            "noProductMessage"
        );


    if (
        !found &&
        searchValue !== ""
    ) {

        if (!noProductMessage) {

            noProductMessage =
                document.createElement("p");


            noProductMessage.id =
                "noProductMessage";


            noProductMessage.innerText =
                "😔 No product found!";


            document
                .querySelector(
                    ".product-container"
                )
                .appendChild(
                    noProductMessage
                );

        }

    } else {

        if (noProductMessage) {

            noProductMessage.remove();

        }

    }

}


/* =========================
   CHECKOUT FORM
========================= */

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById(
                    "customerName"
                )
                .value;


            const orderMessage =
                document
                .getElementById(
                    "orderMessage"
                );


            orderMessage.style.display =
                "block";


            orderMessage.innerHTML = `

                <h3>
                    🎉 Order Placed Successfully!
                </h3>

                <p>
                    Thank you, <strong>
                    ${name}
                    </strong>!
                </p>

                <p>
                    Your SmartShop AI order has been
                    placed successfully.
                </p>

                <p>
                    🚚 Your order will be processed soon.
                </p>

            `;


            /* Clear cart */

            cart = [];


            localStorage.removeItem(
                "smartShopCart"
            );


            checkoutForm.reset();

        }

    );

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

    }
);