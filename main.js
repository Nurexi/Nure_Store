document.addEventListener("DOMContentLoaded", () => {
    // Initialize particles
    initParticles()
  
    // Initialize header scroll effect
    initHeaderScroll()
  
    // Initialize mobile menu
    initMobileMenu()
  
    // Initialize cart functionality
    initCart()
  
    // Initialize search functionality
    initSearch()
  
    // Add to cart functionality
    initAddToCart()
  
    // Update cart count on page load
    updateCartCount()
  })
  
  // Header scroll effect
  function initHeaderScroll() {
    const header = document.getElementById("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
  
  // Mobile menu functionality
  function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle")
    const navLinks = document.getElementById("nav-links")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active")
        // Toggle icon between bars and times
        const icon = this.querySelector("i")
        if (icon.classList.contains("fa-bars")) {
          icon.classList.remove("fa-bars")
          icon.classList.add("fa-times")
        } else {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      })
  
      // Close menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active")
          // Reset icon
          const icon = menuToggle.querySelector("i")
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        })
      })
  
      // Close menu when clicking outside
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav-links") && !event.target.closest(".menu-toggle")) {
          navLinks.classList.remove("active")
          // Reset icon
          const icon = menuToggle.querySelector("i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      })
    }
  }
  
  // Cart functionality
  function initCart() {
    const openCartBtn = document.getElementById("open-cart")
  
    // Redirect to cart page when clicking the cart icon
    if (openCartBtn) {
      openCartBtn.addEventListener("click", (e) => {
        e.preventDefault() // Prevent default link behavior
        window.location.href = "cart.html" // Redirect to cart page
      })
    }
  }
  
  // Search functionality
  function initSearch() {
    const searchButton = document.getElementById("search-button")
    const searchInput = document.getElementById("search-input")
    const searchModal = document.getElementById("search-modal")
    const closeSearchModal = document.getElementById("close-search-modal")
    const searchResults = document.getElementById("search-results")
  
    if (searchButton && searchInput) {
      // Search on button click
      searchButton.addEventListener("click", () => {
        performSearch()
      })
  
      // Search on Enter key
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch()
        }
      })
  
      // Close search modal
      if (closeSearchModal) {
        closeSearchModal.addEventListener("click", () => {
          searchModal.classList.remove("active")
        })
      }
  
      // Close search modal when clicking outside
      window.addEventListener("click", (event) => {
        if (event.target === searchModal) {
          searchModal.classList.remove("active")
        }
      })
    }
  
    // Perform search
    function performSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase()
  
      if (!searchTerm) return
  
      // Get all products from the store
      const products = getAllProducts()
  
      // Filter products by search term
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm),
      )
  
      // Show search modal
      if (searchModal && searchResults) {
        // Clear previous results
        searchResults.innerHTML = ""
  
        if (results.length > 0) {
          // Add results to modal
          results.forEach((product) => {
            const resultItem = document.createElement("div")
            resultItem.className = "search-result-item"
            resultItem.innerHTML = `
                          <img src="${product.image}" alt="${product.name}" class="search-result-img">
                          <div class="search-result-info">
                              <div class="search-result-name">${product.name}</div>
                              <div class="search-result-price">$${product.price.toFixed(2)}</div>
                              <div class="search-result-category">${product.category}</div>
                          </div>
                      `
  
            // Add click event to navigate to product section
            resultItem.addEventListener("click", () => {
              searchModal.classList.remove("active")
  
              // Scroll to product section
              const section = document.getElementById(`${product.category}-section`)
              if (section) {
                section.scrollIntoView({ behavior: "smooth" })
  
                // Highlight the product
                setTimeout(() => {
                  const productElement = document.querySelector(`[data-id="${product.id}"]`)
                  if (productElement) {
                    const productCard = productElement.closest(".product-card")
                    if (productCard) {
                      productCard.style.transform = "scale(1.05)"
                      productCard.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)"
  
                      setTimeout(() => {
                        productCard.style.transform = ""
                        productCard.style.boxShadow = ""
                      }, 2000)
                    }
                  }
                }, 1000)
              }
            })
  
            searchResults.appendChild(resultItem)
          })
        } else {
          // Show no results message
          searchResults.innerHTML = `
                      <div class="no-results">
                          <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; color: #ccc;"></i>
                          <p>No products found matching "${searchTerm}"</p>
                      </div>
                  `
        }
  
        // Show modal
        searchModal.classList.add("active")
      }
    }
  }
  
  // Get all products from the store
  function getAllProducts() {
    return [
      {
        id: "pc1",
        name: "Streaming PC",
        price: 1799,
        category: "gaming-pcs",
        image: "c606082d661ada5db9ef8dcc89e1a7ee.jpg",
      },
      {
        id: "pc2",
        name: "Ultra Gaming PC",
        price: 2999,
        category: "gaming-pcs",
        image: "8b6a24b4387ffe6bd69cdf37ccdb3533.jpg",
      },
      {
        id: "pc3",
        name: "Flagship Gaming PC",
        price: 3499,
        category: "gaming-pcs",
        image: "431b755dc57f4c8309b6fe2ea67b42da.jpg",
      },
      {
        id: "pc4",
        name: "Compact Pro Gaming PC",
        price: 1899,
        category: "gaming-pcs",
        image: "1d9e347684c6be3f86b7058fecb6b47e.jpg",
      },
      {
        id: "l1",
        name: "Gaming Laptop",
        price: 1499,
        category: "laptops",
        image: "513521feca03e8e02d3fb2c86bc9187e.jpg",
      },
      {
        id: "l2",
        name: "MacBook Air M2",
        price: 1199,
        category: "laptops",
        image: "d324e00fd65f11c4f6cde0b01748af87.jpg",
      },
      {
        id: "l3",
        name: "Microsoft Surface Laptop 5",
        price: 999,
        category: "laptops",
        image: "b82681d2b64039932eb0d1961ce625f4.jpg",
      },
      {
        id: "l4",
        name: "HP Spectre x360",
        price: 1599,
        category: "laptops",
        image: "fd408a746d0d16b2083301ca9525dd3a.jpg",
      },
      { id: "p1", name: "Pixel 8 Pro", price: 499, category: "phones", image: "85b7056de8a347a60345b57d070cdd18.jpg" },
      {
        id: "p2",
        name: "Samsung Galaxy S23 Ultra",
        price: 1199,
        category: "phones",
        image: "d37482ad81e5953fe2e776b2386e0300.jpg",
      },
      {
        id: "p3",
        name: "iPhone 15 ProMax",
        price: 1299,
        category: "phones",
        image: "68a354b18c088b28775cb9c2b8aea0cb.jpg",
      },
      {
        id: "p4",
        name: "Compact Pro Phone",
        price: 899,
        category: "phones",
        image: "aef062b328823a8a131764b34fd9d9f7.jpg",
      },
      {
        id: "t1",
        name: "Microsoft Surface Go",
        price: 1299,
        category: "tablets",
        image: "602c757cfc37eb34b59cfbe7ef4ed2ad.jpg",
      },
      { id: "t2", name: "iPad Pro", price: 499, category: "tablets", image: "a63fe32507f82c47ab1f66bc2533380f.jpg" },
      {
        id: "t3",
        name: "iPad Pro with Magic Keyboard (Black)",
        price: 399,
        category: "tablets",
        image: "2fcdacf76e65ad2889a42a8790e2e1d8.jpg",
      },
      {
        id: "t4",
        name: "iPad Pro with Magic Keyboard (White)",
        price: 599,
        category: "tablets",
        image: "1608eeae63db519ff7443d5a8f29abf8.jpg",
      },
    ]
  }
  
  // Add to cart functionality
  function initAddToCart() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id")
        const name = this.getAttribute("data-name")
        const price = Number.parseFloat(this.getAttribute("data-price"))
        const image = this.getAttribute("data-image")
        const productCard = this.closest(".product-card")
        const productImage = productCard.querySelector(".product-image")
  
        // Create flying item animation
        createFlyingItem(productImage)
  
        // Add to cart
        addToCart(id, name, price, image)
  
        // Animate button
        animateAddToCartButton(this)
  
        // Show notification
        showNotification(`${name} added to cart`)
      })
    })
  }
  
  // Create flying item animation
  function createFlyingItem(productImage) {
    // Get positions
    const productRect = productImage.getBoundingClientRect()
    const cartIcon = document.querySelector(".cart-icon")
  
    if (!cartIcon) return
  
    const cartRect = cartIcon.getBoundingClientRect()
  
    // Calculate end position (cart icon position)
    const endX = cartRect.left + cartRect.width / 2 - productRect.left - productRect.width / 2
    const endY = cartRect.top + cartRect.height / 2 - productRect.top - productRect.height / 2
  
    // Create flying element
    const flyingItem = document.createElement("div")
    flyingItem.className = "flying-item"
    flyingItem.innerHTML = '<i class="fas fa-shopping-cart"></i>'
    flyingItem.style.setProperty("--end-x", `${endX}px`)
    flyingItem.style.setProperty("--end-y", `${endY}px`)
    flyingItem.style.left = `${productRect.left + productRect.width / 2 - 30}px`
    flyingItem.style.top = `${productRect.top + productRect.height / 2 - 30}px`
  
    document.body.appendChild(flyingItem)
  
    // Remove after animation completes
    setTimeout(() => {
      flyingItem.remove()
    }, 800)
  }
  
  // Animate add to cart button
  function animateAddToCartButton(button) {
    // Store original content
    const originalContent = button.innerHTML
  
    // Change to checkmark
    button.innerHTML = '<i class="fas fa-check"></i> Added'
    button.style.backgroundColor = "#00b894"
  
    // Revert after animation
    setTimeout(() => {
      button.innerHTML = originalContent
      button.style.backgroundColor = ""
  
      // Add pulse animation
      button.style.animation = "pulse 0.5s"
  
      // Remove animation after it completes
      setTimeout(() => {
        button.style.animation = ""
      }, 500)
    }, 1000)
  }
  
  // Add item to cart
  function addToCart(id, name, price, image) {
    const cart = getCart()
  
    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.id === id)
  
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        quantity: 1,
        image: image,
      })
    }
  
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
  
    // Update cart count
    updateCartCount()
  }
  
  // Get cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || []
  }
  
  // Update cart count
  function updateCartCount() {
    const cart = getCart()
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = totalItems
  
      // Add bounce animation
      el.style.transform = "scale(1.5)"
      setTimeout(() => {
        el.style.transform = "scale(1)"
      }, 300)
    })
  }
  
  // Load cart items
  function loadCartItems() {
    const cart = getCart()
    const cartItemsContainer = document.getElementById("cart-items")
    const cartTotalElement = document.getElementById("cart-total")
  
    if (!cartItemsContainer) return
  
    // Clear cart items container
    cartItemsContainer.innerHTML = ""
  
    if (cart.length === 0) {
      // Show empty cart message
      const emptyCartTemplate = document.getElementById("empty-cart-template")
      if (emptyCartTemplate) {
        const emptyCartClone = document.importNode(emptyCartTemplate.content, true)
        cartItemsContainer.appendChild(emptyCartClone)
      } else {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
      }
  
      // Update cart total
      if (cartTotalElement) {
        cartTotalElement.textContent = "0.00"
      }
  
      return
    }
  
    // Add each item to cart
    let total = 0
  
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      total += itemTotal
  
      // Create cart item element
      const cartItemTemplate = document.getElementById("cart-item-template")
      if (cartItemTemplate) {
        const cartItemClone = document.importNode(cartItemTemplate.content, true)
        const cartItem = cartItemClone.querySelector(".cart-item")
  
        // Set item data
        cartItem.dataset.id = item.id
        cartItem.querySelector(".cart-item-img").src = item.image
        cartItem.querySelector(".cart-item-img").alt = item.name
        cartItem.querySelector(".cart-item-name").textContent = item.name
        cartItem.querySelector(".cart-item-price").textContent = `$${item.price.toFixed(2)}`
        cartItem.querySelector(".quantity-value").textContent = item.quantity
  
        // Add event listeners
        cartItem.querySelector(".decrease").addEventListener("click", () => {
          updateCartItemQuantity(item.id, -1)
        })
  
        cartItem.querySelector(".increase").addEventListener("click", () => {
          updateCartItemQuantity(item.id, 1)
        })
  
        cartItem.querySelector(".remove-item").addEventListener("click", () => {
          removeCartItem(item.id)
        })
  
        cartItemsContainer.appendChild(cartItem)
      } else {
        // Fallback if template is not available
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"
        cartItem.dataset.id = item.id
        cartItem.innerHTML = `
                  <div class="cart-item-img-container">
                      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                  </div>
                  <div class="cart-item-info">
                      <div class="cart-item-name">${item.name}</div>
                      <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                      <div class="cart-item-quantity">
                          <button class="quantity-btn decrease">-</button>
                          <span class="quantity-value">${item.quantity}</span>
                          <button class="quantity-btn increase">+</button>
                      </div>
                  </div>
                  <button class="remove-item">
                      <i class="fas fa-trash"></i>
                  </button>
              `
  
        // Add event listeners
        cartItem.querySelector(".decrease").addEventListener("click", () => {
          updateCartItemQuantity(item.id, -1)
        })
  
        cartItem.querySelector(".increase").addEventListener("click", () => {
          updateCartItemQuantity(item.id, 1)
        })
  
        cartItem.querySelector(".remove-item").addEventListener("click", () => {
          removeCartItem(item.id)
        })
  
        cartItemsContainer.appendChild(cartItem)
      }
    })
  
    // Update cart total
    if (cartTotalElement) {
      cartTotalElement.textContent = total.toFixed(2)
    }
  }
  
  // Update cart item quantity
  function updateCartItemQuantity(id, change) {
    const cart = getCart()
    const item = cart.find((item) => item.id === id)
  
    if (!item) return
  
    // Update quantity
    item.quantity += change
  
    // Remove item if quantity is 0 or less
    if (item.quantity <= 0) {
      removeCartItem(id)
      return
    }
  
    // Update cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
  
    // Update UI
    const cartItem = document.querySelector(`.cart-item[data-id="${id}"]`)
    if (cartItem) {
      cartItem.querySelector(".quantity-value").textContent = item.quantity
    }
  
    // Update cart count and reload cart items
    updateCartCount()
    loadCartItems()
  }
  
  // Remove cart item
  function removeCartItem(id) {
    let cart = getCart()
  
    // Find item to get its name for notification
    const item = cart.find((item) => item.id === id)
    if (!item) return
  
    // Remove item from cart
    cart = cart.filter((item) => item.id !== id)
  
    // Update cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart))
  
    // Show notification
    showNotification(`${item.name} removed from cart`)
  
    // Update cart count and reload cart items
    updateCartCount()
    loadCartItems()
  }
  
  // Show notification
  function showNotification(message, type = "success") {
    // Use template if available
    const notificationTemplate = document.getElementById("notification-template")
    let notification
  
    if (notificationTemplate) {
      notification = document.importNode(notificationTemplate.content, true).querySelector(".notification")
      notification.querySelector("span").textContent = message
    } else {
      // Fallback if template is not available
      notification = document.createElement("div")
      notification.className = "notification"
      notification.innerHTML = `
              <i class="fas fa-check-circle"></i>
              <span>${message}</span>
              <div class="progress-bar"></div>
          `
    }
  
    // Set notification type
    if (type === "success") {
      notification.classList.add("success")
    } else if (type === "error") {
      notification.classList.add("error")
      notification.querySelector("i").className = "fas fa-exclamation-circle"
    }
  
    // Add to body
    document.body.appendChild(notification)
  
    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
      // Animate progress bar
      notification.querySelector(".progress-bar").style.width = "100%"
    }, 10)
  
    // Hide and remove notification
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => notification.remove(), 500)
    }, 3000)
  }
  
  // Initialize particles.js for the background
  function initParticles() {
    // Check if particlesJS is defined
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5,
              },
            },
            push: {
              particles_nb: 4,
            },
          },
        },
        retina_detect: true,
      })
    } else {
      console.warn("particles.js not loaded - using fallback gradient background")
    }
  }
  
  var particlesJS
  