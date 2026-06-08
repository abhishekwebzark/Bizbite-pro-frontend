// lib/mockStoreData.js
// Replace with: const store = await supabase.from('sellers').select('*').eq('subdomain', subdomain).single()

export const getMockStore = (subdomain) => ({
  id: "S001",
  subdomain: subdomain || "rameshtiffincentre",
  name: "Ramesh Tiffin Centre",
  tagline: "Ghar ka khaana, roz fresh",
  color: "#1A4D2E",
  logo: null,
  banner: null,
  isOpen: true,
  city: "Meerut, UP",
  phone: "9876543210",
  categories: [
    { id: 1, name: "Tiffin", emoji: "🍛" },
    { id: 2, name: "Breakfast", emoji: "🫓" },
    { id: 3, name: "Drinks", emoji: "☕" },
  ],
  products: [
    { id: 1, name: "Dal Tadka Tiffin", categoryId: 1, category: "Tiffin", price: 80, emoji: "🍛", description: "Dal tadka + 2 roti + salad + achaar. Fresh daily.", available: true, imageUrl: null },
    { id: 2, name: "Rajma Chawal", categoryId: 1, category: "Tiffin", price: 80, emoji: "🍚", description: "Classic rajma + steam rice + papad. Ghar jaisa.", available: true, imageUrl: null },
    { id: 3, name: "Paneer Tiffin", categoryId: 1, category: "Tiffin", price: 90, emoji: "🧀", description: "Paneer sabzi + 2 roti + rice + salad.", available: true, imageUrl: null },
    { id: 4, name: "Mix Veg Tiffin", categoryId: 1, category: "Tiffin", price: 85, emoji: "🥘", description: "Seasonal vegetables + roti + dal.", available: false, imageUrl: null },
    { id: 5, name: "Aloo Paratha", categoryId: 2, category: "Breakfast", price: 50, emoji: "🫓", description: "2 parathas + curd + white butter.", available: true, imageUrl: null },
    { id: 6, name: "Chole Bhature", categoryId: 2, category: "Breakfast", price: 60, emoji: "🍽️", description: "2 bhaturas + spicy chole + onion.", available: true, imageUrl: null },
    { id: 7, name: "Masala Chai", categoryId: 3, category: "Drinks", price: 20, emoji: "☕", description: "Fresh adrak-elaichi chai, 200ml.", available: true, imageUrl: null },
    { id: 8, name: "Lassi", categoryId: 3, category: "Drinks", price: 30, emoji: "🥛", description: "Sweet or namkeen, 300ml.", available: true, imageUrl: null },
  ],
});