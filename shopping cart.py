import stripe

# Initialize Stripe API client
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

# Add item to shopping cart
cart = []
item = {
    "name": "Product Name",
    "description": "Product Description",
    "price": 1000,
    "quantity": 1
}
cart.append(item)

# Calculate total cost of items in cart
total = 0
for item in cart:
    total += item["price"] * item["quantity"]

# Create payment intent
intent = stripe.PaymentIntent.create(
    amount=total,
    currency="usd",
    payment_method_types=["card"]
)

# Process payment using Stripe
intent.confirm()

# Clear shopping cart and complete checkout
cart = []
