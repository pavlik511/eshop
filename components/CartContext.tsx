"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Pizza, ExtraIngredient, CartItem } from "@/constants";

interface CartContextType {
  cart: CartItem[];
  addToCart: (pizza: Pizza, selectedExtras?: ExtraIngredient[], quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  cartCount: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Pomocná funkce pro vytvoření stabilního klíče položky
function generateCartItemId(pizzaId: number, extras: ExtraIngredient[]): string {
  const sortedExtraIds = extras.map((e) => e.id).sort((a, b) => a - b).join("-");
  return `${pizzaId}_${sortedExtraIds}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Načtení z localStorage při startu
  useEffect(() => {
    const saved = localStorage.getItem("pizza_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Chyba při čtení košíku:", e);
      }
    }
  }, []);

  // Uložení do localStorage při změně
  useEffect(() => {
    localStorage.setItem("pizza_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pizza: Pizza, selectedExtras: ExtraIngredient[] = [], quantity = 1) => {
    const cartItemId = generateCartItemId(pizza.id, selectedExtras);
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = pizza.price + extrasTotal;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          cartItemId,
          pizza,
          selectedExtras,
          unitPrice,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart musí být použit uvnitř CartProvideru");
  }
  return context;
}