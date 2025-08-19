"use client";
import {
  Edit3,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
// Simple authentication - in production, use proper auth
const ADMIN_PASSWORD = "admin123";
interface Meal {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  components: { [key: string]: number };
  image: string;
  category: string;
  popular: boolean;
  stockLeft: number;
}
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [imageUploadMethod, setImageUploadMethod] = useState<"upload" | "url">(
    "upload"
  );
 const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newComponentName, setNewComponentName] = useState("");
  const [newComponentQuantity, setNewComponentQuantity] = useState(0);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadMeals();
    } else {
      alert("Invalid password");
    }
  };
  const loadMeals = async () => {
    try {
      const response = await fetch("/api/meals");
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Failed to load meals:", error);
    }
  };
  const saveMeals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/meals/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meals }),
      });
      if (response.ok) {
        alert("Meals updated successfully!");
      } else {
        alert("Failed to update meals");
      }
    } catch (error) {
      console.error("Failed to save meals:", error);
      alert("Failed to save meals");
    } finally {
      setIsLoading(false);
    }
  };

  // Updated delete function to use the API
  const deleteMeal = async (id: number) => {
    if (!confirm("Are you sure you want to delete this meal?")) {
      return;
    }

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/meals?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        // Remove the meal from local state
        setMeals(meals.filter((m) => m.id !== id));
        alert("Meal deleted successfully!");
        console.log("Deleted meal:", result.deletedMeal);
      } else {
        const error = await response.json();
        alert(`Failed to delete meal: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
      alert("Failed to delete meal. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        return result.imageUrl;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        `Failed to upload image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };
  const handleImageUrl = async (url: string) => {
    setIsUploadingImage(true);
    try {
      const response = await fetch("/api/download-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      });
      const result = await response.json();
      if (result.success) {
        return result.imageUrl;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      alert(
        `Failed to download image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };
  const addNewMeal = () => {
    const newMeal: Meal = {
      id: Math.max(...meals.map((m) => m.id), 0) + 1,
      name: "New Meal",
      price: 0,
      description: "",
      components: {},
      image: "/images/mini-meal.jpg",
      category: "popular",
      popular: false,
      stockLeft: 0,
    };
    setMeals([...meals, newMeal]);
    setEditingMeal(newMeal);
  };
  const updateMeal = (updatedMeal: Meal) => {
    setMeals(meals.map((m) => (m.id === updatedMeal.id ? updatedMeal : m)));
    setEditingMeal(null);
  };
  const addComponent = () => {
    if (newComponentName.trim() && newComponentQuantity >= 0) {
      setEditingMeal({
        ...editingMeal!,
        components: {
          ...editingMeal!.components,
          [newComponentName.trim().toLowerCase()]: newComponentQuantity,
        },
      });
      setNewComponentName("");
      setNewComponentQuantity(0);
    }
  };
  const removeComponent = (componentName: string) => {
    const { [componentName]: _, ...rest } = editingMeal!.components;
    setEditingMeal({
      ...editingMeal!,
      components: rest,
    });
  };
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Default password: admin123
              </p>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Recipe Management
          </h1>
          <div className="flex gap-4">
            <button onClick={addNewMeal} className="btn btn-secondary">
              <Plus className="w-4 h-4" />
              Add New Meal
            </button>
            <button
              onClick={saveMeals}
              disabled={isLoading}
              className="btn btn-primary"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="btn btn-outline"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid gap-6">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {meal.image ? (
                      <Image
                        src={meal.image}
                        alt={meal.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {meal.name}
                    </h3>
                    <p className="text-gray-600">{meal.price}</p>
                    {meal.popular && (
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mt-1">
                        ⭐ Popular
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingMeal(meal)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMeal(meal.id)}
                    disabled={isDeleting === meal.id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    title={isDeleting === meal.id ? "Deleting..." : "Delete meal"}
                  >
                    {isDeleting === meal.id ? (
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p>
                    <strong>Description:</strong> {meal.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {meal.category}
                  </p>
                  <p>
                    <strong>Stock Left:</strong> {meal.stockLeft}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Components:</strong>
                  </p>
                  <ul className="ml-4">
                    {Object.entries(meal.components).map(([name, quantity]) => (
                      <li key={name}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}: {quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p>
                    <strong>Image:</strong>
                  </p>
                  <p className="text-xs text-gray-500 break-all">
                    {meal.image.length > 50
                      ? `${meal.image.substring(0, 50)}...`
                      : meal.image}
                  </p>
                  <p className="text-xs mt-1">
                    <strong>Type:</strong>{" "}
                    {meal.image.startsWith("/uploads/") ? "Local" : "External URL"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {editingMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editingMeal.id ? "Edit Meal" : "Add New Meal"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateMeal(editingMeal);
                }}
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingMeal.name}
                      onChange={(e) =>
                        setEditingMeal({ ...editingMeal, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={editingMeal.price}
                      onChange={(e) =>
                        setEditingMeal({
                          ...editingMeal,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingMeal.description}
                    onChange={(e) =>
                      setEditingMeal({
                        ...editingMeal,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Components
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newComponentName}
                      onChange={(e) => setNewComponentName(e.target.value)}
                      placeholder="Component name (e.g., Rotis)"
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      value={newComponentQuantity}
                      onChange={(e) =>
                        setNewComponentQuantity(parseInt(e.target.value))
                      }
                      placeholder="Quantity"
                      className="w-24 px-3 py-2 border rounded-lg"
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={addComponent}
                      className="btn btn-secondary px-4"
                      disabled={!newComponentName.trim() || newComponentQuantity < 0}
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                  <ul className="ml-4">
                    {Object.entries(editingMeal.components).map(([name, quantity]) => (
                      <li key={name} className="flex justify-between items-center mb-1">
                        <span>
                          {name.charAt(0).toUpperCase() + name.slice(1)}: {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeComponent(name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Category
                    </label>
                    <select
                      value={editingMeal.category}
                      onChange={(e) =>
                        setEditingMeal({
                          ...editingMeal,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="budget">Budget</option>
                      <option value="popular">Popular</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      Stock Left
                    </label>
                    <input
                      type="number"
                      value={editingMeal.stockLeft}
                      onChange={(e) =>
                        setEditingMeal({
                          ...editingMeal,
                          stockLeft: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      min="0"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">
                    Meal Image
                  </label>
                  {editingMeal.image && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Current Image:
                      </p>
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                        <Image
                          src={editingMeal.image}
                          alt="Current meal image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="upload"
                        checked={imageUploadMethod === "upload"}
                        onChange={(e) =>
                          setImageUploadMethod(
                            e.target.value as "upload" | "url"
                          )
                        }
                        className="mr-2"
                      />
                      <Upload className="w-4 h-4 mr-1" />
                      Upload File
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="url"
                        checked={imageUploadMethod === "url"}
                        onChange={(e) =>
                          setImageUploadMethod(
                            e.target.value as "upload" | "url"
                          )
                        }
                        className="mr-2"
                      />
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Image URL
                    </label>
                  </div>
                  {imageUploadMethod === "upload" && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const uploadedUrl = await handleImageUpload(file);
                            if (uploadedUrl) {
                              setEditingMeal({
                                ...editingMeal,
                                image: uploadedUrl,
                              });
                            }
                          }
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        disabled={isUploadingImage}
                      />
                      {isUploadingImage && (
                        <p className="text-sm text-blue-600 mt-1">
                          Uploading image...
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Supported formats: JPEG, PNG, WebP. Max size: 5MB
                      </p>
                    </div>
                  )}
                  {imageUploadMethod === "url" && (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 px-3 py-2 border rounded-lg"
                          disabled={isUploadingImage}
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (imageUrl.trim()) {
                              const downloadedUrl = await handleImageUrl(
                                imageUrl.trim()
                              );
                              if (downloadedUrl) {
                                setEditingMeal({
                                  ...editingMeal,
                                  image: downloadedUrl,
                                });
                                setImageUrl("");
                              }
                            }
                          }}
                          disabled={isUploadingImage || !imageUrl.trim()}
                          className="btn btn-secondary px-4"
                        >
                          {isUploadingImage ? (
                            <span>Processing...</span>
                          ) : (
                            <>
                              <ImageIcon className="w-4 h-4" />
                              Save
                            </>
                          )}
                        </button>
                      </div>
                      {isUploadingImage && (
                        <p className="text-sm text-blue-600 mt-1">
                          Downloading and saving image...
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Enter an image URL to download and save it locally
                      </p>
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Or enter image URL directly:
                    </label>
                    <input
                      type="url"
                      value={
                        editingMeal.image.startsWith("/")
                          ? ""
                          : editingMeal.image
                      }
                      onChange={(e) =>
                        setEditingMeal({
                          ...editingMeal,
                          image: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://example.com/image.jpg"
                      disabled={editingMeal.image.startsWith("/")}
                    />
                    {editingMeal.image.startsWith("/") && (
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-green-600">
                          ✓ Local image: {editingMeal.image}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingMeal({
                              ...editingMeal,
                              image: "",
                            })
                          }
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Clear & Use URL
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    checked={editingMeal.popular}
                    onChange={(e) =>
                      setEditingMeal({
                        ...editingMeal,
                        popular: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label className="text-gray-700 font-bold">
                    Popular Meal
                  </label>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingMeal(null)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}