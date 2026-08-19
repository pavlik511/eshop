// 1. Model pro surovinu z DB
export interface ExtraIngredient {
  id: number;
  name: string;
  price: number;
}

// 2. Model pro pizzu z DB
export interface Pizza {
  id: number;
  name: string;
  ingredients: string[];
  price: number;
  image: string;
  allergens?: string[];
}

// 3. Model pro položku v košíku (čistě oddělená od DB modelu)
export interface CartItem {
  cartItemId: string; // Unikátní identifikátor položky v košíku
  pizza: Pizza;
  selectedExtras: ExtraIngredient[];
  unitPrice: number; // Cena 1 ks (základ + extra přísady)
  quantity: number;
}